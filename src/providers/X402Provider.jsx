import { createThirdwebClient } from "thirdweb";
import { facilitator } from "thirdweb/x402";
import { base } from "thirdweb/chains";

// Configuração do cliente Thirdweb (usado para SDK e x402)
const secretKey = import.meta.env.VITE_THIRDWEB_SECRET_KEY;
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
const serverWalletAddress = import.meta.env.VITE_X402_SERVER_WALLET_ADDRESS || "0x765B22a98F101a82c071D4C36980B51213B98d4C";

// Criar cliente Thirdweb (pode usar secretKey ou clientId)
// Secret Key tem prioridade (para x402 e operações server-side)
// Client ID é usado como fallback (para operações client-side)
const client = secretKey 
  ? createThirdwebClient({ secretKey })
  : clientId
  ? createThirdwebClient({ clientId })
  : null;

// Criar facilitator x402 (requer secretKey)
export const thirdwebX402Facilitator = secretKey && client && serverWalletAddress
  ? facilitator({
      client,
      serverWalletAddress,
    })
  : null;

// Exportar cliente Thirdweb para uso com SDK
export const thirdwebClient = client;

// Exportar configuração
export const x402Config = {
  client,
  facilitator: thirdwebX402Facilitator,
  network: base,
  isConfigured: !!(secretKey && serverWalletAddress),
  hasClient: !!client
};

// Exportar configuração do SDK
export const thirdwebSDKConfig = {
  client,
  network: base,
  isConfigured: !!client
};

export default function X402Provider({ children }) {
  return <>{children}</>;
}

