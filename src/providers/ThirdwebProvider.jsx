import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Base } from "@thirdweb-dev/chains";
import X402Provider from "./X402Provider";

/**
 * Provider unificado Thirdweb
 * - Integra @thirdweb-dev/react (para componentes React e wallet connect)
 * - Integra thirdweb SDK (via X402Provider)
 * - Integra x402 Payments (via X402Provider)
 * 
 * O mesmo cliente Thirdweb é usado para SDK, x402 Payments e wallet connect
 */
export default function TWProvider({ children }) {
  const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
  const hasClientId = clientId && clientId !== "SEU_CLIENT_ID_THIRDWEB" && clientId !== "your-thirdweb-client-id-here";

  // ThirdwebProvider funciona mesmo sem Client ID (modo preview)
  // Mas recomenda-se configurar para funcionalidade completa
  return (
    <ThirdwebProvider
      activeChain={Base}
      clientId={hasClientId ? clientId : undefined}
    >
      <X402Provider>
        {children}
      </X402Provider>
    </ThirdwebProvider>
  );
}

