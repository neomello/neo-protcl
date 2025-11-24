import { useState } from "react";
import { useThirdwebSDK } from "../hooks/useThirdwebSDK";
import { getContractInstance, callContractFunction } from "../services/thirdwebSDK";

export default function SDKExample() {
  const { client, isConfigured, network } = useThirdwebSDK();
  const [contractAddress, setContractAddress] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetContract = () => {
    if (!contractAddress) {
      alert("Digite o endereço do contrato");
      return;
    }

    try {
      const contract = getContractInstance(contractAddress);
      setResult({ success: true, data: `Contrato obtido: ${contractAddress}`, contract });
    } catch (error) {
      setResult({ success: false, error: error.message });
    }
  };

  const handleCallFunction = async () => {
    if (!contractAddress) {
      alert("Digite o endereço do contrato");
      return;
    }

    setLoading(true);
    try {
      // Exemplo: chamar função read do contrato
      const transaction = callContractFunction(
        contractAddress,
        "function totalSupply() view returns (uint256)",
        []
      );
      setResult({ success: true, data: "Transação preparada", transaction });
    } catch (error) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-black text-white p-4 safe-area-inset">
        <div className="max-w-2xl mx-auto">
          <div className="bg-yellow-900/30 border border-yellow-600 rounded-xl p-4">
            <p className="text-yellow-400">
              ⚠️ Thirdweb SDK não está configurado. Configure VITE_THIRDWEB_SECRET_KEY ou VITE_THIRDWEB_CLIENT_ID no .env
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 safe-area-inset">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center neon-text">
          Thirdweb SDK - NΞØ Protocol
        </h1>

        <div className="bg-gray-900/40 border border-gray-700 rounded-xl p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Cliente Thirdweb</h2>
            <p className="text-sm text-gray-400 mb-4">
              ✅ Cliente configurado e pronto para usar SDK
            </p>
            <p className="text-xs text-gray-500">
              Network: {network.name} (Chain ID: {network.id})
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Obter Contrato</h3>
            <input
              type="text"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="0x..."
              className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg mb-3"
            />
            <button
              onClick={handleGetContract}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors w-full"
            >
              Obter Contrato
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Chamar Função</h3>
            <button
              onClick={handleCallFunction}
              disabled={loading}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-xl font-medium transition-colors w-full"
            >
              {loading ? "Processando..." : "Preparar Chamada"}
            </button>
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
              <strong className="text-white">Thirdweb SDK</strong> permite interagir com contratos inteligentes,
              fazer mint de NFTs, e executar transações na blockchain.
            </p>
            <p>
              O mesmo cliente usado para x402 Payments também funciona para o SDK.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

