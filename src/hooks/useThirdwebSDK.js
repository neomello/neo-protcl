import { thirdwebClient, thirdwebSDKConfig } from "../providers/X402Provider";
import { base } from "thirdweb/chains";

/**
 * Hook para usar o SDK da Thirdweb
 * Usa o mesmo cliente do X402Provider
 * 
 * O cliente Thirdweb pode ser usado para:
 * - x402 Payments (requer secretKey)
 * - SDK de contratos (funciona com secretKey ou clientId)
 * - Transações via API (requer secretKey)
 */
export function useThirdwebSDK() {
  const isConfigured = thirdwebSDKConfig.isConfigured;
  const client = thirdwebClient;

  /**
   * Fazer transação usando a Thirdweb HTTP API (server-side)
   * @param {Object} params - Parâmetros da transação
   * @param {string} params.chainId - ID da chain (8453 para Base)
   * @param {string} params.from - Endereço da wallet do servidor
   * @param {Array} params.transactions - Array de transações
   * @returns {Promise<Object>} Resultado da transação
   */
  const sendTransaction = async ({ chainId = "8453", from, transactions }) => {
    if (!client) {
      throw new Error("Thirdweb client não está configurado");
    }

    const secretKey = import.meta.env.VITE_THIRDWEB_SECRET_KEY;
    if (!secretKey) {
      throw new Error("VITE_THIRDWEB_SECRET_KEY é necessário para enviar transações via API");
    }

    // Usar a Thirdweb HTTP API
    const response = await fetch("https://api.thirdweb.com/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-secret-key": secretKey
      },
      body: JSON.stringify({
        chainId,
        from,
        transactions
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Erro desconhecido" }));
      throw new Error(error.message || "Erro ao enviar transação");
    }

    return response.json();
  };

  return {
    client,
    isConfigured,
    sendTransaction,
    network: base
  };
}

