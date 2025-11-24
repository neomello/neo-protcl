import { thirdwebClient, thirdwebSDKConfig } from "../providers/X402Provider";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { base } from "thirdweb/chains";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";

/**
 * Serviços para usar o SDK da Thirdweb
 * Usa o mesmo cliente do X402Provider
 */

/**
 * Obter instância de contrato
 * @param {string} contractAddress - Endereço do contrato
 * @returns {Object} Contrato configurado
 */
export function getContractInstance(contractAddress) {
  if (!thirdwebSDKConfig.isConfigured) {
    throw new Error("Thirdweb client não está configurado. Configure VITE_THIRDWEB_SECRET_KEY ou VITE_THIRDWEB_CLIENT_ID");
  }

  return getContract({
    client: thirdwebClient,
    chain: base,
    address: contractAddress
  });
}

/**
 * Preparar chamada de contrato
 * @param {Object} contract - Instância do contrato
 * @param {string} method - Método do contrato
 * @param {Array} params - Parâmetros do método
 * @returns {Object} Transação preparada
 */
export function prepareContractCallInstance(contract, method, params = []) {
  return prepareContractCall({
    contract,
    method,
    params
  });
}

/**
 * Enviar transação usando Thirdweb API (server-side)
 * @param {Object} params - Parâmetros da transação
 * @param {string} params.chainId - ID da chain (84532 para Base Sepolia, 8453 para Base)
 * @param {string} params.from - Endereço da wallet do servidor
 * @param {Array} params.transactions - Array de transações
 * @returns {Promise<Object>} Resultado da transação
 */
export async function sendTransactionViaAPI({ chainId = "8453", from, transactions }) {
  const secretKey = import.meta.env.VITE_THIRDWEB_SECRET_KEY;

  if (!secretKey) {
    throw new Error("VITE_THIRDWEB_SECRET_KEY é necessário para enviar transações via API");
  }

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
}

/**
 * Exemplo: Mint NFT usando SDK
 * @param {string} contractAddress - Endereço do contrato NFT
 * @param {string} to - Endereço que receberá o NFT
 * @param {string} tokenUri - URI do token
 * @returns {Promise<Object>} Resultado da transação
 */
export async function mintNFT(contractAddress, to, tokenUri) {
  const contract = getContractInstance(contractAddress);
  
  const transaction = prepareContractCall({
    contract,
    method: "function mintTo(address to, string memory tokenUri)",
    params: [to, tokenUri]
  });

  // Nota: sendTransaction requer uma wallet conectada
  // Para server-side, use sendTransactionViaAPI
  return transaction;
}

/**
 * Exemplo: Chamar função de contrato
 * @param {string} contractAddress - Endereço do contrato
 * @param {string} method - Assinatura da função
 * @param {Array} params - Parâmetros
 * @returns {Object} Transação preparada
 */
export function callContractFunction(contractAddress, method, params = []) {
  const contract = getContractInstance(contractAddress);
  return prepareContractCallInstance(contract, method, params);
}

