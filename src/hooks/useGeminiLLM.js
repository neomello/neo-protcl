import { useState } from 'react'
import { generateResponse, isGeminiConfigured } from '../services/geminiLLM'

/**
 * Hook para usar Gemini LLM no LiveAgent
 */
export function useGeminiLLM() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * Gerar resposta inteligente usando Gemini
   * @param {string} prompt - Comando ou pergunta
   * @param {Object} agentState - Estado atual do agente
   * @returns {Promise<string>} Resposta formatada
   */
  const askGemini = async (prompt, agentState = {}) => {
    if (!isGeminiConfigured()) {
      throw new Error('Gemini API não configurada. Configure VITE_GEMINI_API_KEY no .env')
    }

    setLoading(true)
    setError(null)

    try {
      const response = await generateResponse(prompt, agentState)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    askGemini,
    loading,
    error,
    isConfigured: isGeminiConfigured(),
  }
}
