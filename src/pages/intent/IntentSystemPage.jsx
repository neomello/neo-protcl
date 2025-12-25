import { useState, useEffect, useContext } from 'react'
import { ChevronRight, Sparkles, Lock, Copy, Info, X, Upload } from 'lucide-react'
import { useDesktopBlock } from '../../hooks/useDesktopBlock'
import { AgentProvider, AgentContext } from '../../terminal/AgentContext'
import { soundManager } from '../../utils/sounds'
import Navbar from '../../components/Navbar'
import BottomNavigation from '../../components/BottomNavigation'
import Footer from '../../components/Footer'
import { particles } from '../../nexo-ui'
import {
  dimensions,
  analyzeText,
  generateSynergy,
  generateMermaidDiagram,
  archetypeDatabase,
} from '../../utils/intentSystemData'
import MermaidDiagram from '../../components/MermaidDiagram'
import {
  saveIntentToIPFS,
  isLighthouseConfigured,
  getIPFSGatewayUrl,
} from '../../services/intentDataCapture'

const dimensionLabelMap = dimensions.reduce((acc, dim) => {
  acc[dim.id] = dim.title
  return acc
}, {})

const countInsightLevel = text => {
  if (!text || !text.trim()) return 'Comece a escrever...'
  const words = text.trim().split(/\s+/).length
  if (words < 30) return '◍ Superficial'
  if (words < 100) return '◍ Emergindo'
  if (words < 200) return '◍ Profundo'
  return '◍ Nuclear'
}

const calculateCompatibility = result => {
  if (!result || !result.selectedDimensions?.length) return 0
  const totalChars = result.selectedDimensions.reduce(
    (sum, dimId) => sum + (result.responses?.[dimId]?.length || 0),
    0
  )
  const maxChars = Math.max(result.selectedDimensions.length * 220, 1)
  const raw = Math.round((totalChars / maxChars) * 100)
  return Math.min(100, Math.max(40, raw))
}

const calculateAlignmentScore = result => {
  if (!result || !result.selectedDimensions?.length) return 0
  const totalChars = result.selectedDimensions.reduce(
    (sum, dimId) => sum + (result.responses?.[dimId]?.length || 0),
    0
  )
  const base = Math.max(result.selectedDimensions.length * 160, 1)
  const score = Math.round((totalChars / base) * 10)
  return Math.min(10, Math.max(2, score))
}

const DiscoveryProgress = ({ selectedDimensions, responses }) => {
  const total = selectedDimensions.length
  if (total === 0) return null
  const completed = selectedDimensions.filter(dimId => responses[dimId]?.trim()).length
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>ALGORITMO ATIVO</span>
        <span>
          {completed}/{total} sistemas
        </span>
      </div>
      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
          style={{ width: `${(completed / total) * 100}%` }}
        />
      </div>
      {completed === total && (
        <p className="mt-2 text-sm text-cyan-600 font-medium">
          ⟡ Todos os sistemas prontos para integração
        </p>
      )}
    </div>
  )
}

const exportOptions = [
  {
    name: 'CÓDIGO-FONTE',
    format: 'json',
    description: 'Dados brutos para análise',
    icon: '⯈',
  },
  {
    name: 'DOCUMENTAÇÃO',
    format: 'md',
    description: 'Relatório em Markdown',
    icon: '⧉',
  },
  {
    name: 'ARQUITETURA',
    format: 'mermaid',
    description: 'Diagrama editável',
    icon: '▤',
  },
  {
    name: 'INSIGHT',
    format: 'txt',
    description: 'Principais descobertas',
    icon: 'Ø',
  },
]

