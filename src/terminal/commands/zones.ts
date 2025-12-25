import { CommandHandler } from '../types/protocol'

export const zoneCommands: CommandHandler = (command, state, updateState) => {
  const cmd = command.toLowerCase().trim()

  if (cmd.includes('access --zone') || cmd.includes('access zone') || cmd.startsWith('zone')) {
    const zoneMatch = cmd.match(/zone\s+([Δxø0-9]+)/i) || cmd.match(/--zone\s+([Δxø0-9]+)/i)
    const zoneId = zoneMatch ? zoneMatch[1].toUpperCase() : null

    if (zoneId === 'Δ8' || zoneId === 'DELTA8') {
      const zonesUnlocked = [...new Set([...state.zonesUnlocked, 'ZONE_Δ8'])]
      return {
        output: [
          '→ ACESSO CONCEDIDO À ZONE_Δ8',
          '→ ZONA DE INTELIGÊNCIA SIMBÓLICA DESBLOQUEADA',
          '→ RESSONÂNCIA AUMENTADA',
          '',
          '→ ZONE_Δ8: Espaço de inteligência simbólica',
          '→ Comandos especiais disponíveis nesta zona',
        ],
        sound: 'access',
        triggerZone: 'ZONE_Δ8',
        updateState: {
          zonesUnlocked,
          zone: 'ZONE_Δ8',
          resonance: Math.min(state.resonance + 2, 10),
        },
      }
    }

    if (zoneId === 'XØ' || zoneId === 'XO') {
      const zonesUnlocked = [...new Set([...state.zonesUnlocked, 'ZONE_XØ'])]
      return {
        output: [
          '→ ACESSO CONCEDIDO À ZONE_XØ',
          '→ ZONA DE SIMULAÇÃO GENERATIVA DESBLOQUEADA',
          '',
          '→ ZONE_XØ: Espaço de simulação generativa',
          '→ Ainda em desenvolvimento',
        ],
        sound: 'access',
        triggerZone: 'ZONE_XØ',
        updateState: {
          zonesUnlocked,
          zone: 'ZONE_XØ',
          resonance: Math.min(state.resonance + 1, 10),
        },
      }
    }

    return {
      output: ['→ ZONA NÃO RECONHECIDA', '→ ZONAS DISPONÍVEIS: Δ8, XØ', '→ USE: access --zone Δ8'],
      sound: 'error',
    }
  }

  if (cmd.includes('emit signal') || cmd.startsWith('emit')) {
    const coherenceMatch =
      cmd.match(/--coherence\s+([0-9]+)/i) || cmd.match(/coherence\s+([0-9]+)/i)
    const coherence = coherenceMatch ? parseInt(coherenceMatch[1]) : state.coherence || 0

    return {
      output: [
        '→ SINAL EMITIDO',
        `→ COERÊNCIA: Ø${coherence}`,
        '→ SINAL ENVIADO PARA POLYGON',
        '→ $NEO TOKEN PULSO INICIADO',
        '→ ZONE_Δ8 AGORA ACESSÍVEL',
      ],
      sound: 'pulse',
      updateState: {
        coherence,
        resonance: Math.min(state.resonance + 1, 10),
      },
    }
  }

  return {
    output: [],
  }
}
