import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

/**
 * Componente para renderizar diagramas Mermaid
 * 
 * @param {string} diagram - Código do diagrama Mermaid
 * @param {string} id - ID único para o diagrama (gerado automaticamente se não fornecido)
 */
export default function MermaidDiagram({ diagram, id }) {
  const containerRef = useRef(null);
  const diagramId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    // Inicializa Mermaid se ainda não foi inicializado
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
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

    // Renderiza o diagrama
    mermaid
      .render(diagramId, diagram)
      .then((result) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = result.svg;
        }
      })
      .catch((error) => {
        console.error('Erro ao renderizar diagrama Mermaid:', error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `<p class="text-red-400">Erro ao renderizar diagrama: ${error.message}</p>`;
        }
      });
  }, [diagram, diagramId]);

  return <div ref={containerRef} className="mermaid-diagram" />;
}

