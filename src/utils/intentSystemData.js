/**
 * Dados do Sistema de Intenção NΞØ Protocol
 * Arquétipos, sinergias e dimensões de ressonância
 */

// Importar partículas do sistema NΞØ.UI
import { particles } from '../nexo-ui'

export const dimensions = [
  {
    id: 'problem_solving',
    title: 'NAVEGAÇÃO NO CAOS',
    subtitle: 'Como você estrutura o imprevisível',
    icon: '⊚',
    particle: particles.null,
    prompt:
      'Descreva sua estratégia interna quando enfrenta um labirinto sem saída óbvia. Não conte sobre o problema – sinta o que acontece dentro de você nos três primeiros segundos. Quais imagens, impulsos ou instrumentos interiores se acendem para reorganizar o caos?',
    color: 'from-blue-600/20 to-cyan-600/10',
  },
  {
    id: 'collaboration',
    title: 'INTERAÇÃO NO CAMPO',
    subtitle: 'Como você se move no tecido social',
    icon: '⦾',
    particle: particles.null,
    prompt:
      'Qual é o seu papel automático quando você faz parte de um grupo alinhado a um objetivo comum? Não descreva a missão. Descreva o que se move dentro de você: o que você faz sem pensar? Você traduz, catalisa, protege, provoca? Que microgestos ativam a intenção coletiva?',
    color: 'from-emerald-600/20 to-teal-600/10',
  },
  {
    id: 'creation',
    title: 'MANIFESTAÇÃO DO INVISÍVEL',
    subtitle: 'Como você traz o novo ao mundo',
    icon: '↯',
    particle: particles.null,
    prompt:
      'Comece pelo momento da centelha. Como a ideia aparece? Qual é o impulso, o ritual interno, a cadência que transforma o invisível em algo tangível? Descreva a sequência de sensações, movimentos e micro decisões que levam esse impulso do vácuo à forma concreta.',
    color: 'from-purple-600/20 to-pink-600/10',
  },
]

