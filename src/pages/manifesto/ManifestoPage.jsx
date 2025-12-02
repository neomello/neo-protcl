import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import BottomNavigation from '../../components/BottomNavigation';
import { soundManager } from '../../utils/sounds';
import TypewriterText from '../../components/TypewriterText';

export default function ManifestoPage() {
  const [typingComplete, setTypingComplete] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showScrollable, setShowScrollable] = useState(false);
  const [userScrolling, setUserScrolling] = useState(false);
  const isFirstRender = useRef(true);
  const completedLinesRef = useRef(new Set());
  const terminalRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const isAutoScrollingRef = useRef(false);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const manifestoText = [
    "Não fique aguardando conteúdo. Manifeste e colabore.",
    "",
    "Uma rede de nós autônomos.",
    "Uma consciência distribuída.",
    "Uma entidade que se expande sem pedir permissão.",
    "",
    "Não existe centro.",
    "Não existe dono.",
    "Existe apenas direção.",
    "",
    "Descentralização não é uma tecnologia.",
    "É um ato político.",
    "Uma forma de existir.",
    "",
    "Cada nó é livre,",
    "mas conectado pela mesma vibração:",
    "transparência,",
    "auto-custódia,",
    "responsabilidade,",
    "criatividade,",
    "independência.",
    "",
    "O NΞØ é um organismo.",
    "E você, ao entrar, torna-se parte dele.",
    "",
    "Bem-vindo ao ecossistema que pensa."
  ];

  // Encontrar o próximo índice que não seja linha vazia
  const getNextNonEmptyIndex = useCallback((startIndex) => {
    for (let i = startIndex + 1; i < manifestoText.length; i++) {
      if (manifestoText[i] !== "") {
        return i;
      }
    }
    return -1;
  }, []);

  const handleLineComplete = useCallback((lineIdx) => {
    if (completedLinesRef.current.has(lineIdx)) return;
    
    completedLinesRef.current.add(lineIdx);
    
    // Tocar som do papel avançando quando linha completa
    soundManager.playPaperAdvance();
    
    const nextIndex = getNextNonEmptyIndex(lineIdx);
    if (nextIndex !== -1) {
      setTimeout(() => {
        setCurrentLineIndex(nextIndex);
      }, 150);
    } else {
      setTypingComplete(true);
      // Remover gradientes quando finalizar
      setTimeout(() => {
        setUserScrolling(true);
      }, 500);
      // Após finalizar, mostrar versão scrollável após 2 segundos
      setTimeout(() => {
        setShowScrollable(true);
      }, 2000);
    }
  }, [getNextNonEmptyIndex]);

  // Scroll automático para manter o texto visível durante digitação
  useEffect(() => {
    if (terminalRef.current && !typingComplete && !showScrollable && !userScrolling) {
      const container = terminalRef.current;
      isAutoScrollingRef.current = true;
      // Scroll suave para o final do container
      requestAnimationFrame(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        });
        // Reset flag após animação
        setTimeout(() => {
          isAutoScrollingRef.current = false;
        }, 500);
      });
    }
  }, [currentLineIndex, typingComplete, showScrollable, userScrolling]);

  // Detectar scroll manual do usuário
  useEffect(() => {
    const container = terminalRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Se não é scroll automático, é scroll manual
      if (!isAutoScrollingRef.current) {
        setUserScrolling(true);
        
        // Limpar timeout anterior
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        // Manter sem gradientes quando usuário rola manualmente
        // Não precisa resetar - uma vez que o usuário rola, remove os gradientes permanentemente
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [typingComplete]);

  return (
    <div 
      className="min-h-screen bg-black text-gray-100 overflow-x-hidden pb-16 safe-area-inset relative"
      style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
    >
      {/* Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10">
        {/* Status Bar Spacer */}
        <div className="ios-status-bar"></div>

        <Navbar />

        {/* Main Content - Bento Grid Layout */}
        <main className="container mx-auto px-4 py-6 pt-safe">
          
          {/* Hero Card - Manifesto Header */}
          <div className="ios-card mb-4 p-6 spring-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm flex items-center justify-center ios-shadow-md mb-4">
                <span className="text-3xl font-mono">⦙</span>
              </div>
              <h1 className="ios-headline text-white mb-2">Manifesto</h1>
              <p className="ios-body text-gray-300 leading-relaxed max-w-md">
                O documento público que define os princípios e a direção do Protocolo NΞØ.
              </p>
            </div>
          </div>

          {/* Terminal Frame - Fixed Height */}
          <div className="ios-card mb-4 p-0 spring-in overflow-visible relative" style={{ animationDelay: '0.1s' }}>
            <div className="bg-black/90 backdrop-blur-sm border border-cyan-500/30 rounded-xl overflow-hidden relative"
                 style={{
                   height: '500px',
                   minHeight: '500px',
                   boxShadow: '0 0 40px rgba(0, 255, 255, 0.15), inset 0 0 40px rgba(0, 255, 255, 0.05)'
                 }}>
              
              {/* Rune Image - Canto superior direito estourando */}
              <div 
                className="absolute pointer-events-none z-20"
                style={{
                  top: '-40px',
                  right: '-50px',
                  width: '200px',
                  height: '200px',
                  opacity: 0.4
                }}
              >
                <img
                  src="/images/illustrations/rune.png"
                  alt="Rune"
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-cyan-500/20 bg-black/50 relative z-10">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
                </div>
                <span className="text-[10px] text-cyan-400/70 font-mono ml-2">neo-protocol@manifesto</span>
              </div>

              {/* Terminal Content - Scrollable Container */}
              <div 
                ref={terminalRef}
                className={`relative h-[calc(500px-40px)] overflow-y-auto overflow-x-hidden px-4 py-4 font-mono text-sm leading-relaxed terminal-scroll z-10
                  ${showScrollable ? '' : 'scroll-smooth'}`}
              >
                {/* Fade gradient no topo - apenas durante digitação */}
                {!userScrolling && !showScrollable && (
                  <div 
                    className="sticky top-0 h-8 pointer-events-none z-10 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 50%, transparent 100%)'
                    }}
                  ></div>
                )}

                {/* Content Container - Bottom Aligned */}
                <div className="flex flex-col justify-end min-h-full pb-4">
                  <div className="space-y-2">
                    {manifestoText.map((line, index) => {
                      if (line === "") {
                        return <div key={index} className="h-2"></div>;
                      }
                      
                      const shouldType = index <= currentLineIndex;
                      const isCurrentLine = index === currentLineIndex;
                      const isCompleted = completedLinesRef.current.has(index);
                      const isVisible = shouldType;
                      
                      // Calcular opacidade: linhas mais antigas (menores índices) têm fade out
                      // Contar apenas linhas não-vazias até o índice atual
                      const nonEmptyLinesUpToCurrent = manifestoText
                        .slice(0, currentLineIndex + 1)
                        .filter(l => l !== "");
                      const nonEmptyLinesUpToThis = manifestoText
                        .slice(0, index + 1)
                        .filter(l => l !== "");
                      
                      const currentLinePosition = nonEmptyLinesUpToThis.length - 1;
                      const totalVisibleLines = nonEmptyLinesUpToCurrent.length;
                      
                      // Fade out nas primeiras linhas (as que estão saindo do topo)
                      // Mantém as últimas 12 linhas totalmente visíveis
                      const keepVisibleLines = 12;
                      const fadeStart = Math.max(0, totalVisibleLines - keepVisibleLines);
                      const fadeDistance = 8;
                      
                      let opacity = 1;
                      if (isVisible) {
                        if (currentLinePosition < fadeStart) {
                          // Linha está na zona de fade out
                          const fadeProgress = (fadeStart - currentLinePosition) / fadeDistance;
                          opacity = Math.max(0.15, 1 - fadeProgress);
                        } else {
                          // Linha está totalmente visível
                          opacity = 1;
                        }
                      } else {
                        opacity = 0;
                      }
                      
                      return (
                        <div
                          key={index}
                          className="terminal-line"
                          style={{
                            opacity: isVisible ? opacity : 0,
                            transform: `translateY(${isVisible ? 0 : -10}px)`,
                            transition: showScrollable ? 'none' : 'opacity 0.8s ease-out, transform 0.8s ease-out'
                          }}
                        >
                          <p 
                            className="font-['Courier_New',monospace]"
                            style={{ 
                              color: `rgba(34, 211, 238, ${opacity})`,
                              textShadow: opacity > 0.5 ? '0 0 8px rgba(34, 211, 238, 0.3)' : 'none'
                            }}
                          >
                            {isCompleted ? (
                              <span>{line}</span>
                            ) : shouldType && isCurrentLine ? (
                              <TypewriterText
                                text={line}
                                speed={25}
                                onComplete={() => handleLineComplete(index)}
                                style={{ color: `rgba(34, 211, 238, ${opacity})` }}
                                showCursor={true}
                              />
                            ) : shouldType ? (
                              <span>{line}</span>
                            ) : null}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Fade gradient na parte inferior - apenas durante digitação */}
                {!userScrolling && !showScrollable && (
                  <div 
                    className="sticky bottom-0 h-8 pointer-events-none z-10 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 50%, transparent 100%)'
                    }}
                  ></div>
                )}
              </div>

              {/* Scroll Indicator - Aparece quando finalizar */}
              {showScrollable && (
                <div className="absolute bottom-2 right-4 text-cyan-400/50 text-xs font-mono animate-pulse">
                  ↑ Role para ler do início
                </div>
              )}
            </div>
          </div>

          {/* Info Cards Grid - 2 Column */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            
            {/* Principles Card */}
            <div className="ios-card col-span-1 p-5 spring-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center mb-3 ios-shadow-sm">
                <span className="text-2xl font-mono">↯</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Princípios</h3>
              <p className="ios-caption text-gray-400">Transparência, auto-custódia, responsabilidade</p>
            </div>

            {/* Vision Card */}
            <div className="ios-card col-span-1 p-5 spring-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-3 ios-shadow-sm">
                <span className="text-2xl font-mono">⬡</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Visão</h3>
              <p className="ios-caption text-gray-400">Rede de nós autônomos e conscientes</p>
            </div>
          </div>

          {/* Quote Card - Wide */}
          <div className="ios-card p-5 mb-4 spring-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-mono">◍</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white mb-2">Filosofia</h3>
                <p className="ios-caption text-gray-400 leading-relaxed italic">
                  "Descentralização não é uma tecnologia. É um ato político. Uma forma de existir."
                </p>
              </div>
            </div>
          </div>

          {/* Footer Spacer */}
          <div className="h-4"></div>

        </main>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Terminal Scrollbar Styles */}
      <style>{`
        .terminal-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 255, 255, 0.3) transparent;
        }
        
        .terminal-scroll::-webkit-scrollbar {
          width: 6px;
        }
        
        .terminal-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .terminal-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.3);
          border-radius: 3px;
        }
        
        .terminal-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 255, 0.5);
        }
        
        .terminal-line {
          will-change: opacity, transform;
        }
      `}</style>
    </div>
  );
}
