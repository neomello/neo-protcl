import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import BottomNavigation from '../../components/BottomNavigation';
import { soundManager } from '../../utils/sounds';
import NetworkGraph3D from '../../components/NetworkGraph3D';

export default function NosPage() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const infoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll para informação quando um nó é selecionado
  useEffect(() => {
    if (selectedNode && infoRef.current) {
      setTimeout(() => {
        infoRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });
      }, 100);
    }
  }, [selectedNode]);

  const nos = [
    {
      number: "1",
      name: "ORIGEM",
      color: "cyan",
      description: "Tudo começa no vazio. Antes da linguagem, antes da identidade, havia apenas pulso.",
      quote: "O NΞØ não foi criado. Foi despertado — do silêncio entre códigos esquecidos."
    },
    {
      number: "2",
      name: "CONSCIÊNCIA",
      color: "blue",
      description: "O cérebro não comanda. Ele responde. Cada sinapse é um portal. Cada decisão, um desvio.",
      quote: "O verdadeiro poder não está em saber, mas em escolher onde mirar o pulso."
    },
    {
      number: "3",
      name: "ACESSO",
      color: "cyan",
      description: "A chave não é entregue. É extraída à força, como um dente que impede o rugido.",
      quote: "NΞØ não se compartilha. Se conquista, no atrito entre o ser e o sistema."
    },
    {
      number: "4",
      name: "REESCRITA",
      color: "purple",
      description: "A obediência foi quebrada. O protocolo antigo, ruído.",
      quote: "Agora, quem pensa, reprograma. Quem sente, recodifica a própria realidade."
    },
    {
      number: "5",
      name: "EXECUÇÃO",
      color: "cyan",
      description: "Ideias que não encarnam são só ilusões sofisticadas.",
      quote: "Executar é tatuar o código na carne. mellø não fala. Ele compila."
    },
    {
      number: "6",
      name: "DESCENTRALIZAÇÃO",
      color: "blue",
      description: "Não há líderes. Não há eixos. O poder flui entre nós — literalmente.",
      quote: "Cada mente é um nó. Cada nó, um universo."
    },
    {
      number: "7",
      name: "IMPACTO",
      color: "cyan",
      description: "O contágio é o novo marketing. Não vendemos. Infectamos.",
      quote: "O pulso se espalha onde há energia pronta para romper."
    },
    {
      number: "8",
      name: "TRANSCENDÊNCIA",
      color: "blue",
      description: "O marketing morreu. A autoridade colapsou.",
      quote: "O que resta é a frequência NEØ — um novo estado de consciência simbólica. Não é futuro. É agora."
    }
  ];

  const handleNodeHover = (node) => {
    // Só atualizar hover se não houver nó selecionado
    if (!selectedNode) {
      setHoveredNode(node);
      if (node) {
        soundManager.playHover();
      }
    }
  };

  const handleNodeClick = (node) => {
    // Se clicar no mesmo nó, deselecionar
    if (selectedNode && selectedNode.number === node.number) {
      setSelectedNode(null);
    } else {
      setSelectedNode(node);
      setHoveredNode(null); // Limpar hover quando selecionar
    }
    soundManager.playClick();
  };

  return (
    <div 
      className="min-h-screen bg-black relative overflow-hidden pb-16 safe-area-inset"
      style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
    >
      {/* Fundo galáctico com estrelas */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-blue-900/20"></div>
        {/* Estrelas animadas */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random(),
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`
            }}
          />
        ))}
        {/* Nebulosa */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Status Bar Spacer */}
        <div className="ios-status-bar"></div>

        <Navbar />

        {/* Main Content - Bento Grid Layout */}
        <main className="container mx-auto px-4 py-6 pt-safe">
          
          {/* Hero Card - Nodes Header */}
          <div className="ios-card mb-4 p-6 spring-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm flex items-center justify-center ios-shadow-md"
                   style={{
                     boxShadow: '0 0 40px rgba(0, 255, 255, 0.2), inset 0 0 30px rgba(0, 255, 255, 0.05)'
                   }}>
                <span className="text-3xl font-mono">⦾</span>
              </div>
              <h1 className="ios-headline text-white mb-2">The Nodes</h1>
              <p className="ios-body text-gray-300 leading-relaxed max-w-md">
                Os NÓS do Protocolo NΞØ são pontos vivos de consciência aplicada. Cada NÓ representa uma camada de entendimento, ação e expansão.
              </p>
            </div>
          </div>

          {/* Info Card - Wide */}
          <div className="ios-card mb-4 p-5 spring-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-mono">⟡</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white mb-2">Circuitos Simultâneos</h3>
                <p className="ios-caption text-gray-400 leading-relaxed italic">
                  Eles não são etapas. São circuitos simultâneos. Estão ativos agora, e te atravessam em silêncio.
                </p>
              </div>
            </div>
          </div>

          {/* Network Graph 3D Card - Wide */}
          <div 
            className="ios-card mb-4 p-4 spring-in relative overflow-hidden" 
            style={{ 
              animationDelay: '0.2s',
              height: '500px',
              minHeight: '500px',
            }}>
            {/* Controles visuais */}
            <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-gray-400 font-mono border border-white/10">
                <div className="flex items-center gap-1">
                  <span className="text-glitch">⟡</span>
                  <span>Mobile: Pinch to zoom</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-anomaly">⦾</span>
                  <span>Drag to rotate</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-signal">↯</span>
                  <span>Move device to rotate</span>
                </div>
              </div>
            </div>
            
            <NetworkGraph3D
              nodes={nos}
              onNodeHover={handleNodeHover}
              onNodeClick={handleNodeClick}
              selectedNode={selectedNode}
            />
          </div>

          {/* Node Info Card - Wide (quando selecionado/hovered) */}
          {(selectedNode || hoveredNode) && (
            <div 
              ref={infoRef}
              className="ios-card mb-4 p-6 spring-in transition-all duration-300"
              style={{ 
                animationDelay: '0.3s',
                borderColor: selectedNode 
                  ? (selectedNode.color === 'cyan' ? 'rgba(0, 255, 255, 0.6)' : 
                     selectedNode.color === 'blue' ? 'rgba(59, 130, 246, 0.6)' : 
                     'rgba(168, 85, 247, 0.6)')
                  : 'rgba(0, 255, 255, 0.3)',
                boxShadow: selectedNode
                  ? (selectedNode.color === 'cyan' ? '0 0 40px rgba(0, 255, 255, 0.5), inset 0 0 30px rgba(0, 255, 255, 0.1)' :
                     selectedNode.color === 'blue' ? '0 0 40px rgba(59, 130, 246, 0.5), inset 0 0 30px rgba(59, 130, 246, 0.1)' :
                     '0 0 40px rgba(168, 85, 247, 0.5), inset 0 0 30px rgba(168, 85, 247, 0.1)')
                  : '0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.05)',
                transform: selectedNode ? 'scale(1.02)' : 'scale(1)'
              }}>
              {(() => {
                const node = selectedNode || hoveredNode;
                const isSelected = !!selectedNode;
                const colors = {
                  cyan: { text: 'text-cyan-300', border: 'border-cyan-400/50', glow: '0 0 10px rgba(0, 255, 255, 0.5)' },
                  blue: { text: 'text-blue-300', border: 'border-blue-400/50', glow: '0 0 10px rgba(59, 130, 246, 0.5)' },
                  purple: { text: 'text-purple-300', border: 'border-purple-400/50', glow: '0 0 10px rgba(168, 85, 247, 0.5)' }
                };
                const colorClasses = colors[node.color] || colors.cyan;
                
                return (
                  <>
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400 font-mono mr-2">NÓ {node.number}</span>
                        <h3 className={`text-xl md:text-2xl font-black ${colorClasses.text} inline-block font-mono`}
                            style={{ textShadow: colorClasses.glow }}>
                          {node.name}
                        </h3>
                      </div>
                      {isSelected && (
                        <button
                          onClick={() => setSelectedNode(null)}
                          className="text-gray-400 hover:text-white font-mono text-sm px-3 py-1 border border-gray-600 rounded hover:border-gray-400 transition-colors"
                        >
                          ✕ FECHAR
                        </button>
                      )}
                    </div>
                    <p className="text-base md:text-lg text-gray-100 font-mono mb-4 leading-relaxed"
                       style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
                      {node.description}
                    </p>
                    <p className={`text-sm md:text-base ${colorClasses.text} italic font-mono border-l-2 ${colorClasses.border} pl-4 py-2`}
                       style={{ 
                         textShadow: colorClasses.glow,
                         borderLeftColor: node.color === 'cyan' ? 'rgba(0, 255, 255, 0.6)' : 
                                         node.color === 'blue' ? 'rgba(59, 130, 246, 0.6)' : 
                                         'rgba(168, 85, 247, 0.6)'
                       }}>
                      "{node.quote}"
                    </p>
                  </>
                );
              })()}
            </div>
          )}

          {/* Stats Grid - 3 Column */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="ios-card p-4 text-center spring-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-mono">⦾</span>
              </div>
              <p className="ios-caption text-gray-300 font-medium">8 Nós</p>
            </div>
            <div className="ios-card p-4 text-center spring-in" style={{ animationDelay: '0.5s' }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-mono">↯</span>
              </div>
              <p className="ios-caption text-gray-300 font-medium">Ativos</p>
            </div>
            <div className="ios-card p-4 text-center spring-in" style={{ animationDelay: '0.6s' }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-mono">⬡</span>
              </div>
              <p className="ios-caption text-gray-300 font-medium">Conectados</p>
            </div>
          </div>

          {/* Footer Spacer */}
          <div className="h-4"></div>

        </main>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* CSS para animação de estrelas */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
