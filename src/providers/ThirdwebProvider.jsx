import { ThirdwebProvider } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { base } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";
import { thirdwebClient } from "./X402Provider";
import X402Provider from "./X402Provider";

/**
 * ThirdwebProvider - Embedded Wallet Main Provider
 *
 * Features:
 * - Embedded Wallets (email, social, passkey) - self-custodial (MPC)
 * - Multi-chain support (Base as default)
 * - Account abstraction (gasless, EIP-7702)
 *
 * Requires VITE_THIRDWEB_CLIENT_ID in .env
 */
export default function TWProvider({ children }) {
  const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
  const secretKey = import.meta.env.VITE_THIRDWEB_SECRET_KEY;
  
  // Use existing client or create new one if needed
  const client = thirdwebClient || (secretKey 
    ? createThirdwebClient({ secretKey })
    : clientId && clientId !== "SEU_CLIENT_ID_THIRDWEB" && clientId !== "your-thirdweb-client-id-here"
    ? createThirdwebClient({ clientId })
    : null);

  const hasClient = Boolean(client);

  // Setup Embedded Wallet (if ready)
  const wallets = hasClient
    ? [
        inAppWallet({
          auth: {
            options: [
              "email", // Email + OTP
              "google", // Google OAuth
              "apple", // Apple Sign-In
              "passkey", // WebAuthn/Passkey
            ],
          },
          metadata: {
            name: "NΞØ Protocol",
            image: {
              src: "/logos/neo-logo.png",
              width: 100,
              height: 100,
            },
          },
          executionMode: {
            mode: "EIP7702",
            sponsorGas: true, // Gasless
          },
        }),
      ]
    : [];

  // Fallback: Remove thirdweb if not configured
  if (!hasClient) {
    if (import.meta.env.DEV) {
      console.warn('[ThirdwebProvider] Client not configured. Using X402Provider fallback.');
    }
    return <X402Provider>{children}</X402Provider>;
  }

  return (
    <ThirdwebProvider
      client={client}
      activeChain={base}
      wallets={wallets}
    >
      <X402Provider>{children}</X402Provider>
    </ThirdwebProvider>
  );
}
