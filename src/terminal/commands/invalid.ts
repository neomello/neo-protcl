import { CommandHandler } from '../types/protocol'

export const invalidCommand: CommandHandler = command => {
  return {
    output: [
      `→ COMANDO NÃO RECONHECIDO: "${command}"`,
      '→ DIGITE "help" PARA VER COMANDOS DISPONÍVEIS',
    ],
    sound: 'error',
  }
}