function IntentSystemContent() {
  useDesktopBlock()
  const { agentState, updateAgentState } = useContext(AgentContext)

  const [phase, setPhase] = useState('intro')
  const [selectedDimensions, setSelectedDimensions] = useState([])
  const [responses, setResponses] = useState({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [showInstructions, setShowInstructions] = useState(false)
  const [copied, setCopied] = useState(false)
  const [ipfsCid, setIpfsCid] = useState(null)
  const [savingToIPFS, setSavingToIPFS] = useState(false)
  const [ipfsError, setIpfsError] = useState(null)
  const [showCompleteForm, setShowCompleteForm] = useState(false)
  const [userData, setUserData] = useState({ email: '', phone: '', github: '' })
  const [focusedDim, setFocusedDim] = useState(null)

  // Scroll to top when result phase is shown
  useEffect(() => {
    if (phase === 'result') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [phase])

  const handleSelectDimension = dimId => {
    if (!selectedDimensions.includes(dimId)) {
      setSelectedDimensions([...selectedDimensions, dimId])
      setFocusedDim(dimId)
      soundManager.playClick()
    }
  }

  const handleRemoveDimension = dimId => {
    setSelectedDimensions(selectedDimensions.filter(id => id !== dimId))
    setResponses(prev => {
      const newResponses = { ...prev }
      delete newResponses[dimId]
      return newResponses
    })
    if (focusedDim === dimId) setFocusedDim(null)
    soundManager.playClick()
  }

  const handleResponseChange = (dimId, text) => {
    setResponses({ ...responses, [dimId]: text })
  }

  const handleGenerateMap = async () => {
    setLoading(true)
    soundManager.playPulse()

    await new Promise(resolve => setTimeout(resolve, 1200))

    const timestamp = Date.now()
    const runId =
      (typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID()) ||
      `run-${timestamp}-${Math.random().toString(36).slice(2, 8)}`

    const profileData = {}
    selectedDimensions.forEach(dimId => {
      const archetype = analyzeText(responses[dimId] || '', dimId)
      profileData[dimId] = {
        archetype,
        intent: archetype ? archetypeDatabase[dimId]?.[archetype]?.intent || '' : '',
      }
    })

    const synergy = generateSynergy(profileData, selectedDimensions, runId)
    const mermaidDiagram = generateMermaidDiagram(profileData, synergy, selectedDimensions)
    const prompts = selectedDimensions.reduce((acc, dimId) => {
      const dim = dimensions.find(d => d.id === dimId)
      if (dim?.prompt) acc[dimId] = dim.prompt
      return acc
    }, {})

    const assembledResult = {
      profileData,
      synergy,
      selectedDimensions,
      mermaidDiagram,
      responses,
      prompts,
      runId,
      timestamp,
    }

    setResult(assembledResult)
    setPhase('result')
    setLoading(false)
    soundManager.playDiscovery()
    soundManager.playConfirm()
    setTimeout(() => soundManager.playIntegration(), 250)

    const currentMemory = Array.isArray(agentState.memory) ? agentState.memory : []
    const memoryEntry = {
      type: 'intent_profile',
      data: {
        integrated: synergy.name,
        timestamp,
        dimensions: selectedDimensions.map(dimId => ({
          dimension: dimId,
          archetype: profileData[dimId]?.archetype,
          intent: profileData[dimId]?.intent,
        })),
      },
    }

    updateAgentState({
      memory: [...currentMemory, memoryEntry],
      resonance: Math.min(agentState.resonance + 3, 10),
      coherence: Math.min((agentState.coherence || 0) + 2, 10),
      alignment: calculateAlignmentScore(assembledResult),
    })

    // Salvar no IPFS (se configurado e com consentimento)
    if (isLighthouseConfigured()) {
      // Salvar automaticamente (dados anonimizados)
      handleSaveToIPFS(assembledResult)
    }
  }

  const handleSaveToIPFS = async intentData => {
    setSavingToIPFS(true)
    setIpfsError(null)

    try {
      // Não precisamos de wallet para salvar (dados anonimizados)
      const cid = await saveIntentToIPFS(intentData, null)
      setIpfsCid(cid)
      soundManager.playConfirm()
    } catch (error) {
      console.error('Erro ao salvar no IPFS:', error)
      setIpfsError(error.message)
      soundManager.playError()
    } finally {
      setSavingToIPFS(false)
    }
  }

  const buildExportContent = format => {
    if (!result) return ''

    switch (format) {
      case 'json':
        return JSON.stringify(result, null, 2)
      case 'md': {
        const detailSections = result.selectedDimensions
          .map(dimId => {
            const label = dimensionLabelMap[dimId] || dimId
            const archetype = result.profileData[dimId]?.archetype || 'Arquétipo não identificado'
            const excerpt = result.responses?.[dimId] || 'Sem resposta registrada.'
            return `## ${label}\n**Arquétipo:** ${archetype}\n\n${excerpt}`
          })
          .join('\n\n')
        return `# ${result.synergy.name}\n\n${result.synergy.intent}\n\n${detailSections}`
      }
      case 'mermaid':
        return result.mermaidDiagram
      case 'txt': {
        const lines = [
          `Padrão Integrado: ${result.synergy.name}`,
          `Intent: ${result.synergy.intent}`,
          '',
          ...result.selectedDimensions.map(dimId => {
            const label = dimensionLabelMap[dimId] || dimId
            const response = result.responses?.[dimId] || '—'
            return `${label}: ${response}`
          }),
        ]
        return lines.join('\n')
      }
      default:
        return ''
    }
  }

  const handleExport = option => {
    if (!result) return
    const content = buildExportContent(option.format)
    const extension = option.format || 'txt'
    const fileName = `neo-intent-${extension}-${result.runId || Date.now()}.${extension}`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = fileName
    anchor.click()
    URL.revokeObjectURL(url)
    soundManager.playConfirm()
  }

  // INTRO PHASE
  if (phase === 'intro') {
    return (
      <div
        className="min-h-screen bg-[#F9FAFB] text-[#111827] overflow-x-hidden pb-16 safe-area-inset relative"
        style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
      >
        {/* Clean Background - Light mode */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[#F9FAFB]"></div>

        <div className="relative z-10">
          <div className="ios-status-bar"></div>
          <Navbar />

          <main className="container mx-auto px-4 py-8 pt-safe">
            {/* Hero Card - Mapeie sua arquitetura interna (TOP) */}
            <div
              className="mb-6 p-8 spring-in rounded-3xl bg-gradient-to-br from-blue-50 to-white border border-white/60 shadow-xl"
              style={{
                boxShadow: '0 25px 60px rgba(15, 23, 42, 0.15)',
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-6 relative">
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-30 blur-3xl"></div>
                  <div className="absolute inset-4 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-2xl font-bold">
                    Ξ
                  </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Descubra seu{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                    Algoritmo
                  </span>
                </h1>

                <p className="text-lg text-gray-600 mb-3 max-w-2xl leading-relaxed">
                  Não é sobre quem você <em>quer</em> ser. É sobre como você{' '}
                  <strong>já opera</strong>. Mapeamos a arquitetura do seu{' '}
                  <span className="font-semibold text-cyan-600">intent</span>.
                </p>
                <p className="text-sm text-gray-500 mb-6 max-w-xl">
                  Cada resposta acende um circuito. Cada padrão revela um núcleo que só você pode
                  ativar. Se entregue ao processo.
                </p>

                <div className="flex gap-6 text-sm text-gray-500">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div>Dimensões Nucleares</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-600">125+</div>
                    <div>Padrões de Intent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">∞</div>
                    <div>Combinações Únicas</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Grid - 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div
                className="p-6 spring-in rounded-2xl bg-white"
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  border: '1px solid #E5E7EB',
                  animationDelay: '0.1s',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 relative"
                  style={{
                    background: '#0A1929',
                    border: '1px solid #1E3A5F',
                    boxShadow:
                      '0 0 12px rgba(37, 99, 235, 0.4), inset 0 0 8px rgba(37, 99, 235, 0.2)',
                  }}
                >
                  <span className="text-xl text-[#60A5FA]">{particles.theta}</span>
                  <img
                    src="/splash/box_intent.png"
                    alt="NΞØ"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-60"
                  />
                </div>
                <p className="text-xs text-[#3B82F6] uppercase tracking-wide">Não Perguntamos</p>
                <p className="text-lg font-semibold text-[#111827] mb-1.5 leading-tight">
                  Quem você é
                </p>
              </div>

              <div
                className="p-6 spring-in rounded-2xl bg-white"
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  border: '1px solid #E5E7EB',
                  animationDelay: '0.2s',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 relative"
                  style={{
                    background: '#0A1929',
                    border: '1px solid #1E3A5F',
                    boxShadow:
                      '0 0 12px rgba(37, 99, 235, 0.4), inset 0 0 8px rgba(37, 99, 235, 0.2)',
                  }}
                >
                  <span className="text-xl text-[#60A5FA]">{particles.null}</span>
                  <img
                    src="/splash/box_intent.png"
                    alt="NΞØ"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-60"
                  />
                </div>
                <p className="text-xs text-[#3B82F6] uppercase tracking-wide">Revelamos</p>
                <p className="text-lg font-semibold text-[#111827] mb-1.5 leading-tight">
                  Como você opera no campo simbólico
                </p>
              </div>

              <div
                className="p-6 spring-in rounded-2xl bg-white"
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  border: '1px solid #E5E7EB',
                  animationDelay: '0.3s',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 relative"
                  style={{
                    background: '#0A1929',
                    border: '1px solid #1E3A5F',
                    boxShadow:
                      '0 0 12px rgba(37, 99, 235, 0.4), inset 0 0 8px rgba(37, 99, 235, 0.2)',
                  }}
                >
                  <span className="text-xl text-[#60A5FA]">{particles.nucleus}</span>
                  <img
                    src="/splash/box_intent.png"
                    alt="NΞØ"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-60"
                  />
                </div>
                <p className="text-xs text-[#3B82F6] uppercase tracking-wide">Você Recebe</p>
                <p className="text-lg font-semibold text-[#111827] mb-1.5 leading-tight">
                  Um mapa vivo com a sua estrutura de intenção
                </p>
              </div>
            </div>

            {/* CTA Button Card */}
            <div
              className="p-6 mb-6 spring-in rounded-2xl bg-white"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '1px solid #E5E7EB',
                animationDelay: '0.4s',
              }}
            >
              <button
                onClick={() => {
                  setPhase('dimensions')
                  soundManager.playConfirm()
                }}
                className="w-full group relative px-8 py-5 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-700 hover:to-blue-500"
                style={{
                  boxShadow: '0 8px 24px rgba(34, 211, 238, 0.25)',
                }}
              >
                <Sparkles size={20} />
                <span className="text-base">DECIFRAR ALGORITMO</span>
                <ChevronRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            </div>

            {/* Privacy Footer */}
            <div
              className="p-5 text-center spring-in rounded-2xl bg-white"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '1px solid #E5E7EB',
                animationDelay: '0.5s',
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Lock size={14} className="text-[#9CA3AF]" />
                <p className="ios-caption text-[#4B5563]">Seus padrões permanecem privados</p>
              </div>
              <p className="ios-caption text-[#9CA3AF]">
                NΞØ Protocol © {new Date().getFullYear()}
              </p>
            </div>

            <div className="h-4"></div>
          </main>
        </div>

        <Footer />

        <BottomNavigation />
      </div>
    )
  }

  // DIMENSIONS PHASE
  if (phase === 'dimensions') {
    return (
      <div
        className="min-h-screen bg-[#F9FAFB] text-[#111827] overflow-x-hidden pb-16 safe-area-inset relative"
        style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
      >
        {/* Clean Background - Light mode */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[#F9FAFB]"></div>

        <div className="relative z-10">
          <div className="ios-status-bar"></div>
          <Navbar />

          <main className="container mx-auto px-4 py-8 pt-safe">
            {/* Header Card */}
            <div
              className="mb-6 p-6 spring-in rounded-3xl bg-white"
              style={{
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                border: '1px solid #E5E7EB',
              }}
            >
              <div className="text-center">
                <h2 className="ios-headline text-[#111827] mb-3 text-3xl font-bold">
                  Vamos mapear suas dimensões
                </h2>
                <p className="ios-body text-[#4B5563] text-base">
                  Selecione e preencha livremente. Explore todas ou apenas as que ressoam na sua
                  consciência.
                </p>
              </div>
            </div>

            <DiscoveryProgress selectedDimensions={selectedDimensions} responses={responses} />

            {/* Dimensions Grid */}
            <div className="space-y-4 mb-6">
              {dimensions.map((dim, idx) => (
                <div key={dim.id} className="space-y-3">
                  <div
                    onClick={() => handleSelectDimension(dim.id)}
                    className="p-6 cursor-pointer transition-all duration-300 spring-in rounded-2xl bg-white"
                    style={{
                      border: selectedDimensions.includes(dim.id)
                        ? '2px solid #06B6D4'
                        : '1px solid #E5E7EB',
                      boxShadow: selectedDimensions.includes(dim.id)
                        ? '0 0 0 3px rgba(34, 211, 238, 0.1), 0 4px 12px rgba(0, 0, 0, 0.08)'
                        : '0 2px 8px rgba(0, 0, 0, 0.04)',
                      animationDelay: `${0.1 + idx * 0.1}s`,
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div
                          className={`w-12 h-12 rounded-3xl flex items-center justify-center mb-4 relative inline-flex bg-gradient-to-br ${dim.color} text-white text-2xl font-semibold border border-white/20`}
                        >
                          <span>{dim.icon || '⊚'}</span>
                          <img
                            src="/splash/box_intent.png"
                            alt="NΞØ"
                            className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-50"
                          />
                        </div>
                        {!selectedDimensions.includes(dim.id) ? (
                          <>
                            <p className="text-xl font-semibold text-[#111827] mb-2 leading-tight">
                              {dim.prompt}
                            </p>
                            <p className="text-sm text-[#9CA3AF] uppercase tracking-wide mb-1">
                              {dim.title}
                            </p>
                            <p className="ios-body text-[#4B5563]">{dim.subtitle}</p>
                          </>
                        ) : (
                          <>
                            <h3 className="text-xl font-semibold text-[#111827] mb-2">
                              {dim.title}
                            </h3>
                            <p className="ios-body text-[#4B5563] mb-3">{dim.subtitle}</p>
                          </>
                        )}
                      </div>
                      {selectedDimensions.includes(dim.id) && (
                        <div className="w-10 h-10 rounded-full bg-[#06B6D4] flex items-center justify-center border-2 border-[#06B6D4]">
                          <span className="text-white font-bold text-lg">✓</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedDimensions.includes(dim.id) && (
                    <div
                      className="p-6 ml-4 rounded-2xl bg-white"
                      style={{
                        borderLeft: '3px solid #06B6D4',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                      }}
                    >
                      <p className="ios-body text-[#4B5563] mb-4">{dim.prompt}</p>
                      <textarea
                        value={responses[dim.id] || ''}
                        onChange={e => handleResponseChange(dim.id, e.target.value)}
                        placeholder={`Não pense na resposta "certa".\nDescreva o que acontece nas engrenagens internas.\nEx: "Meu cérebro automaticamente busca..." \n    "Sinto primeiro..." \n    "Meu movimento instintivo é..."`}
                        className="w-full h-40 p-5 rounded-2xl text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all resize-none font-light leading-relaxed text-base bg-[#F9FAFB] border border-[#E5E7EB]"
                      />
                      <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-cyan-600">
                            {countInsightLevel(responses[dim.id])}
                          </span>
                          <span>{(responses[dim.id] || '').length} caracteres</span>
                        </div>
                        <button
                          onClick={() => handleRemoveDimension(dim.id)}
                          className="ios-button-secondary ios-compact-xs text-xs"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div
              className="p-6 mb-6 rounded-2xl bg-white"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '1px solid #E5E7EB',
              }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <p className="ios-caption text-[#4B5563]">
                      {selectedDimensions.length} sistema(s) selecionado(s)
                    </p>
                    <p className="text-[#06B6D4] font-semibold text-base mt-1">
                      {selectedDimensions.every(d => responses[d]?.trim())
                        ? '✓ Pronto para integrar'
                        : 'Preencha para continuar'}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setPhase('intro')
                        setSelectedDimensions([])
                        setResponses({})
                        soundManager.playClick()
                      }}
                      className="ios-button-secondary ios-compact"
                    >
                      ⟲ REINICIAR
                    </button>
                    <button
                      onClick={handleGenerateMap}
                      disabled={
                        selectedDimensions.length === 0 ||
                        !selectedDimensions.every(d => responses[d]?.trim()) ||
                        loading
                      }
                      className="ios-button-primary ios-compact disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#9CA3AF] border-t-[#06B6D4] rounded-full animate-spin" />
                          Decodificando...
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          DECIFRAR ALGORITMO
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {loading && (
                  <div className="flex items-center gap-2 text-sm text-cyan-600">
                    <div className="w-4 h-4 border-2 border-cyan-200 border-t-cyan-500 rounded-full animate-spin" />
                    Decodificando padrões profundos...
                  </div>
                )}
              </div>
            </div>

            <div className="h-4"></div>
          </main>
        </div>

        <Footer />

        <BottomNavigation />
      </div>
    )
  }

  // RESULT PHASE
  if (phase === 'result' && result) {
    const compatibility = calculateCompatibility(result)
    const alignmentValue = agentState.alignment ?? 0

    return (
      <div
        className="min-h-screen bg-[#F9FAFB] text-[#111827] overflow-x-hidden pb-16 safe-area-inset relative"
        style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
      >
        {/* Clean Background - Light mode */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[#F9FAFB]"></div>

        <div className="relative z-10">
          <div className="ios-status-bar"></div>
          <Navbar />

          <main className="container mx-auto px-4 py-8 pt-safe">
            {/* Header */}
            <div
              className="mb-6 p-6 spring-in rounded-3xl bg-white"
              style={{
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                border: '1px solid #E5E7EB',
              }}
            >
              <h2 className="ios-headline text-[#111827] text-center text-4xl font-bold">
                Seu Mapa Integrado
              </h2>
              {result.runId && (
                <p className="text-center text-xs text-[#9CA3AF] mt-2">Run ID: {result.runId}</p>
              )}
              <p className="text-center text-xs text-[#6B7280] mt-1">
                Alinhamento simbólico: {alignmentValue}/10
              </p>
            </div>

            {/* Pattern Card - Large */}
            <div className="mb-6 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-black p-8 text-white spring-in">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                  <circle
                    cx="200"
                    cy="200"
                    r="180"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="120"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path d="M50 300 L350 100" stroke="rgba(14,165,233,0.3)" strokeWidth="1" />
                  <path d="M50 100 L350 300" stroke="rgba(2,132,199,0.2)" strokeWidth="1" />
                </svg>
              </div>
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-500">
                    ARQUITETURA INTEGRADA
                  </span>
                  {isLighthouseConfigured() && (
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      {savingToIPFS && (
                        <span className="flex items-center gap-1">
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Salvando nodo
                        </span>
                      )}
                      {ipfsCid && (
                        <a
                          href={getIPFSGatewayUrl(ipfsCid)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-white/80 hover:text-white"
                          title="Ver no IPFS"
                        >
                          <Upload size={12} />
                          IPFS
                        </a>
                      )}
                      {ipfsError && (
                        <span className="text-red-400" title={ipfsError}>
                          Erro IPFS
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-3xl font-bold">{result.synergy.name}</h3>
                  {result.runId && (
                    <p className="text-xs uppercase tracking-wider text-white/70 mt-1">
                      Run ID {result.runId}
                    </p>
                  )}
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-lg italic text-white/90">"{result.synergy.intent}"</p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm text-white/70 mb-1">
                    <span>Compatibilidade Interna</span>
                    <span className="font-semibold text-cyan-200">{compatibility}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500"
                      style={{ width: `${compatibility}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10 text-white/80">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/60">Superpoder</p>
                    <p className="font-semibold text-sm mt-1 text-white">{result.synergy.power}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/60">Alerta</p>
                    <p className="font-semibold text-sm mt-1 text-white">{result.synergy.alert}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs uppercase tracking-widest text-white/50">
                    Metáfora Operacional
                  </p>
                  <p className="text-sm text-cyan-100 italic mt-1">{result.synergy.metaphor}</p>
                </div>
              </div>
            </div>

            {/* Núcleos Dimensionais - Grid */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              {result.selectedDimensions.map((dimId, idx) => (
                <div
                  key={dimId}
                  className="p-5 spring-in rounded-2xl bg-white"
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    border: '1px solid #E5E7EB',
                    animationDelay: `${0.2 + idx * 0.1}s`,
                  }}
                >
                  <p className="ios-caption text-[#06B6D4] uppercase font-bold mb-2">
                    Dimensão {idx + 1}
                  </p>
                  <p className="text-2xl font-semibold text-[#111827] mb-2">
                    {dimensionLabelMap[dimId] || dimId}
                  </p>
                  <p className="ios-caption text-[#22D3EE] mb-2">
                    Arquétipo: {result.profileData[dimId]?.archetype || '—'}
                  </p>
                  {result.responses?.[dimId] && (
                    <p className="text-[#4B5563] text-sm italic">
                      “{result.responses[dimId].slice(0, 160)}
                      {result.responses[dimId].length > 160 ? '…' : ''}”
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Mermaid Diagram Card */}
            <div
              className="p-6 mb-6 spring-in rounded-2xl bg-white"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '1px solid #E5E7EB',
                animationDelay: '0.5s',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="ios-headline text-[#111827] text-2xl font-bold">Diagrama Visual</h3>
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(result.mermaidDiagram)
                        setCopied(true)
                        soundManager.playConfirm()
                        setTimeout(() => setCopied(false), 2000)
                      } catch (err) {
                        console.error('Erro ao copiar:', err)
                        soundManager.playError()
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-[#3B82F6] text-white text-sm font-semibold flex items-center gap-2 hover:bg-[#2563EB] transition-colors"
                  >
                    <Copy size={16} />
                    {copied ? 'Copiado!' : 'Copiar Código'}
                  </button>
                  <button
                    onClick={() => {
                      setShowInstructions(true)
                      soundManager.playClick()
                    }}
                    className="px-4 py-2 rounded-xl bg-[#F9FAFB] text-[#3B82F6] text-sm font-semibold flex items-center gap-2 hover:bg-[#F3F4F6] transition-colors border border-[#E5E7EB]"
                  >
                    <Info size={16} />
                    Como Usar
                  </button>
                </div>
              </div>
              <div
                className="p-5 rounded-2xl bg-[#F9FAFB]"
                style={{
                  border: '1px solid #E5E7EB',
                }}
              >
                <MermaidDiagram diagram={result.mermaidDiagram} />
              </div>
            </div>

            {/* Export Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {exportOptions.map(option => (
                <button
                  key={option.format}
                  type="button"
                  onClick={() => handleExport(option)}
                  className="p-4 rounded-2xl border border-[#E5E7EB] bg-white flex flex-col gap-2 text-left hover:border-cyan-500 transition-colors"
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#4B5563]">
                    {option.name}
                  </span>
                  <p className="text-[11px] text-[#6B7280] leading-snug">{option.description}</p>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div
              className="p-6 mb-6 rounded-2xl bg-white"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '1px solid #E5E7EB',
              }}
            >
              <div className="flex flex-col gap-3">
                <div className="text-sm text-[#4B5563] bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3">
                  <p className="font-semibold text-[#111827] mb-1">Por que acessar o completo?</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Receber o mapa inteiro (respostas, padrões e diagrama) vinculado a você.
                    </li>
                    <li>Receber insights personalizados.</li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    setShowCompleteForm(true)
                    soundManager.playConfirm()
                  }}
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold flex items-center justify-center gap-2 hover:from-[#2563EB] hover:to-[#0891B2] transition-colors"
                  style={{
                    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.25)',
                  }}
                >
                  <Sparkles size={20} />
                  Ver Completo
                </button>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setPhase('dimensions')
                      setSelectedDimensions([])
                      setResponses({})
                      setResult(null)
                      soundManager.playClick()
                    }}
                    className="flex-1 ios-button-primary ios-compact"
                  >
                    Explorar de Novo
                  </button>
                  <button
                    onClick={() => {
                      setPhase('intro')
                      setSelectedDimensions([])
                      setResponses({})
                      setResult(null)
                      soundManager.playClick()
                    }}
                    className="flex-1 ios-button-secondary ios-compact"
                  >
                    ⟲ REINICIAR
                  </button>
                </div>
              </div>
            </div>

            {/* Contatos */}
            <div
              className="p-6 mb-6 rounded-2xl bg-white text-center"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                border: '1px solid #E5E7EB',
              }}
            >
              <p className="text-sm text-[#4B5563] mb-2">NΞØ Protocol</p>
              <div className="flex flex-col gap-1 text-sm">
                <a href="mailto:neo@neoprotocol.space" className="text-[#3B82F6] hover:underline">
                  neo@neoprotocol.space
                </a>
                <a
                  href="https://neoprotocol.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3B82F6] hover:underline"
                >
                  neoprotocol.space
                </a>
              </div>
            </div>

            <div className="h-4"></div>
          </main>
        </div>

        <Footer />

        <BottomNavigation />

        {/* Complete Form Modal */}
        {showCompleteForm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCompleteForm(false)}
          >
            <div
              className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#111827]">Ver Mapa Completo</h3>
                <button
                  onClick={() => setShowCompleteForm(false)}
                  className="p-2 rounded-xl hover:bg-[#F9FAFB] transition-colors"
                >
                  <X size={20} className="text-[#4B5563]" />
                </button>
              </div>

              <p className="text-sm text-[#4B5563] mb-6">
                Para acessar seu mapa completo e receber insights adicionais, compartilhe seus dados
                de contato.
              </p>

              <div className="mb-6 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] p-4 text-sm text-[#4B5563] space-y-2">
                <p className="font-semibold text-[#111827]">Você recebe:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Mapa completo com suas respostas, padrões e diagrama (CID dedicado).</li>
                  <li>Vaga prioritária para próximas fases e convites do NΞØ.</li>
                  <li>Seguimento com insights personalizados a partir do seu mapeamento.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">Email *</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={e => setUserData({ ...userData, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all text-[#111827]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={e => setUserData({ ...userData, phone: e.target.value })}
                    placeholder="+55 11 99999-9999"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all text-[#111827]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Perfil GitHub *
                  </label>
                  <input
                    type="text"
                    value={userData.github}
                    onChange={e => setUserData({ ...userData, github: e.target.value })}
                    placeholder="username ou github.com/username"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all text-[#111827]"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowCompleteForm(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#F9FAFB] text-[#4B5563] font-semibold hover:bg-[#F3F4F6] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={async () => {
                    if (!userData.email || !userData.phone || !userData.github) {
                      alert('Preencha email, telefone e perfil GitHub para acessar completo.')
                      return
                    }

                    setSavingToIPFS(true)
                    try {
                      // Salvar dados completos no IPFS (com email, telefone, GitHub)
                      const completeData = {
                        ...result,
                        responses,
                        userData: {
                          email: userData.email,
                          phone: userData.phone,
                          github: userData.github,
                        },
                        timestamp: Date.now(),
                      }

                      const cid = await saveIntentToIPFS(completeData, null)
                      setIpfsCid(cid)
                      setShowCompleteForm(false)
                      soundManager.playConfirm()

                      // Limpar formulário
                      setUserData({ email: '', phone: '', github: '' })
                    } catch (error) {
                      console.error('Erro ao salvar:', error)
                      alert('Erro ao salvar. Tente novamente.')
                      soundManager.playError()
                    } finally {
                      setSavingToIPFS(false)
                    }
                  }}
                  disabled={!userData.email || !userData.phone || !userData.github || savingToIPFS}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-semibold hover:from-[#2563EB] hover:to-[#0891B2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {savingToIPFS ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    'Salvar e Ver Completo'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions Modal */}
        {showInstructions && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowInstructions(false)}
          >
            <div
              className="bg-white rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#111827]">
                  Como Usar seu Diagrama Mermaid
                </h3>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="p-2 rounded-xl hover:bg-[#F9FAFB] transition-colors"
                >
                  <X size={20} className="text-[#4B5563]" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Notion Option */}
                <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <h4 className="text-lg font-semibold text-[#111827] mb-3">1. No Notion</h4>
                  <ol className="space-y-2 text-[#4B5563] text-sm list-decimal list-inside">
                    <li>Cole o código copiado em um bloco de código</li>
                    <li>
                      Selecione a linguagem como{' '}
                      <code className="bg-[#E5E7EB] px-2 py-0.5 rounded">mermaid</code>
                    </li>
                    <li>O diagrama será renderizado automaticamente</li>
                  </ol>
                </div>

                {/* Mermaid Chart Option */}
                <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <h4 className="text-lg font-semibold text-[#111827] mb-3">2. No Mermaid Chart</h4>
                  <ol className="space-y-2 text-[#4B5563] text-sm list-decimal list-inside mb-4">
                    <li>
                      Acesse{' '}
                      <a
                        href="https://mermaidchart.cello.so/fdEpuF0TutA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3B82F6] font-semibold hover:underline"
                      >
                        mermaidchart.cello.so
                      </a>
                    </li>
                    <li>Crie uma conta se ainda não tiver</li>
                    <li>Cole o código copiado no editor</li>
                    <li>Visualize e edite seu diagrama</li>
                  </ol>
                  <a
                    href="https://mermaidchart.cello.so/fdEpuF0TutA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 rounded-xl bg-[#3B82F6] text-white text-center font-semibold hover:bg-[#2563EB] transition-colors"
                  >
                    Abrir Mermaid Chart
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}

export default function IntentSystemPage() {
  return (
    <AgentProvider>
      <IntentSystemContent />
    </AgentProvider>
  )
}
