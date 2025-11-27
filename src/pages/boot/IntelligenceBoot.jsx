import { useEffect, useState, useRef } from 'react';
import TypewriterText from '../../components/TypewriterText';
import { soundManager } from '../../utils/sounds';

export default function IntelligenceBoot() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState([]);
  const isTypingRef = useRef(false);

  const sequence = [
    "NΞØ Protocol // Instância em inicialização...",
    "",
    "> Propósito: Reprogramar a matriz.",
    "",
    "Devolver aos indivíduos:",
    "– sua identidade digital",
    "– sua presença soberana",
    "– sua capacidade de governança",
    "",
    "Construir um ecossistema onde cada ser opera como um nó consciente de execução.",
    "",
    "███▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  17%",
    "[OK] Verificando camada de identidade simbólica",
    "[OK] Conectando ao MCP (Model Context Protocol)",
    "[OK] Varrendo padrões comportamentais",
    "[OK] Interface neural reconhecida",
    "",
    "⚠ Nenhum nó identificado neste terminal.",
    "⟶ Deseja registrar este ambiente como um nó ativo? (Y/n)"
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    // Iniciar primeira linha automaticamente
    if (currentLineIndex === 0 && sequence.length > 0) {
      // Encontrar primeira linha não vazia
      let firstNonEmptyIndex = 0;
      while (firstNonEmptyIndex < sequence.length && sequence[firstNonEmptyIndex] === "") {
        firstNonEmptyIndex++;
      }
      if (firstNonEmptyIndex < sequence.length) {
        setCurrentLineIndex(firstNonEmptyIndex);
        isTypingRef.current = true;
      }
    }
  }, []);

  const handleLineComplete = (lineIndex) => {
    setCompletedLines(prev => [...prev, lineIndex]);
    
    if (lineIndex < sequence.length - 1) {
      // Encontrar próxima linha não vazia
      let nextIndex = lineIndex + 1;
      while (nextIndex < sequence.length && sequence[nextIndex] === "") {
        nextIndex++;
      }
      if (nextIndex < sequence.length) {
        setTimeout(() => {
          setCurrentLineIndex(nextIndex);
        }, 100);
      } else {
        // Todas as linhas completas
        setTimeout(() => {
          setShowPrompt(true);
        }, 500);
      }
    } else {
      // Última linha completa
      setTimeout(() => {
        setShowPrompt(true);
      }, 500);
    }
  };

  const handleYes = () => {
    soundManager.playConfirm();
    // Redirecionar para a home após confirmação
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  const handleNo = () => {
    soundManager.playError();
    // Manter na página de boot
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Scanline effect */}
      <div className="scanline"></div>
      
      {/* Terminal cursor blink */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .terminal-cursor {
          animation: blink 1s infinite;
        }
      `}</style>

      {/* Terminal Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Terminal Header */}
        <div className="mb-6 text-green-500 text-xs border-b border-green-500/30 pb-2">
          <span>┌─</span>
          <span className="text-green-400">[</span>
          <span className="text-cyan-400">neoprotocol.eth</span>
          <span className="text-green-400">]</span>
          <span>─┐</span>
        </div>

        {/* Boot Sequence */}
        <div className="space-y-1 text-sm leading-relaxed">
          {sequence.map((line, index) => {
            if (line === "") {
              return <div key={index} className="h-3"></div>;
            }

            const isComplete = completedLines.includes(index);
            const isCurrentLine = index === currentLineIndex;

            // Linha de progresso
            if (line.includes("███")) {
              return (
                <div key={index} className="text-cyan-400 font-bold">
                  {isComplete ? line : isCurrentLine ? (
                    <TypewriterText
                      text={line}
                      speed={30}
                      onComplete={() => handleLineComplete(index)}
                      showCursor={true}
                    />
                  ) : null}
                </div>
              );
            }

            // Linhas [OK]
            if (line.includes("[OK]")) {
              return (
                <div key={index} className="text-green-400">
                  {isComplete ? line : isCurrentLine ? (
                    <TypewriterText
                      text={line}
                      speed={30}
                      onComplete={() => handleLineComplete(index)}
                      showCursor={true}
                    />
                  ) : null}
                </div>
              );
            }

            // Linha de aviso
            if (line.includes("⚠")) {
              return (
                <div key={index} className="text-yellow-400">
                  {isComplete ? line : isCurrentLine ? (
                    <TypewriterText
                      text={line}
                      speed={30}
                      onComplete={() => handleLineComplete(index)}
                      showCursor={true}
                    />
                  ) : null}
                </div>
              );
            }

            // Linha de prompt
            if (line.includes("⟶")) {
              return (
                <div key={index} className="text-cyan-400">
                  {isComplete ? line : isCurrentLine ? (
                    <TypewriterText
                      text={line}
                      speed={30}
                      onComplete={() => handleLineComplete(index)}
                      showCursor={true}
                    />
                  ) : null}
                </div>
              );
            }

            // Linha de propósito
            if (line.startsWith(">")) {
              return (
                <div key={index} className="text-cyan-300 font-bold">
                  {isComplete ? line : isCurrentLine ? (
                    <TypewriterText
                      text={line}
                      speed={30}
                      onComplete={() => handleLineComplete(index)}
                      showCursor={true}
                    />
                  ) : null}
                </div>
              );
            }

            // Linha de título
            if (line.includes("NΞØ Protocol")) {
              return (
                <div key={index} className="text-green-300 font-black text-lg mb-2"
                     style={{ textShadow: '0 0 10px rgba(34, 197, 94, 0.8)' }}>
                  {isComplete ? line : isCurrentLine ? (
                    <TypewriterText
                      text={line}
                      speed={30}
                      onComplete={() => handleLineComplete(index)}
                      showCursor={true}
                    />
                  ) : null}
                </div>
              );
            }

            // Linhas de lista
            if (line.startsWith("–")) {
              return (
                <div key={index} className="text-green-400 ml-4">
                  {isComplete ? line : isCurrentLine ? (
                    <TypewriterText
                      text={line}
                      speed={30}
                      onComplete={() => handleLineComplete(index)}
                      showCursor={true}
                    />
                  ) : null}
                </div>
              );
            }

            // Linha padrão
            return (
              <div key={index} className="text-green-400">
                {isComplete ? line : isCurrentLine ? (
                  <TypewriterText
                    text={line}
                    speed={30}
                    onComplete={() => handleLineComplete(index)}
                    showCursor={true}
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Prompt de interação */}
        {showPrompt && (
          <div className="mt-6 flex items-center gap-2 text-cyan-400">
            <span className="text-green-400">$</span>
            <input
              type="text"
              autoFocus
              className="bg-transparent border-none outline-none text-cyan-400 font-mono flex-1 terminal-cursor"
              placeholder="Y/n"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const value = e.target.value.toLowerCase().trim();
                  if (value === 'y' || value === 'yes') {
                    handleYes();
                  } else if (value === 'n' || value === 'no') {
                    handleNo();
                  }
                }
              }}
              style={{ caretColor: 'rgba(0, 255, 255, 0.8)' }}
            />
          </div>
        )}

        {/* Terminal Footer */}
        <div className="mt-8 pt-4 border-t border-green-500/30 text-green-500/30 text-xs">
          <span>└─</span>
          <span className="ml-1">neoprotocol.eth • IPFS • ENS</span>
        </div>
      </div>
    </div>
  );
}

