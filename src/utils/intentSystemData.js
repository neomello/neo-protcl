/**
 * Dados do Sistema de Intenção NΞØ Protocol
 * Arquétipos, sinergias e dimensões de ressonância
 */

// Importar partículas do sistema NΞØ.UI
import { particles } from '../nexo-ui';

export const dimensions = [
  {
    id: 'problem_solving',
    title: 'Resolução de Problemas',
    subtitle: 'Como você navega o caos',
    particle: particles.interference, // ⌁ - Interferência (representa resolução/caos)
    prompt: 'O que acontece dentro de você nos primeiros momentos de um quebra-cabeça crítico?',
    color: 'from-blue-600/20 to-cyan-600/10',
  },
  {
    id: 'collaboration',
    title: 'Conexão & Colaboração',
    subtitle: 'Como você se vincula',
    particle: particles.propagation, // ⟴ - Propagação (representa rede/conexão)
    prompt: 'Qual é seu papel natural em uma teia de trabalho compartilhado?',
    color: 'from-emerald-600/20 to-teal-600/10',
  },
  {
    id: 'creation',
    title: 'Criação & Geração',
    subtitle: 'Como você manifesta',
    particle: particles.event, // ✶ - Evento (representa criação/manifestação)
    prompt: 'De onde vem o impulso criativo? Como ele cresce até se tornar real?',
    color: 'from-purple-600/20 to-pink-600/10',
  },
];

export const archetypeDatabase = {
  problem_solving: {
    'Engenheiro': {
      keywords: ['desmontar', 'partes', 'sistema', 'mapa', 'lógica', 'padrão', 'eficiente'],
      intent: 'Estruturar o caos através da razão',
    },
    'Contador de Histórias': {
      keywords: ['história', 'analogia', 'significado', 'exemplo', 'metáfora', 'sentido'],
      intent: 'Encontrar narrativa para navegar',
    },
    'Cirurgião': {
      keywords: ['isolar', 'cortar', 'intervir', 'rápido', 'núcleo', 'pressão'],
      intent: 'Eliminar disfunção com precisão',
    },
    'Jardineiro': {
      keywords: ['nutrir', 'ambiente', 'crescer', 'paciência', 'ecossistema', 'processo'],
      intent: 'Cultivar emergência orgânica',
    },
    'Jogador': {
      keywords: ['desafio', 'regras', 'estratégia', 'vencer', 'tática', 'recompensa'],
      intent: 'Transformar caos em competição',
    },
  },
  collaboration: {
    'Catalisador': {
      keywords: ['pergunta', 'apontar', 'inconsistência', 'desafiar', 'atrito', 'verdade'],
      intent: 'Acelerar clareza através da tensão',
    },
    'Costureiro': {
      keywords: ['conectar', 'harmonia', 'ouvidos', 'ponte', 'traduzir', 'sentir'],
      intent: 'Tecer redes de significado',
    },
    'Estrategista': {
      keywords: ['meta', 'dividir', 'eficiência', 'prazo', 'função', 'recursos'],
      intent: 'Otimizar rendimento coletivo',
    },
    'Especialista Reserva': {
      keywords: ['retaguarda', 'observar', 'técnico', 'específico', 'autonomia'],
      intent: 'Ofertar excelência pontual',
    },
    'Guardião': {
      keywords: ['proteger', 'cuidar', 'alerta', 'integridade', 'valores', 'lealdade'],
      intent: 'Salvaguardar o essencial',
    },
  },
  creation: {
    'Visionário': {
      keywords: ['imagem', 'visão', 'insight', 'traduzir', 'forma', 'fidelidade'],
      intent: 'Materializar visão interna',
    },
    'Alquimista': {
      keywords: ['fusão', 'colisão', 'cacos', 'soldar', 'hibridização', 'conexão'],
      intent: 'Criar pela fusão improvável',
    },
    'Agricultor': {
      keywords: ['fermentar', 'semente', 'alimentar', 'amadurecer', 'colher', 'processo'],
      intent: 'Cultivar maturação profunda',
    },
    'Artesão da Jaula': {
      keywords: ['restrição', 'limite', 'puzzle', 'jogo', 'dançar', 'estrutura'],
      intent: 'Libertar-se dentro dos limites',
    },
    'Explosivo': {
      keywords: ['pressão', 'explosão', 'urgência', 'catártico', 'potência', 'fluxo'],
      intent: 'Liberar em catálise súbita',
    },
  },
};

