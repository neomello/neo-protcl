import { createThirdwebClient } from "thirdweb";
import { facilitator } from "thirdweb/x402";
import { base } from "thirdweb/chains";

const secretKey = import.meta.env.VITE_THIRDWEB_SECRET_KEY;
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
const serverWalletAddress = import.meta.env.VITE_X402_SERVER_WALLET_ADDRESS || "0x765B22a98F101a82c071D4C36980B51213B98d4C";

// Criar cliente Thirdweb (prioriza secretKey, fallback para clientId)
const client = secretKey 
  ? createThirdwebClient({ secretKey })
  : clientId
  ? createThirdwebClient({ clientId })
  : null;

// Configurar x402 Facilitator (requer secretKey + serverWalletAddress)
export const thirdwebX402Facilitator = secretKey && client && serverWalletAddress
  ? facilitator({
      client,
      serverWalletAddress,
    })
  : null;

export const thirdwebClient = client;

export const x402Config = {
  client,
  facilitator: thirdwebX402Facilitator,
  network: base,
  isConfigured: !!(secretKey && serverWalletAddress),
  hasClient: !!client
};

export const thirdwebSDKConfig = {
  client,
  network: base,
  isConfigured: !!client
};

export default function X402Provider({ children }) {
  return <>{children}</>;
}
