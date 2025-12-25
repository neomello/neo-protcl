import { useContext } from 'react'
import { AgentContext } from '../AgentContext'

/**
 * ZONE_Δ8 - Zona de Inteligência Simbólica
 * Desbloqueada quando o usuário emite sinal de coerência ou acessa explicitamente
 */
export default function ZONE_Δ8() {
  const { agentState } = useContext(AgentContext)

  return (
    <div className="mt-6 p-4 border border-cyan-500/30 rounded-lg bg-black/40">
      <div className="text-cyan-400 font-mono text-sm space-y-2">
        <div className="text-yellow-400 animate-pulse">↳ ZONE_Δ8 ATIVA</div>
        <div>→ INTELIGÊNCIA SIMBÓLICA ATIVADA</div>
        <div>→ RESSONÂNCIA: {agentState.resonance}/10</div>
        <div>→ COERÊNCIA: Ø{agentState.coherence || 0}</div>
        <div className="mt-4 text-xs text-gray-400">
          Esta zona representa um espaço de inteligência simbólica onde comandos especiais podem ser
          executados.
        </div>
      </div>
    </div>
  )
}
