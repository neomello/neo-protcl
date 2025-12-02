import { useState } from "react";
import PaymentButton from "../components/X402/PaymentButton";
import { useX402Payment } from "../hooks/useX402Payment";
import Navbar from "../components/Navbar";
import BottomNavigation from "../components/BottomNavigation";

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
    <div 
      className="min-h-screen bg-black text-gray-100 overflow-x-hidden pb-16 safe-area-inset relative"
      style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
    >
      {/* Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        {/* Status Bar Spacer */}
        <div className="ios-status-bar"></div>

        <Navbar />

        {/* Main Content - Bento Grid Layout */}
        <main className="container mx-auto px-4 py-6 pt-safe">
          
          {/* Hero Card - x402 Header */}
          <div className="ios-card mb-4 p-6 spring-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-cyan-500/20 backdrop-blur-sm flex items-center justify-center ios-shadow-md">
                <span className="text-3xl font-mono">✶</span>
              </div>
              <h1 className="ios-headline text-white mb-2">x402 Payments</h1>
              <p className="ios-body text-gray-300 leading-relaxed max-w-md">
                Processe micropagamentos de forma descentralizada usando a rede Base.
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
                  <ul className="ios-caption text-gray-400 space-y-1">
                    <li>• VITE_THIRDWEB_SECRET_KEY</li>
                    <li>• VITE_X402_SERVER_WALLET_ADDRESS</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Payment Card - Wide */}
              <div className="ios-card mb-4 p-5 spring-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-base font-semibold text-white mb-4">Exemplo de Pagamento</h3>
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

              {/* Features Grid - 3 Column */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="ios-card p-4 text-center spring-in" style={{ animationDelay: '0.2s' }}>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-mono">↯</span>
                  </div>
                  <p className="ios-caption text-gray-300 font-medium">Rápido</p>
                </div>
                <div className="ios-card p-4 text-center spring-in" style={{ animationDelay: '0.3s' }}>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-mono">⊚</span>
                  </div>
                  <p className="ios-caption text-gray-300 font-medium">Seguro</p>
                </div>
                <div className="ios-card p-4 text-center spring-in" style={{ animationDelay: '0.4s' }}>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-mono">⬡</span>
                  </div>
                  <p className="ios-caption text-gray-300 font-medium">Base</p>
                </div>
              </div>

              {/* Result Card - Wide */}
              {result && (
                <div className={`ios-card mb-4 p-5 spring-in ${
                  result.success ? 'border-green-500/30' : 'border-red-500/30'
                }`} style={{ animationDelay: '0.5s' }}>
                  <h3 className="text-base font-semibold mb-3">
                    {result.success ? "⦾ Sucesso" : "⤫ Erro"}
                  </h3>
                  <pre className="bg-black/40 border border-white/10 rounded-lg p-4 text-xs overflow-x-auto font-mono text-gray-300">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}

              {/* Info Card - Wide */}
              <div className="ios-card p-5 mb-4 spring-in" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-mono">⟡</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white mb-2">Sobre x402</h3>
                    <p className="ios-caption text-gray-400 leading-relaxed">
                      Configure o <code className="bg-black/40 px-1.5 py-0.5 rounded text-xs">VITE_THIRDWEB_SECRET_KEY</code> e
                      <code className="bg-black/40 px-1.5 py-0.5 rounded text-xs">VITE_X402_SERVER_WALLET_ADDRESS</code> no arquivo <code className="bg-black/40 px-1.5 py-0.5 rounded text-xs">.env</code>
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