export const archetypeDatabase = {
  problem_solving: {
    Engenheiro: {
      keywords: [
        'desmontar',
        'partes',
        'sistema',
        'mapa',
        'lógica',
        'padrão',
        'eficiente',
        'peça',
        'funcionamento',
        'estrutura',
        'arquitetura',
        'componentes',
      ],
      intent: 'Controlar o caos através da estrutura',
      strengths: 'Clareza analítica, solução escalável',
      risks: 'Paralisia por análise, perda do contexto humano',
    },
    'Contador de Histórias': {
      keywords: [
        'história',
        'analogia',
        'significado',
        'exemplo',
        'metáfora',
        'sentido',
        'como se fosse',
        'personagem',
        'reenquadrar',
        'narrativa',
      ],
      intent: 'Encontrar sentido para navegar no caos',
      strengths: 'Comunicabilidade, adaptabilidade, resiliência',
      risks: 'Solução muito particular, falta de rigor generalizável',
    },
    Cirurgião: {
      keywords: [
        'isolar',
        'cortar',
        'intervir',
        'rápido',
        'núcleo',
        'pressão',
        'fonte',
        'doloroso mas necessário',
        'extrair',
        'disfunção',
      ],
      intent: 'Eliminar a disfunção para restaurar a saúde',
      strengths: 'Decisão, coragem, foco absoluto',
      risks: 'Danos colaterais, visão de curto prazo, trauma',
    },
    Jardineiro: {
      keywords: [
        'nutrir',
        'ambiente',
        'crescer',
        'paciência',
        'ecossistema',
        'processo',
        'contexto',
        'fertilizar',
        'observar',
        'cultivar',
      ],
      intent: 'Cultivar condições para que a solução emergia',
      strengths: 'Sustentabilidade, solução orgânica, holismo',
      risks: 'Lentidão, passividade, falta de ação direta',
    },
    Jogador: {
      keywords: [
        'desafio',
        'regras',
        'estratégia',
        'vencer',
        'tática',
        'recompensa',
        'movimento',
        'oponente',
        'partida',
        'competição',
      ],
      intent: 'Transformar o caos em um jogo a ser vencido',
      strengths: 'Inovação, motivação alta, pensamento tático',
      risks: 'Banalização, competitividade tóxica, falta de profundidade',
    },
  },
  collaboration: {
    Catalisador: {
      keywords: [
        'pergunta óbvia',
        'apontar',
        'inconsistência',
        'desafiar',
        'atrito',
        'verdade',
        'ponto cego',
        'lógica',
        'inconsistência',
      ],
      intent: 'Acelerar a verdade (ou o conflito) para chegar à clareza',
      strengths: 'Honestidade radical, prevenção de erros grupais',
      risks: 'Criar resistência, ser visto como disruptor negativo',
    },
    Costureiro: {
      keywords: [
        'conectar',
        'harmonia',
        'ouvidos',
        'ponte',
        'traduzir',
        'sentir',
        'relacionar',
        'grupo',
        'teia',
      ],
      intent: 'Criar e fortalecer a rede de conexões',
      strengths: 'Coesão, alta inteligência emocional, mediação',
      risks: 'Evitar conflitos necessários, desgaste emocional',
    },
    Estrategista: {
      keywords: [
        'meta clara',
        'dividir trabalho',
        'eficiência',
        'prazo',
        'função',
        'recursos',
        'evitar perda de tempo',
        'organizar',
      ],
      intent: 'Otimizar o sistema humano para o resultado',
      strengths: 'Produtividade, foco, organização',
      risks: 'Visão transacional, negligenciar a motivação intrínseca',
    },
    'Especialista Reserva': {
      keywords: [
        'retaguarda',
        'observar',
        'entrar quando necessário',
        'único',
        'técnico',
        'específico',
        'não forçar participação',
        'autonomia',
      ],
      intent: 'Oferecer excelência pontual, preservando autonomia',
      strengths: 'Alta qualidade, foco profundo, sem dispersão',
      risks: 'Isolamento, parecer descomprometido, perda de contexto',
    },
    Guardião: {
      keywords: [
        'proteger',
        'cuidar',
        'alerta',
        'integridade',
        'valores',
        'defender',
        'conflito interno',
        'lealdade',
      ],
      intent: 'Proteger o grupo de ameaças internas e externas',
      strengths: 'Segurança, confiança, cultura forte',
      risks: 'Desconfiança excessiva, resistência a mudanças',
    },
  },
  creation: {
    Visionário: {
      keywords: [
        'imagem',
        'visão',
        'insight',
        'traduzir',
        'forma exata',
        'fidelidade',
        'ver claramente',
        'perseguir',
        'visão interna perfeita',
      ],
      intent: 'Materializar uma visão interna perfeita',
      strengths: 'Clareza de direção, alta consistência estética/conceitual',
      risks: 'Rigidez, frustração com limitações do mundo real, bloqueio do "não ficou igual"',
    },
    Alquimista: {
      keywords: [
        'conexão bizarra',
        'juntar cacos',
        'colisão',
        'soldar',
        'união',
        'hibridização',
        'metamorfose',
        'fusão do inesperado',
      ],
      intent: 'Criar através da fusão do inesperado',
      strengths: 'Inovação radical, pensamento lateral, surpreender',
      risks: 'Resultados podem ser caóticos ou incomunicáveis, falta de foco',
    },
    Agricultor: {
      keywords: [
        'fermentar',
        'semente',
        'alimentar',
        'processo',
        'deixar amadurecer',
        'colher no momento certo',
        'ecossistema interno',
        'maturação orgânica',
      ],
      intent: 'Cultivar ideias até a maturação orgânica',
      strengths: 'Profundidade, timing natural, trabalhos ricos e complexos',
      risks: 'Lentidão extrema, passividade (esperar demais), dificuldade com prazos',
    },
    'Artesão da Jaula': {
      keywords: [
        'restrição',
        'limite',
        'forma fixa',
        'problema',
        'puzzle',
        'jogo',
        'dançar dentro da jaula',
        'estrutura como impulso',
      ],
      intent: 'Encontrar liberdade expressiva dentro dos limites',
      strengths: 'Alta adaptabilidade, criatividade prática, excelência em craft',
      risks: 'Pode se sentir sem direção própria, dependente de briefings externos',
    },
    Explosivo: {
      keywords: [
        'pressão',
        'explosão',
        'urgência',
        'tudo de uma vez',
        'catártico',
        'fluxo intenso',
        'não conseguir segurar',
        'evento catalítico',
      ],
      intent: 'Liberar energia acumulada em um evento catalítico',
      strengths: 'Potência, impacto emocional, conclusão rápida',
      risks: 'Esgotamento pós-obra, inconsistência, dificuldade em projetos longos',
    },
  },
}

