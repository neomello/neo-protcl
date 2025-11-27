import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="min-h-screen bg-black relative overflow-hidden">
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

      {/* Header */}
      <header className="sticky top-0 z-30 bg-black/50 backdrop-blur-md border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link 
            to="/" 
            onClick={() => soundManager.playNavigate()}
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-mono flex items-center gap-2"
            style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}
          >
            <span className="text-lg">←</span>
            <span>VOLTAR</span>
          </Link>
          <h1 className="text-lg font-bold text-cyan-300 font-mono tracking-wider"
              style={{ textShadow: '0 0 15px rgba(0, 255, 255, 0.8)' }}>
            THE NODES OF NΞØ PROTOCOL
          </h1>
          <div className="w-16"></div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Container de texto com glassmorphism/HUD */}
        <div className="mb-8">
          <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-lg p-6 shadow-2xl"
               style={{
                 boxShadow: '0 0 30px rgba(0, 255, 255, 0.2), inset 0 0 30px rgba(0, 255, 255, 0.05)'
               }}>
            {/* Pergunta */}
            <div className="mb-4">
              <h2 className="text-xl md:text-2xl font-black text-cyan-300 font-mono mb-2"
                  style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.8)' }}>
                O que são os NÓS?
              </h2>
            </div>
            
            {/* Resposta simplificada */}
            <div className="text-base md:text-lg text-gray-200 font-mono leading-relaxed"
                 style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
              <p className="mb-3">
                Os NÓS do Protocolo NΞØ são pontos vivos de consciência aplicada. Cada NÓ representa uma camada de entendimento, ação e expansão. Ao atravessar cada um, você não apenas compreende o protocolo: você o encarna.
              </p>
              <p className="text-cyan-300/80 italic">
                Eles não são etapas. São circuitos simultâneos. Estão ativos agora, e te atravessam em silêncio.
              </p>
            </div>
          </div>
        </div>

        {/* Network Graph 3D */}
        <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 shadow-2xl"
             style={{
               height: '600px',
               minHeight: '600px',
               boxShadow: '0 0 40px rgba(0, 255, 255, 0.15), inset 0 0 40px rgba(0, 255, 255, 0.05)'
             }}>
          <NetworkGraph3D
            nodes={nos}
            onNodeHover={handleNodeHover}
            onNodeClick={handleNodeClick}
          />
        </div>

        {/* Info do nó selecionado/hovered */}
        {(selectedNode || hoveredNode) && (
          <div 
            ref={infoRef}
            className="mt-6 bg-black/70 backdrop-blur-xl border-2 rounded-lg p-6 shadow-2xl transition-all duration-300"
               style={{
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
      </main>

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
