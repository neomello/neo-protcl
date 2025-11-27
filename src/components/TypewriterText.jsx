import { useState, useEffect, useRef } from 'react';
import { soundManager } from '../utils/sounds';

/**
 * Componente de texto com efeito typewriter (digitação)
 * Inclui som de impressora matricial dos anos 90
 */
export default function TypewriterText({ 
  text, 
  speed = 30, // ms por caractere
  onComplete,
  className = '',
  style = {},
  showCursor = true
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Reset quando o texto mudar
    setDisplayedText('');
    indexRef.current = 0;
    setIsTyping(true);
    
    // Não iniciar som aqui - será gerenciado pelo componente pai

    const typeNextChar = () => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        // Tocar som da cabeça da impressora a cada caractere (exceto espaços)
        const char = text[indexRef.current];
        if (char && char !== ' ') {
          soundManager.playPrinterHead();
        }
        indexRef.current++;
        timeoutRef.current = setTimeout(typeNextChar, speed);
      } else {
        // Terminou de digitar
        setIsTyping(false);
        if (onComplete) {
          onComplete();
        }
      }
    };

    // Iniciar digitação após um pequeno delay
    timeoutRef.current = setTimeout(typeNextChar, 100);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Não parar o som no cleanup - será gerenciado pelo componente pai
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]); // Removido onComplete das dependências para evitar loops

  return (
    <span className={className} style={style}>
      {displayedText}
      {showCursor && isTyping && (
        <span className="animate-pulse text-gray-600">|</span>
      )}
    </span>
  );
}

/**
 * Componente para múltiplas linhas com typewriter
 */
export function TypewriterLines({ 
  lines, 
  speed = 30,
  lineDelay = 200, // delay entre linhas
  onComplete,
  className = '',
  renderLine
}) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [lineStates, setLineStates] = useState({});
  const isFirstLine = useRef(true);

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      if (isFirstLine.current) {
        soundManager.startPrinterSound();
        isFirstLine.current = false;
      }
    } else {
      soundManager.stopPrinterSound();
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentLineIndex, lines.length, onComplete]);

  const handleLineComplete = (lineIndex) => {
    setLineStates(prev => ({ ...prev, [lineIndex]: 'complete' }));
    if (lineIndex < lines.length - 1) {
      setTimeout(() => {
        setCurrentLineIndex(lineIndex + 1);
      }, lineDelay);
    } else {
      soundManager.stopPrinterSound();
    }
  };

  return (
    <div className={className}>
      {lines.map((line, index) => {
        if (line === "") {
          return <div key={index} className="h-4"></div>;
        }

        const state = lineStates[index];
        const isTyping = index === currentLineIndex;
        const isComplete = state === 'complete' || index < currentLineIndex;

        if (renderLine) {
          if (isComplete) {
            return renderLine(line, index, true);
          } else if (isTyping) {
            const styledLine = renderLine(line, index, false);
            // Se renderLine retornou um elemento, precisamos substituir o texto pelo TypewriterText
            if (styledLine && styledLine.type) {
              return (
                <styledLine.type
                  key={index}
                  {...styledLine.props}
                >
                  <TypewriterText
                    text={line}
                    speed={speed}
                    onComplete={() => handleLineComplete(index)}
                    className={styledLine.props.className}
                    style={styledLine.props.style}
                    showCursor={true}
                  />
                </styledLine.type>
              );
            }
          }
          return null;
        }

        // Fallback sem renderLine
        if (isComplete) {
          return (
            <p key={index} className="text-base md:text-lg font-medium text-gray-200 font-['Courier_New',monospace]">
              {line}
            </p>
          );
        } else if (isTyping) {
          return (
            <TypewriterText
              key={index}
              text={line}
              speed={speed}
              onComplete={() => handleLineComplete(index)}
              className="text-base md:text-lg font-medium text-gray-200 font-['Courier_New',monospace]"
              showCursor={true}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