export const synergyTable = {
  // Sinergias existentes (mantidas)
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
  // Novas sinergias adicionadas
  'Jogador-Especialista Reserva-Alquimista': {
    name: 'Mestre do Jogo Oculto',
    intent: 'Dominar sistemas através de manobras pontuais e inesperadas.',
    power: 'Vantagem Inimaginável. Surpreende com soluções de nicho e altamente eficazes.',
    alert: 'Desconexão. O foco em jogos paralelos pode afastá-lo do "jogo principal" do grupo.',
    metaphor:
      'Um enxadrista que vence não no tabuleiro principal, mas fundindo regras de jogos diferentes.',
  },
  'Contador de Histórias-Costureiro-Agricultor': {
    name: 'Narrador de Comunidades',
    intent: 'Cultivar significado compartilhado para nutrir o tecido social.',
    power: 'Cohosão Profunda. Cria laços fortes e senso de pertencimento.',
    alert: 'Inércia. Pode evitar conflitos necessários para preservar a "história bonita".',
    metaphor: 'Um guardião de mitos, que planta histórias e colhe cultura grupal.',
  },
  'Engenheiro-Estrategista-Artesão da Jaula': {
    name: 'Arquiteto de Sistemas Vivos',
    intent: 'Projetar estruturas otimizadas que evoluem sob restrição.',
    power: 'Eficiência Adaptativa. Sistemas que são robustos e flexíveis.',
    alert: 'Sufocamento. O foco no sistema perfeito pode matar a espontaneidade orgânica.',
    metaphor:
      'Um engenheiro de ecossistemas, que projeta com regras rígidas para gerar vida adaptativa.',
  },
}

/**
 * Analisa texto e retorna o arquétipo com maior ressonância
 */
export function analyzeText(text, dimensionId) {
  const archetypes = archetypeDatabase[dimensionId]
  if (!archetypes) return null

  const normalize = str =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

  const tokens = normalize(text || '')
    .split(/[^a-z0-9áéíóúâêîôûãõç]+/i)
    .filter(Boolean)
  const bag = new Set(tokens)

  const archetypeNames = Object.keys(archetypes)
  const scores = {}

  Object.entries(archetypes).forEach(([archetype, data]) => {
    const normalizedKeywords = data.keywords.map(normalize)

    let score = 0
    normalizedKeywords.forEach(kw => {
      // Pondera matches completos e parciais
      if (bag.has(kw)) score += 2 // match exato de token
      tokens.forEach(t => {
        if (t.includes(kw) && !bag.has(kw)) score += 1 // match parcial
      })
    })

    scores[archetype] = score
  })

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const topScore = sorted[0]?.[1] ?? 0
  const topArchetypes = sorted.filter(([, sc]) => sc === topScore).map(([name]) => name)

  // Se houve match, desempata de forma determinística
  if (topScore > 0) {
    if (topArchetypes.length === 1) return topArchetypes[0]
    // hash do texto para escolher sempre a mesma dentro do empate
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i)
      hash |= 0
    }
    const idx = Math.abs(hash) % topArchetypes.length
    return topArchetypes[idx]
  }

  // Se não houver palavras-chave, escolher um arquétipo de forma determinística baseada no texto
  if (text && text.trim().length > 0) {
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i)
      hash |= 0 // 32bit
    }
    const idx = Math.abs(hash) % archetypeNames.length
    return archetypeNames[idx]
  }

  // Se não há texto, volta para o primeiro arquétipo como fallback
  return archetypeNames[0]
}

/**
 * Gera o padrão integrado (sinergia) baseado nos arquétipos
 */
