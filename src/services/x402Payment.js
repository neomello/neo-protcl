import { x402Config } from "../providers/X402Provider";

/**
 * NOTA: settlePayment é usado no BACKEND, não no frontend.
 * 
 * No frontend, você apenas faz requisições HTTP normais com o header x-payment.
 * O backend processa o pagamento usando settlePayment.
 * 
 * Este arquivo contém helpers para fazer requisições com x402 Payments.
 */

/**
 * Faz uma requisição HTTP com pagamento x402
 * O backend deve processar o pagamento usando settlePayment
 * 
 * @param {string} url - URL do recurso
 * @param {Object} options - Opções da requisição
 * @param {string} options.paymentData - Dados do pagamento (header x-payment)
 * @param {string} options.price - Preço (informacional)
 * @returns {Promise<Response>}
 */
export async function fetchWithX402Payment(url, options = {}) {
  const { paymentData, price, ...fetchOptions } = options;

  if (!paymentData) {
    throw new Error("paymentData (header x-payment) é obrigatório para pagamentos x402");
  }

  // Fazer requisição com header x-payment
  // O backend processa o pagamento usando settlePayment
  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      ...fetchOptions.headers,
      "x-payment": paymentData
    }
  });

  return response;
}

/**
 * Gera dados de pagamento x402 (simulado - em produção vem do backend/wallet)
 * 
 * NOTA: Em produção, o paymentData deve ser gerado pelo backend ou pela wallet do usuário
 * 
 * @param {string} price - Preço em formato string
 * @returns {string} paymentData para usar no header x-payment
 */
export function generateX402PaymentData(price = "$0.01") {
  // Em produção, isso deve ser gerado pelo backend ou pela integração com wallet
  // Por enquanto, retorna um placeholder
  return `x402-payment-${Date.now()}-${price}`;
}