export const synergyTable = {
  'Alquimista-Costureiro-Agricultor': {
    name: 'Narrador de Comunidades',
    intent: 'Cultivar significado compartilhado. Histórias que nutrem tecido social.',
    power: 'Coesão Profunda. Pertencimento visceral.',
    alert: 'Inércia. Pode evitar conflitos que nutriam crescimento.',
    metaphor: 'Um guardião de mitos, plantando histórias que colhem culturas.',
  },
  'Artesão da Jaula-Costureiro-Visionário': {
    name: 'Arquiteto de Futuros Comunitários',
    intent: 'Projetar espaços onde visão e comunidade convergem com precisão estrutural.',
    power: 'Materializa utopias com plantas baixas. Concreto + Comunidade.',
    alert: 'Pode priorizar a obra sobre as pessoas. Perfeccionismo coletivo.',
    metaphor: 'Um engenheiro de templos sociais, traçando o futuro em código e consciência.',
  },
  'Artesão da Jaula-Estrategista-Engenheiro': {
    name: 'Arquiteto de Sistemas Vivos',
    intent: 'Projetar estruturas que evoluem sob restrição. Ordem que respira.',
    power: 'Eficiência Adaptativa. Rigidez + Espontaneidade.',
    alert: 'Risco de sufocação. Sistema perfeito pode matar a vida.',
    metaphor: 'Um engenheiro de ecossistemas dançando dentro da própria arquitetura.',
  },
  'Explosivo-Catalisador-Cirurgião': {
    name: 'Agente de Choque Transformacional',
    intent: 'Forçar rupturas que regeneram. Destruição como criação.',
    power: 'Mudança Radical. Transforma em semanas o que levaria anos.',
    alert: 'Trauma. Deixa cicatrizes. Queima pontes.',
    metaphor: 'Um cirurgião de campo em crise, cortando com uma mão e iluminando com a outra.',
  },
  'Visionário-Guardião-Jardineiro': {
    name: 'Custódio do Futuro Vislumbrado',
    intent: 'Proteger e nutrir visão de longo prazo até maturação.',
    power: 'Visão Sustentável. Futuro desejável materializado.',
    alert: 'Dogmatismo. Defesa da visão pode gerar rigidez.',
    metaphor: 'Um profeta pragmático, construindo o jardim do amanhã com vigilância terna.',
  },
};

/**
 * Analisa texto e retorna o arquétipo com maior ressonância
 */
export function analyzeText(text, dimensionId) {
  const archetypes = archetypeDatabase[dimensionId];
  if (!archetypes) return null;

  const scores = {};
  const lowerText = text.toLowerCase();

  Object.entries(archetypes).forEach(([archetype, data]) => {
    const matchCount = data.keywords.filter((kw) => lowerText.includes(kw)).length;
    scores[archetype] = matchCount;
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted[0] && sorted[0][1] > 0 ? sorted[0][0] : Object.keys(archetypes)[0];
}

/**
 * Gera o padrão integrado (sinergia) baseado nos arquétipos
 */
export function generateSynergy(profileData, selectedDimensions) {
  const archetypeKey = selectedDimensions
    .map((dimId) => profileData[dimId]?.archetype)
    .filter(Boolean)
    .sort()
    .join('-');

  return (
    synergyTable[archetypeKey] || {
      name: 'Padrão Único Emergente',
      intent: 'Uma combinação rara que revela arquitetura estratégica singular.',
      power: 'Criatividade em intersecção. Opera onde ninguém mais consegue.',
      alert: 'Risco de dispersão. Pode ser tudo para todos.',
      metaphor: 'Um navegador de dimensões, operando na intersecção do improvável.',
    }
  );
}

/**
 * Gera diagrama Mermaid do padrão integrado
 */
export function generateMermaidDiagram(profileData, synergy, selectedDimensions) {
  const dimLabels = {
    problem_solving: 'Resolução',
    collaboration: 'Colaboração',
    creation: 'Criação',
  };

  let diagram = 'graph TD\n';
  diagram += '    subgraph NUCLEOS["Seus Núcleos Estratégicos"]\n';

  selectedDimensions.forEach((dimId, idx) => {
    const archetype = profileData[dimId]?.archetype || 'Desconhecido';
    diagram += `        D${idx + 1}["<b>${dimLabels[dimId]}</b><br/>${archetype}"]\n`;
  });

  diagram += '    end\n\n';

  selectedDimensions.forEach((_, idx) => {
    diagram += `    D${idx + 1} -->|Converge| INTEGRADO\n`;
  });

  diagram += `    INTEGRADO["<b>PADRÃO INTEGRADO</b><br/>${synergy.name}<br/><br/><i>${synergy.intent}</i>"]\n`;
  diagram += `    INTEGRADO -->|Potência| POW["${synergy.power}"]\n`;
  diagram += `    INTEGRADO -->|Alerta| ALT["${synergy.alert}"]\n`;

  diagram += '    style INTEGRADO fill:#00CFFF,stroke:#00FF99,stroke-width:3px,color:#0A0A0A,font-weight:bold\n';
  diagram += '    style POW fill:#00FF99,stroke:#00CFFF,color:#0A0A0A\n';
  diagram += '    style ALT fill:#FF6B6B,stroke:#00CFFF,color:#fff\n';

  return diagram;
}

