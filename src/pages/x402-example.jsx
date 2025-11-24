import { useState } from "react";
import PaymentButton from "../components/X402/PaymentButton";
import { useX402Payment } from "../hooks/useX402Payment";

export default function X402Example() {
  const { isConfigured, loading } = useX402Payment();
  const [result, setResult] = useState(null);

  const handleSuccess = (result) => {
    setResult({ success: true, data: result });
    console.log("Pagamento bem-sucedido:", result);
  };

  const handleError = (error) => {
    setResult({ success: false, error: error.message || error });
    console.error("Erro no pagamento:", error);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 safe-area-inset">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center neon-text">
          x402 Payments - NΞØ Protocol
        </h1>

        {!isConfigured && (
          <div className="bg-yellow-900/30 border border-yellow-600 rounded-xl p-4 mb-6">
            <p className="text-yellow-400 text-sm">
              ⚠️ x402 Payments não está configurado. Configure as variáveis de ambiente:
            </p>
            <ul className="text-xs text-yellow-300 mt-2 space-y-1 list-disc list-inside">
              <li>VITE_THIRDWEB_SECRET_KEY</li>
              <li>VITE_X402_SERVER_WALLET_ADDRESS</li>
            </ul>
          </div>
        )}

        <div className="bg-gray-900/40 border border-gray-700 rounded-xl p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Exemplo de Pagamento</h2>
            <PaymentButton
              resourceUrl="https://api.example.com/premium-content"
              price="$0.01"
              method="GET"
              onSuccess={handleSuccess}
              onError={handleError}
            >
              Pagar $0.01 para Acessar Conteúdo
            </PaymentButton>
          </div>

          {result && (
            <div className={`border rounded-xl p-4 ${
              result.success 
                ? "bg-green-900/30 border-green-600" 
                : "bg-red-900/30 border-red-600"
            }`}>
              <h3 className="font-semibold mb-2">
                {result.success ? "✅ Sucesso" : "❌ Erro"}
              </h3>
              <pre className="text-xs overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          <div className="text-sm text-gray-400 space-y-2">
            <p>
              <strong className="text-white">x402 Payments</strong> permite processar micropagamentos
              de forma descentralizada usando a rede Base.
            </p>
            <p>
              Configure o <code className="bg-gray-800 px-2 py-1 rounded">VITE_THIRDWEB_SECRET_KEY</code> e
              <code className="bg-gray-800 px-2 py-1 rounded">VITE_X402_SERVER_WALLET_ADDRESS</code> no arquivo <code className="bg-gray-800 px-2 py-1 rounded">.env</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

