import React, { createContext, useContext } from "react";
import { createThirdwebClient } from "thirdweb";
import { facilitator } from "thirdweb/x402";
import { base } from "thirdweb/chains";

// Contexto para o Cliente Thirdweb
const ThirdwebClientContext = createContext(null);

export const useThirdwebClient = () => useContext(ThirdwebClientContext);

const secretKey = import.meta.env.VITE_THIRDWEB_SECRET_KEY;
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
const serverWalletAddress = import.meta.env.VITE_X402_SERVER_WALLET_ADDRESS || "0x765B22a98F101a82c071D4C36980B51213B98d4C";

// Validar credenciais
const isValidSecretKey = typeof secretKey === 'string' && secretKey.trim().length > 0;
const isValidClientId = typeof clientId === 'string' && clientId.trim().length > 0;

// Criar instância única (Singleton)
let globalClient = null;
try {
  if (isValidSecretKey) {
    globalClient = createThirdwebClient({ secretKey });
  } else if (isValidClientId) {
    globalClient = createThirdwebClient({ clientId });
  }
} catch (e) {
  console.error('[X402] Erro crítico ao criar cliente:', e);
}

export const thirdwebClient = globalClient;

export const thirdwebX402Facilitator = secretKey && globalClient && serverWalletAddress
  ? facilitator({ client: globalClient, serverWalletAddress })
  : null;

export const x402Config = {
  client: globalClient,
  facilitator: thirdwebX402Facilitator,
  network: base,
  isConfigured: !!(secretKey && serverWalletAddress),
  hasClient: !!globalClient
};

export default function X402Provider({ children }) {
  return (
    <ThirdwebClientContext.Provider value={globalClient}>
      {children}
    </ThirdwebClientContext.Provider>
  );
}
