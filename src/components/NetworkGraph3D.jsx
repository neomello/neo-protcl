import { useEffect, useRef } from 'react';

export default function NetworkGraph3D({ nodes, onNodeHover, onNodeClick }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const hoveredNodeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;

    // Configuração 3D
    const centerX = width / 2;
    const centerY = height / 2;
    const depth = 300; // Profundidade 3D
    const radius = Math.min(width, height) * 0.25; // Raio da esfera

    // Posições 3D dos nós (distribuídos em uma esfera)
    const nodePositions3D = nodes.map((node, i) => {
      const angle1 = (i / nodes.length) * Math.PI * 2;
      const angle2 = Math.acos((i * 2.0) / nodes.length - 1);
      return {
        x: Math.sin(angle2) * Math.cos(angle1) * radius,
        y: Math.sin(angle2) * Math.sin(angle1) * radius,
        z: Math.cos(angle2) * radius,
        node: node
      };
    });

    // Projetar 3D para 2D
    const project3D = (x, y, z) => {
      const scale = depth / (depth + z);
      return {
        x: centerX + x * scale,
        y: centerY + y * scale,
        scale: scale
      };
    };

    // Rotação 3D
    const rotate3D = (x, y, z, rx, ry) => {
      // Rotação em X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      let newY = y * cosX - z * sinX;
      let newZ = y * sinX + z * cosX;
      
      // Rotação em Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const newX = x * cosY + newZ * sinY;
      newZ = -x * sinY + newZ * cosY;
      
      return { x: newX, y: newY, z: newZ };
    };

    // Desenhar conexões
    const drawConnections = (rotatedNodes) => {
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      
      // Conectar cada nó com seus vizinhos próximos
      for (let i = 0; i < rotatedNodes.length; i++) {
        for (let j = i + 1; j < rotatedNodes.length; j++) {
          const dist = Math.sqrt(
            Math.pow(rotatedNodes[i].x - rotatedNodes[j].x, 2) +
            Math.pow(rotatedNodes[i].y - rotatedNodes[j].y, 2) +
            Math.pow(rotatedNodes[i].z - rotatedNodes[j].z, 2)
          );
          
          // Conectar nós próximos (distância < 2 * radius)
          if (dist < radius * 1.5) {
            const p1 = project3D(rotatedNodes[i].x, rotatedNodes[i].y, rotatedNodes[i].z);
            const p2 = project3D(rotatedNodes[j].x, rotatedNodes[j].y, rotatedNodes[j].z);
            
            // Gradiente para profundidade
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            const alpha = Math.max(0.1, Math.min(0.4, (depth + rotatedNodes[i].z) / (depth * 2)));
            gradient.addColorStop(0, `rgba(0, 255, 255, ${alpha})`);
            gradient.addColorStop(1, `rgba(59, 130, 246, ${alpha})`);
            
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    // Desenhar nós
    const drawNodes = (rotatedNodes) => {
      rotatedNodes.forEach((pos, i) => {
        const projected = project3D(pos.x, pos.y, pos.z);
        const node = pos.node;
        
        // Tamanho baseado na profundidade
        const nodeSize = 8 + (projected.scale * 12);
        
        // Cores baseadas no nó
        const colors = {
          cyan: { main: 'rgba(0, 255, 255, 0.9)', glow: 'rgba(0, 255, 255, 0.5)' },
          blue: { main: 'rgba(59, 130, 246, 0.9)', glow: 'rgba(59, 130, 246, 0.5)' },
          purple: { main: 'rgba(168, 85, 247, 0.9)', glow: 'rgba(168, 85, 247, 0.5)' }
        };
        const color = colors[node.color] || colors.cyan;
        
        // Glow effect
        const glowSize = nodeSize * 2;
        const gradient = ctx.createRadialGradient(
          projected.x, projected.y, 0,
          projected.x, projected.y, glowSize
        );
        gradient.addColorStop(0, color.glow);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Nó principal
        ctx.fillStyle = color.main;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Nome do nó (se visível)
        if (projected.scale > 0.7) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.font = `${10 * projected.scale}px 'Courier New', monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.name, projected.x, projected.y + nodeSize + 15);
        }
      });
    };

    // Animar
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Rotação automática suave
      rotationRef.current.y += 0.003;
      rotationRef.current.x += 0.001;
      
      // Rotação baseada no mouse
      const targetRotationX = (mouseRef.current.y - centerY) / height * 0.5;
      const targetRotationY = (mouseRef.current.x - centerX) / width * 0.5;
      
      rotationRef.current.x += (targetRotationX - rotationRef.current.x) * 0.05;
      rotationRef.current.y += (targetRotationY - rotationRef.current.y) * 0.05;
      
      // Rotacionar nós
      const rotatedNodes = nodePositions3D.map(pos => {
        const rotated = rotate3D(pos.x, pos.y, pos.z, rotationRef.current.x, rotationRef.current.y);
        return { ...rotated, node: pos.node };
      });
      
      // Ordenar por profundidade (z)
      rotatedNodes.sort((a, b) => b.z - a.z);
      
      // Desenhar
      drawConnections(rotatedNodes);
      drawNodes(rotatedNodes);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      
      // Verificar hover
      const rotatedNodes = nodePositions3D.map(pos => {
        const rotated = rotate3D(pos.x, pos.y, pos.z, rotationRef.current.x, rotationRef.current.y);
        return { ...rotated, node: pos.node };
      });
      
      let foundHover = null;
      rotatedNodes.forEach(pos => {
        const projected = project3D(pos.x, pos.y, pos.z);
        const dist = Math.sqrt(
          Math.pow(mouseRef.current.x - projected.x, 2) +
          Math.pow(mouseRef.current.y - projected.y, 2)
        );
        if (dist < 30) {
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
      
      // Verificar qual nó foi clicado
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
        if (dist < 40) { // Área de clique maior
          clickedNode = pos.node;
        }
      });
      
      if (clickedNode && onNodeClick) {
        onNodeClick(clickedNode);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [nodes, onNodeHover, onNodeClick]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ cursor: 'pointer' }}
    />
  );
}

