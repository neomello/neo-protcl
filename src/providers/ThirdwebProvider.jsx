import { useMemo } from "react";
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
  
  // Validate clientId/secretKey
  const isValidClientId = clientId && 
    clientId !== "SEU_CLIENT_ID_THIRDWEB" && 
    clientId !== "your-thirdweb-client-id-here" &&
    clientId.trim().length > 0;
  
  const isValidSecretKey = secretKey && secretKey.trim().length > 0;
  
  // Always create client in this component to ensure it's available
  // Use useMemo to ensure client is stable and not recreated on every render
  const client = useMemo(() => {
    // Try to use existing client first (if it exists and is valid)
    if (thirdwebClient && typeof thirdwebClient === 'object' && Object.keys(thirdwebClient).length > 0) {
      return thirdwebClient;
    }
    
    // Create new client if not available
    if (isValidSecretKey) {
      try {
        return createThirdwebClient({ secretKey });
      } catch (error) {
        console.error('[ThirdwebProvider] Failed to create client with secretKey:', error);
        return null;
      }
    } else if (isValidClientId) {
      try {
        return createThirdwebClient({ clientId });
      } catch (error) {
        console.error('[ThirdwebProvider] Failed to create client with clientId:', error);
        return null;
      }
    }
    
    return null;
  }, [thirdwebClient, isValidSecretKey, isValidClientId, secretKey, clientId]);

  // Validate client exists and is properly structured
  const hasClient = Boolean(
    client && 
    typeof client === 'object' &&
    // Ensure client has the expected structure (thirdweb client objects have internal properties)
    Object.keys(client).length > 0
  );

  // Debug in dev mode
  if (import.meta.env.DEV) {
    if (!hasClient) {
      console.warn('[ThirdwebProvider] Client not configured. Using X402Provider fallback.');
      console.warn('[ThirdwebProvider] clientId:', isValidClientId ? 'valid' : 'invalid/missing');
      console.warn('[ThirdwebProvider] secretKey:', isValidSecretKey ? 'valid' : 'invalid/missing');
      console.warn('[ThirdwebProvider] thirdwebClient from X402Provider:', thirdwebClient ? 'exists' : 'null');
    } else {
      console.log('[ThirdwebProvider] Client configured successfully');
    }
  }

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
    return <X402Provider>{children}</X402Provider>;
  }

  // Ensure client is never undefined when passed to ThirdwebProvider
  if (!client) {
    console.error('[ThirdwebProvider] CRITICAL: Client is undefined but hasClient is true. This should not happen.');
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
