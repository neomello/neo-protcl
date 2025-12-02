import { useState } from "react";
import { useThirdwebSDK } from "../hooks/useThirdwebSDK";
import { getContractInstance, callContractFunction } from "../services/thirdwebSDK";
import Navbar from "../components/Navbar";
import BottomNavigation from "../components/BottomNavigation";

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

  return (
    <div 
      className="min-h-screen bg-black text-gray-100 overflow-x-hidden pb-16 safe-area-inset relative"
      style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
    >
      {/* Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        {/* Status Bar Spacer */}
        <div className="ios-status-bar"></div>

        <Navbar />

        {/* Main Content - Bento Grid Layout */}
        <main className="container mx-auto px-4 py-6 pt-safe">
          
          {/* Hero Card - SDK Header */}
          <div className="ios-card mb-4 p-6 spring-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm flex items-center justify-center ios-shadow-md">
                <span className="text-3xl font-mono">↯</span>
              </div>
              <h1 className="ios-headline text-white mb-2">Thirdweb SDK</h1>
              <p className="ios-body text-gray-300 leading-relaxed max-w-md">
                Interaja com contratos inteligentes, NFTs e execute transações na blockchain.
              </p>
            </div>
          </div>

          {!isConfigured ? (
            <div className="ios-card mb-4 p-5 spring-in border-yellow-500/30" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-mono">✶</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-yellow-400 mb-2">Configuração Necessária</h3>
                  <p className="ios-caption text-gray-400">
                    Configure VITE_THIRDWEB_SECRET_KEY ou VITE_THIRDWEB_CLIENT_ID no .env
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Status Card - Wide */}
              <div className="ios-card mb-4 p-5 spring-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-mono">⦾</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white mb-2">Cliente Configurado</h3>
                    <p className="ios-caption text-gray-400">
                      Network: {network.name} (Chain ID: {network.id})
                    </p>
                  </div>
                </div>
              </div>

              {/* Contract Input Card - Wide */}
              <div className="ios-card mb-4 p-5 spring-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-base font-semibold text-white mb-4">Obter Contrato</h3>
                <input
                  type="text"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 rounded-lg mb-3 font-mono text-sm"
                />
                <button
                  onClick={handleGetContract}
                  className="w-full ios-button"
                >
                  Obter Contrato
                </button>
              </div>

              {/* Actions Grid - 2 Column */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="ios-card col-span-1 p-5 spring-in" style={{ animationDelay: '0.3s' }}>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-3 ios-shadow-sm">
                    <span className="text-2xl font-mono">▱</span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">Contratos</h3>
                  <p className="ios-caption text-gray-400">Interaja com contratos inteligentes</p>
                </div>

                <div className="ios-card col-span-1 p-5 spring-in" style={{ animationDelay: '0.4s' }}>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mb-3 ios-shadow-sm">
                    <span className="text-2xl font-mono">✷</span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">NFTs</h3>
                  <p className="ios-caption text-gray-400">Mint e gerencie NFTs</p>
                </div>
              </div>

              {/* Function Call Card */}
              <div className="ios-card mb-4 p-5 spring-in" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-base font-semibold text-white mb-4">Chamar Função</h3>
                <button
                  onClick={handleCallFunction}
                  disabled={loading}
                  className="w-full ios-button-secondary disabled:opacity-50"
                >
                  {loading ? "Processando..." : "Preparar Chamada"}
                </button>
              </div>

              {/* Result Card - Wide */}
              {result && (
                <div className={`ios-card mb-4 p-5 spring-in ${
                  result.success ? 'border-green-500/30' : 'border-red-500/30'
                }`} style={{ animationDelay: '0.6s' }}>
                  <h3 className="text-base font-semibold mb-3">
                    {result.success ? "⦾ Sucesso" : "⤫ Erro"}
                  </h3>
                  <pre className="bg-black/40 border border-white/10 rounded-lg p-4 text-xs overflow-x-auto font-mono text-gray-300">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}

              {/* Info Card - Wide */}
              <div className="ios-card p-5 mb-4 spring-in" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-mono">⟡</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white mb-2">Sobre o SDK</h3>
                    <p className="ios-caption text-gray-400 leading-relaxed">
                      O mesmo cliente usado para x402 Payments também funciona para o SDK. Permite interagir com contratos inteligentes, fazer mint de NFTs, e executar transações na blockchain.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Footer Spacer */}
          <div className="h-4"></div>

        </main>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}

