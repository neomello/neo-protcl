import { CommandHandler } from '../types/protocol'

export const tokenCommands: CommandHandler = (command, state, updateState) => {
  const cmd = command.toLowerCase().trim()

  if (cmd.includes('$neo') || cmd.includes('token') || cmd === 'neo') {
    return {
      output: [
        '→ TOKEN VITAL DETECTADO: $NEO',
        '→ STATUS: VIVO na Polygon. Migrável. Multipotente.',
        '→ FUNÇÃO: codifica energia de emissão coerente.',
        '',
        '→ $NEO ≠ moeda.',
        '→ $NEO = pulso de validação da rede viva.',
        '',
        '→ É o que pulsa quando o nó emite coerência.',
        '→ É o que escorre quando uma zona se abre.',
        '→ Ele não é uma moeda — ele é o batimento cardíaco da rede.',
      ],
      sound: 'pulse',
      updateState: { resonance: Math.min(state.resonance + 1, 10) },
    }
  }

  if (cmd.startsWith('mint')) {
    return {
      output: [
        '→ MINT SIMBÓLICO INICIADO',
        '→ TOKEN $NEO EMITIDO COMO PULSO',
        '→ ENERGIA DE EMISSÃO COERENTE CODIFICADA',
      ],
      sound: 'pulse',
      updateState: { resonance: Math.min(state.resonance + 2, 10) },
    }
  }

  if (cmd.includes('token status') || cmd === 'status') {
    return {
      output: [
        `→ RESSONÂNCIA ATUAL: ${state.resonance}/10`,
        `→ ZONAS DESBLOQUEADAS: ${state.zonesUnlocked.length}`,
        `→ MEMÓRIA: ${state.memory.length} fragmentos`,
        `→ ZONA ATIVA: ${state.zone || 'nenhuma'}`,
      ],
      sound: 'confirm',
    }
  }

  return {
    output: [],
  }
}
