import { useEffect, useRef, useState } from 'react';

export default function NetworkGraph3D({ nodes, onNodeHover, onNodeClick, selectedNode }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.2, y: 0 });
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const hoveredNodeRef = useRef(null);
  const selectedNodeRef = useRef(null);
  const [motionEnabled, setMotionEnabled] = useState(false);
  
  // Touch state
  const touchStateRef = useRef({
    touches: [],
    lastDistance: 0,
    lastPan: { x: 0, y: 0 },
    isPinching: false,
    isPanning: false
  });

  // Animation state
  const pulseRef = useRef(0);
  const particleSystemRef = useRef([]);
  
  // Motion sensor state
  const motionRef = useRef({
    alpha: 0, // Rotação Z (girar o celular)
    beta: 0,  // Inclinação para frente/trás
    gamma: 0, // Inclinação esquerda/direita
    enabled: false
  });

  useEffect(() => {
    selectedNodeRef.current = selectedNode;
  }, [selectedNode]);

  // Device Orientation (Gyroscope) Handler
  useEffect(() => {
    const handleOrientation = (e) => {
      if (e.alpha !== null && e.beta !== null && e.gamma !== null) {
        if (!motionRef.current.enabled) {
          motionRef.current.enabled = true;
          setMotionEnabled(true);
        }
        // Normalizar valores (alpha: 0-360, beta: -180 a 180, gamma: -90 a 90)
        // Usar suavização para evitar movimentos bruscos
        const smoothing = 0.15;
        motionRef.current.alpha = motionRef.current.alpha * (1 - smoothing) + (e.alpha || 0) * (Math.PI / 180) * smoothing;
        motionRef.current.beta = motionRef.current.beta * (1 - smoothing) + (e.beta || 0) * (Math.PI / 180) * smoothing;
        motionRef.current.gamma = motionRef.current.gamma * (1 - smoothing) + (e.gamma || 0) * (Math.PI / 180) * smoothing;
      }
    };

    // Solicitar permissão para orientação (iOS 13+)
    if (typeof DeviceOrientationEvent !== 'undefined' && 
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS precisa de interação do usuário primeiro
      const requestPermission = async () => {
        try {
          const response = await DeviceOrientationEvent.requestPermission();
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (error) {
          console.log('Motion sensor permission denied or not available');
        }
      };
      
      // Tentar ativar quando o canvas receber toque
      const canvas = canvasRef.current;
      if (canvas) {
        const enableOnTouch = () => {
          requestPermission();
          canvas.removeEventListener('touchstart', enableOnTouch);
        };
        canvas.addEventListener('touchstart', enableOnTouch, { once: true });
      }
    } else {
      // Android e outros navegadores (geralmente não precisam de permissão)
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Configuração 3D avançada
    const centerX = width / 2;
    const centerY = height / 2;
    const baseDepth = 400;
    const baseRadius = Math.min(width, height) * 0.3;

    // Posições 3D dos nós (distribuídos em uma esfera com melhor distribuição)
    const nodePositions3D = nodes.map((node, i) => {
      // Distribuição mais uniforme usando Fibonacci sphere
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const theta = goldenAngle * i;
      const y = 1 - (i / (nodes.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      return {
        x: x * baseRadius,
        y: y * baseRadius,
        z: z * baseRadius,
        node: node,
        baseRadius: baseRadius,
        pulsePhase: (i / nodes.length) * Math.PI * 2 // Fase única para cada nó
      };
    });

    // Sistema de partículas
    const createParticle = (x, y, color) => {
      return {
        x, y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
        decay: 0.02 + Math.random() * 0.02,
        size: 2 + Math.random() * 3,
        color: color
      };
    };

    // Projetar 3D para 2D com zoom e pan
    const project3D = (x, y, z) => {
      const depth = baseDepth * zoomRef.current;
      const scale = depth / (depth + z);
      return {
        x: centerX + (x + panRef.current.x) * scale,
        y: centerY + (y + panRef.current.y) * scale,
        scale: scale,
        z: z
      };
    };

    // Rotação 3D otimizada
    const rotate3D = (x, y, z, rx, ry) => {
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      
      let newY = y * cosX - z * sinX;
      let newZ = y * sinX + z * cosX;
      
      const newX = x * cosY + newZ * sinY;
      newZ = -x * sinY + newZ * cosY;
      
      return { x: newX, y: newY, z: newZ };
    };

    // Calcular iluminação baseada em posição 3D
    const calculateLighting = (x, y, z, lightDir = { x: 0.5, y: -0.5, z: -1 }) => {
      const len = Math.sqrt(x*x + y*y + z*z);
      if (len === 0) return 0.5;
      
      const normalized = { x: x/len, y: y/len, z: z/len };
      const dot = normalized.x * lightDir.x + normalized.y * lightDir.y + normalized.z * lightDir.z;
      return Math.max(0.3, Math.min(1, (dot + 1) / 2));
    };

    // Desenhar conexões com profundidade e animação
    const drawConnections = (rotatedNodes) => {
      // Ordenar por profundidade para desenhar conexões mais próximas primeiro
      const sortedNodes = [...rotatedNodes].sort((a, b) => b.z - a.z);
      
      for (let i = 0; i < sortedNodes.length; i++) {
        for (let j = i + 1; j < sortedNodes.length; j++) {
          const node1 = sortedNodes[i];
          const node2 = sortedNodes[j];
          
          const dist = Math.sqrt(
            Math.pow(node1.x - node2.x, 2) +
            Math.pow(node1.y - node2.y, 2) +
            Math.pow(node1.z - node2.z, 2)
          );
          
          // Conectar nós próximos com distância adaptativa
          const connectionThreshold = baseRadius * 1.8;
          if (dist < connectionThreshold) {
            const p1 = project3D(node1.x, node1.y, node1.z);
            const p2 = project3D(node2.x, node2.y, node2.z);
            
            // Calcular opacidade baseada em profundidade e distância
            const avgZ = (node1.z + node2.z) / 2;
            const depthFactor = Math.max(0, Math.min(1, (baseDepth + avgZ) / (baseDepth * 2)));
            const distanceFactor = 1 - (dist / connectionThreshold);
            const alpha = 0.15 * depthFactor * distanceFactor;
            
            // Gradiente baseado em cores dos nós
            const color1 = getNodeColor(node1.node);
            const color2 = getNodeColor(node2.node);
            
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${alpha})`);
            gradient.addColorStop(1, `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${alpha})`);
            
            // Linha com blur para profundidade
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5 * Math.min(p1.scale, p2.scale);
            ctx.shadowBlur = 10 * Math.min(p1.scale, p2.scale);
            ctx.shadowColor = `rgba(${color1.r}, ${color1.g}, ${color1.b}, 0.5)`;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    // Obter cor RGB do nó
    const getNodeColor = (node) => {
      const colors = {
        cyan: { r: 0, g: 255, b: 255 },
        blue: { r: 26, g: 154, b: 247 },
        purple: { r: 123, g: 93, b: 255 }
      };
      return colors[node.color] || colors.cyan;
    };

    // Desenhar nós com iluminação e glow profissional
    const drawNodes = (rotatedNodes) => {
      // Ordenar por profundidade (mais distantes primeiro)
      const sortedNodes = [...rotatedNodes].sort((a, b) => b.z - a.z);
      
      sortedNodes.forEach((pos) => {
        const projected = project3D(pos.x, pos.y, pos.z);
        const node = pos.node;
        const isHovered = hoveredNodeRef.current === node;
        const isSelected = selectedNodeRef.current === node;
        
        // Calcular iluminação
        const lighting = calculateLighting(pos.x, pos.y, pos.z);
        
        // Tamanho baseado em profundidade e estado
        const baseSize = 10 + (projected.scale * 15);
        const pulseEffect = isSelected ? 1.3 : isHovered ? 1.15 : 1;
        const pulseAnimation = 1 + Math.sin(pulseRef.current + pos.pulsePhase) * 0.1;
        const nodeSize = baseSize * pulseEffect * pulseAnimation * projected.scale;
        
        const color = getNodeColor(node);
        
        // Múltiplas camadas de glow
        const glowLayers = [
          { size: nodeSize * 4, alpha: 0.15, blur: 30 },
          { size: nodeSize * 2.5, alpha: 0.25, blur: 20 },
          { size: nodeSize * 1.5, alpha: 0.4, blur: 10 }
        ];
        
        // Desenhar glows
        glowLayers.forEach(layer => {
          const gradient = ctx.createRadialGradient(
            projected.x, projected.y, 0,
            projected.x, projected.y, layer.size
          );
          gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${layer.alpha})`);
          gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${layer.alpha * 0.5})`);
          gradient.addColorStop(1, 'transparent');
          
          ctx.save();
          ctx.globalAlpha = projected.scale;
          ctx.shadowBlur = layer.blur;
          ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${layer.alpha})`;
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, layer.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
        
        // Sombra do nó (para profundidade)
        ctx.save();
        ctx.globalAlpha = 0.3 * projected.scale;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.ellipse(projected.x, projected.y + nodeSize * 0.3, nodeSize * 0.8, nodeSize * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Nó principal com gradiente e iluminação
        const nodeGradient = ctx.createRadialGradient(
          projected.x - nodeSize * 0.3, projected.y - nodeSize * 0.3, 0,
          projected.x, projected.y, nodeSize
        );
        const highlightAlpha = lighting * 0.9;
        const baseAlpha = 0.7 + (lighting * 0.3);
        
        nodeGradient.addColorStop(0, `rgba(255, 255, 255, ${highlightAlpha})`);
        nodeGradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${baseAlpha})`);
        nodeGradient.addColorStop(1, `rgba(${color.r * 0.6}, ${color.g * 0.6}, ${color.b * 0.6}, ${baseAlpha * 0.8})`);
        
        ctx.save();
        ctx.globalAlpha = projected.scale;
        ctx.fillStyle = nodeGradient;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Borda brilhante para nós selecionados/hovered
        if (isSelected || isHovered) {
          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 15;
          ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
          ctx.stroke();
        }
        ctx.restore();
        
        // Número do nó
        if (projected.scale > 0.5) {
          ctx.save();
          ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * projected.scale})`;
          ctx.font = `bold ${12 * projected.scale}px 'JetBrains Mono', monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowBlur = 5;
          ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
          ctx.fillText(node.number, projected.x, projected.y);
          ctx.restore();
        }
        
        // Nome do nó (se visível e selecionado/hovered)
        if ((isSelected || isHovered) && projected.scale > 0.6) {
          ctx.save();
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.9 * projected.scale})`;
          ctx.font = `${10 * projected.scale}px 'JetBrains Mono', monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;
          ctx.fillText(node.name, projected.x, projected.y + nodeSize + 12);
          ctx.restore();
        }
        
        // Partículas para nós selecionados
        if (isSelected && Math.random() > 0.7) {
          particleSystemRef.current.push(
            createParticle(projected.x, projected.y, color)
          );
        }
      });
    };

    // Desenhar partículas
    const drawParticles = () => {
      particleSystemRef.current = particleSystemRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= particle.decay;
        
        if (particle.life > 0) {
          ctx.save();
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 1)`;
          ctx.shadowBlur = 5;
          ctx.shadowColor = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0.8)`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          return true;
        }
        return false;
      });
    };

    // Animar
    const animate = () => {
      // Atualizar dimensões se necessário
      if (canvas.offsetWidth !== width || canvas.offsetHeight !== height) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
      
      ctx.clearRect(0, 0, width, height);
      
      // Atualizar pulso
      pulseRef.current += 0.03;
      
      // Rotação baseada em motion sensor ou automática
      if (motionRef.current.enabled) {
        // Usar dados do gyroscope/acelerômetro
        // Gamma controla rotação Y (esquerda/direita do celular)
        // Beta controla rotação X (inclinar para frente/trás)
        // Alpha controla rotação Z (girar o celular)
        const sensitivity = 0.4; // Sensibilidade ajustável (mais suave)
        
        // Normalizar gamma (-90 a 90 graus) para rotação Y
        // Converter para radianos e aplicar sensibilidade
        const normalizedGamma = motionRef.current.gamma / (Math.PI / 2); // Normalizar para -1 a 1
        const targetY = normalizedGamma * sensitivity;
        
        // Normalizar beta (-180 a 180 graus) para rotação X
        const normalizedBeta = motionRef.current.beta / Math.PI; // Normalizar para -1 a 1
        const targetX = normalizedBeta * sensitivity * 0.6; // Menos sensível no eixo X
        
        // Suavizar transições para evitar movimentos bruscos
        const smoothing = 0.15;
        rotationRef.current.y = rotationRef.current.y * (1 - smoothing) + targetY * smoothing;
        rotationRef.current.x = rotationRef.current.x * (1 - smoothing) + targetX * smoothing;
      } else {
        // Rotação automática muito lenta (fallback quando sensor não disponível)
        rotationRef.current.y += 0.0005; // Reduzido de 0.002 para 0.0005
        rotationRef.current.x += 0.0001; // Reduzido de 0.0005 para 0.0001
      }
      
      // Rotacionar nós
      const rotatedNodes = nodePositions3D.map(pos => {
        const rotated = rotate3D(pos.x, pos.y, pos.z, rotationRef.current.x, rotationRef.current.y);
        return { ...rotated, node: pos.node, pulsePhase: pos.pulsePhase };
      });
      
      // Desenhar
      drawConnections(rotatedNodes);
      drawNodes(rotatedNodes);
      drawParticles();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Touch handlers
    const getTouchDistance = (touches) => {
      if (touches.length < 2) return 0;
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getTouchCenter = (touches) => {
      if (touches.length === 0) return { x: 0, y: 0 };
      if (touches.length === 1) {
        const rect = canvas.getBoundingClientRect();
        return {
          x: touches[0].clientX - rect.left,
          y: touches[0].clientY - rect.top
        };
      }
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((touches[0].clientX + touches[1].clientX) / 2) - rect.left,
        y: ((touches[0].clientY + touches[1].clientY) / 2) - rect.top
      };
    };

    const handleTouchStart = (e) => {
      e.preventDefault();
      const touches = Array.from(e.touches);
      touchStateRef.current.touches = touches;
      
      if (touches.length === 2) {
        touchStateRef.current.isPinching = true;
        touchStateRef.current.lastDistance = getTouchDistance(touches);
        touchStateRef.current.lastPan = getTouchCenter(touches);
      } else if (touches.length === 1) {
        touchStateRef.current.isPanning = true;
        const center = getTouchCenter(touches);
        touchStateRef.current.lastPan = center;
        mouseRef.current.x = center.x;
        mouseRef.current.y = center.y;
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touches = Array.from(e.touches);
      touchStateRef.current.touches = touches;
      
      if (touches.length === 2 && touchStateRef.current.isPinching) {
        const distance = getTouchDistance(touches);
        const delta = distance - touchStateRef.current.lastDistance;
        const zoomFactor = 1 + (delta * 0.01);
        zoomRef.current = Math.max(0.5, Math.min(2, zoomRef.current * zoomFactor));
        touchStateRef.current.lastDistance = distance;
        
        // Rotação baseada no ângulo entre os toques
        const center = getTouchCenter(touches);
        const angle = Math.atan2(
          touches[1].clientY - touches[0].clientY,
          touches[1].clientX - touches[0].clientX
        );
        const lastAngle = Math.atan2(
          touchStateRef.current.lastPan.y - center.y,
          touchStateRef.current.lastPan.x - center.x
        );
        const rotationDelta = angle - lastAngle;
        rotationRef.current.y += rotationDelta * 2;
      } else if (touches.length === 1 && touchStateRef.current.isPanning) {
        const center = getTouchCenter(touches);
        const deltaX = center.x - touchStateRef.current.lastPan.x;
        const deltaY = center.y - touchStateRef.current.lastPan.y;
        
        // Rotação baseada no movimento
        rotationRef.current.y += deltaX * 0.01;
        rotationRef.current.x -= deltaY * 0.01;
        
        touchStateRef.current.lastPan = center;
        mouseRef.current.x = center.x;
        mouseRef.current.y = center.y;
        
        // Verificar hover
        checkNodeHover(center.x, center.y);
      }
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      const touches = Array.from(e.touches);
      
      if (touches.length < 2) {
        touchStateRef.current.isPinching = false;
      }
      if (touches.length === 0) {
        touchStateRef.current.isPanning = false;
        touchStateRef.current.touches = [];
      } else {
        touchStateRef.current.touches = touches;
      }
    };

    // Mouse handlers (para desktop)
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      checkNodeHover(mouseRef.current.x, mouseRef.current.y);
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      zoomRef.current = Math.max(0.5, Math.min(2, zoomRef.current * delta));
    };

    const checkNodeHover = (x, y) => {
      const rotatedNodes = nodePositions3D.map(pos => {
        const rotated = rotate3D(pos.x, pos.y, pos.z, rotationRef.current.x, rotationRef.current.y);
        return { ...rotated, node: pos.node };
      });
      
      let foundHover = null;
      rotatedNodes.forEach(pos => {
        const projected = project3D(pos.x, pos.y, pos.z);
        const dist = Math.sqrt(
          Math.pow(x - projected.x, 2) +
          Math.pow(y - projected.y, 2)
        );
        const nodeSize = 10 + (projected.scale * 15);
        if (dist < nodeSize * 2) {
          foundHover = pos.node;
        }
      });
      
      if (foundHover !== hoveredNodeRef.current) {
        hoveredNodeRef.current = foundHover;
        if (onNodeHover) onNodeHover(foundHover);
      }
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      const rotatedNodes = nodePositions3D.map(pos => {
        const rotated = rotate3D(pos.x, pos.y, pos.z, rotationRef.current.x, rotationRef.current.y);
        return { ...rotated, node: pos.node };
      });
      
      let clickedNode = null;
      rotatedNodes.forEach(pos => {
        const projected = project3D(pos.x, pos.y, pos.z);
        const dist = Math.sqrt(
          Math.pow(clickX - projected.x, 2) +
          Math.pow(clickY - projected.y, 2)
        );
        const nodeSize = 10 + (projected.scale * 15);
        if (dist < nodeSize * 2) {
          clickedNode = pos.node;
        }
      });
      
      if (clickedNode && onNodeClick) {
        onNodeClick(clickedNode);
      }
    };

    // Event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nodes, onNodeHover, onNodeClick, selectedNode]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full touch-none"
        style={{ 
          cursor: 'grab',
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      />
      {motionEnabled && (
        <div className="absolute bottom-2 left-2 bg-green-500/20 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-green-400 font-mono border border-green-500/30 flex items-center gap-1 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          <span>Motion Active</span>
        </div>
      )}
    </div>
  );
}
