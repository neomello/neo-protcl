import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';
import { soundManager } from '../../utils/sounds';
import TypewriterText from '../../components/TypewriterText';

export default function ManifestoPage() {
  const [typingComplete, setTypingComplete] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const isFirstRender = useRef(true);
  const completedLinesRef = useRef(new Set());

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
    }
  }, [getNextNonEmptyIndex]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header simples */}
      <header className="sticky top-0 z-20 bg-gray-100 border-b border-gray-300">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link 
            to="/" 
            onClick={() => soundManager.playNavigate()}
            className="text-gray-700 hover:text-gray-900 text-sm font-mono flex items-center gap-2"
          >
            <span className="text-lg">←</span>
            <span>VOLTAR</span>
          </Link>
          <h1 className="text-sm font-bold text-gray-600 font-mono tracking-wider">
            MANIFESTO
          </h1>
          <div className="w-16"></div>
        </div>
      </header>

      {/* Papel de impressora matricial */}
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="bg-white shadow-lg printer-paper">
          {/* Conteúdo do texto */}
          <div className="px-8 md:px-12 py-8 md:py-12">
            <div className="space-y-3 text-gray-800 leading-relaxed font-mono text-sm md:text-base">
              {manifestoText.map((line, index) => {
                if (line === "") {
                  return <div key={index} className="h-3"></div>;
                }
                
                const shouldType = index <= currentLineIndex;
                const isCurrentLine = index === currentLineIndex;
                const isCompleted = completedLinesRef.current.has(index);
                
                return (
                  <p key={index} className="font-['Courier_New',monospace]">
                    {isCompleted ? (
                      line
                    ) : shouldType && isCurrentLine ? (
                      <TypewriterText
                        text={line}
                        speed={25}
                        onComplete={() => handleLineComplete(index)}
                        className=""
                        style={{}}
                        showCursor={true}
                      />
                    ) : shouldType ? (
                      line
                    ) : null}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