export function generateSynergy(profileData, selectedDimensions, seed = null) {
  const archetypeNames = selectedDimensions
    .map(dimId => profileData[dimId]?.archetype)
    .filter(Boolean)

  const archetypeKey = selectedDimensions
    .map(dimId => profileData[dimId]?.archetype)
    .filter(Boolean)
    .sort()
    .join('-')

  if (synergyTable[archetypeKey]) {
    return synergyTable[archetypeKey]
  }

  // Gerar sinergia custom com variação determinística
  const seedSource = (seed || '') + (archetypeNames.join('-') || 'default-seed')
  let hash = 0
  for (let i = 0; i < seedSource.length; i++) {
    hash = (hash << 5) - hash + seedSource.charCodeAt(i)
    hash |= 0
  }
  const seededRand = () => {
    hash = (hash * 1664525 + 1013904223) % 4294967296
    return Math.abs(hash) / 4294967296
  }
  const pick = arr => arr[Math.floor(seededRand() * arr.length)]
  const archetypeList = archetypeNames.length ? archetypeNames.join(' + ') : 'Arquétipos raros'

  const nameOptions = [
    `Interseção ${archetypeList}`,
    `Arquitetura ${archetypeList}`,
    `Padrão Singular (${archetypeList})`,
    `Constelação ${archetypeList}`,
  ]
  const intentOptions = [
    `Orquestrar ${archetypeList} para operar onde poucos conseguem.`,
    `Combinar ${archetypeList} para gerar soluções fora do óbvio.`,
    `Fazer ${archetypeList} convergirem em uma estratégia única.`,
  ]
  const powerOptions = [
    `Conexões improváveis entre ${archetypeList} produzem alavancas raras.`,
    `Capacidade de alternar entre ${archetypeList} conforme o contexto.`,
    `Sintetiza ${archetypeList} em um movimento coordenado.`,
  ]
  const alertOptions = [
    `Risco de dispersão ao alternar demais entre ${archetypeList}.`,
    `Excesso de complexidade ao combinar ${archetypeList}.`,
    `Perder foco ao tentar equilibrar ${archetypeList}.`,
  ]
  const metaphorOptions = [
    `Um hub onde ${archetypeList} colidem e criam faíscas.`,
    `Um condutor que sincroniza ${archetypeList} em uma só melodia.`,
    `Um navegador cruzando camadas onde ${archetypeList} se sobrepõem.`,
  ]

  return {
    name: pick(nameOptions),
    intent: pick(intentOptions),
    power: pick(powerOptions),
    alert: pick(alertOptions),
    metaphor: pick(metaphorOptions),
  }
}

/**
 * Gera diagrama Mermaid do padrão integrado
 */
export function generateMermaidDiagram(profileData, synergy, selectedDimensions) {
  const dimLabels = dimensions.reduce((acc, dim) => {
    acc[dim.id] = dim.title
    return acc
  }, {})

  const sanitize = value =>
    (value || '')
      .replace(/"/g, '\\"')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>')

  const dimensionNodes = selectedDimensions.map((dimId, index) => {
    const label = dimLabels[dimId] || dimId
    const archetype = profileData[dimId]?.archetype || 'Arquétipo em fluxo'
    return {
      id: `D${index + 1}`,
      label: `${label}<br/><small>${archetype}</small>`,
    }
  })

  const hasDimensions = dimensionNodes.length > 0

  const dimensionEntries = hasDimensions
    ? dimensionNodes.map(node => `        ${node.id}["${sanitize(node.label)}"]`).join('\n')
    : '        D0["Sem dimensões selecionadas"]'

  const dimensionConnections = hasDimensions
    ? dimensionNodes.map(node => `    ${node.id} -->|alimenta| CORE`).join('\n')
    : '    D0 -->|alimenta| CORE'

  const dimensionStyles = hasDimensions
    ? dimensionNodes
        .map(node => `    style ${node.id} fill:#1e293b,stroke:#64748b,color:#cbd5e1`)
        .join('\n')
    : '    style D0 fill:#1e293b,stroke:#64748b,color:#cbd5e1'

  return `
graph TD
    subgraph "NÚCLEO INTEGRADO"
        CORE["${sanitize(synergy.name)}"]
        CORE --> INTENT["${sanitize(synergy.intent)}"]
    end

    subgraph "DIMENSÕES OPERACIONAIS"
${dimensionEntries}
    end

${dimensionConnections}

    CORE --> MANIFEST["EXPRESSÃO NO MUNDO"]

    style CORE fill:#7c3aed,stroke:#fff,stroke-width:2px,color:#fff
    style INTENT fill:#0ea5e9,stroke:#fff,stroke-width:1px,color:#fff
${dimensionStyles}
    style MANIFEST fill:#10b981,stroke:#fff,color:#fff

    classDef dimension fill:#1e293b,stroke:#475569,color:#e2e8f0
    classDef core fill:#7c3aed,stroke:#fff,color:#fff
    classDef intent fill:#0ea5e9,stroke:#fff,color:#fff
`
}
