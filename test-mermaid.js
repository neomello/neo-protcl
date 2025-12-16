import mermaid from 'mermaid';

const diagram = `flowchart TD
A[Consciência Latente] -->|Incomodação| B[Contra o Sistema]
B -->|Atrito Real| C{Intenção Verificável?} 
C -->|Não| D[Ruído / Consumo Passivo]
D -->|Loop Infinito| B

C -->|Sim| E[Prova de Ação]
E -->|Registro On-chain| F[PoI Emitido]

F --> G[Identidade Reputacional]
G --> H[Entrada como Nó NEØ]

H --> I[Execução Distribuída]
I -->|Impacto Gerado| G`;

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
});

mermaid
  .render('test-diagram', diagram)
  .then((result) => {
    console.log('✅ Diagrama Mermaid válido!');
    console.log('SVG gerado com sucesso (', result.svg.length, 'caracteres)');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erro ao renderizar diagrama:', error.message);
    console.error('Detalhes:', error);
    process.exit(1);
  });
