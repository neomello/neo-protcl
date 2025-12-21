import { useEffect, useRef, useId, useMemo } from 'react';
import mermaid from 'mermaid';

// Inicializa Mermaid globalmente uma única vez com o tema do protocolo
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'JetBrains Mono, monospace',
  themeVariables: {
    primaryColor: '#00CFFF',
    primaryTextColor: '#0A0A0A',
    primaryBorderColor: '#00FF99',
    lineColor: '#00CFFF',
    secondaryColor: '#1B1B1B',
    tertiaryColor: '#00FF99',
    background: '#0A0A0A',
    mainBkgColor: '#0A0A0A',
    secondBkgColor: '#1B1B1B',
    textColor: '#F0F0F0',
  },
});

/**
 * Componente para renderizar diagramas Mermaid
 * 
 * @param {string} diagram - Código do diagrama Mermaid
 * @param {string} id - ID único opcional para o diagrama
 */
export default function MermaidDiagram({ diagram, id }) {
  const containerRef = useRef(null);
  const reactId = useId().replace(/:/g, ''); // Remove dois pontos do useId para ser um ID válido de DOM
  const diagramId = useMemo(() => id || `mermaid-${reactId}`, [id, reactId]);

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      if (!diagram || !containerRef.current) return;

      try {
        // Limpa o diagrama para evitar erros de sintaxe por espaços extras
        const cleanDiagram = diagram.trim();
        
        // Verifica se o diagrama é válido antes de tentar renderizar
        // Mermaid v10+ render retorna um objeto com { svg, bindFunctions }
        const { svg } = await mermaid.render(diagramId, cleanDiagram);
        
        if (isMounted && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error('Erro ao renderizar diagrama Mermaid:', error);
        if (isMounted && containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="p-4 border border-red-500/30 bg-red-500/10 rounded-xl text-xs">
              <p class="text-red-400 font-bold mb-1">Erro de Renderização</p>
              <p class="text-red-300/80 font-mono">${error.message || 'Erro desconhecido'}</p>
            </div>
          `;
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [diagram, diagramId]);

  return (
    <div 
      ref={containerRef} 
      className="mermaid-diagram w-full flex justify-center overflow-x-auto py-4"
      style={{ minHeight: '100px' }}
    />
  );
}

