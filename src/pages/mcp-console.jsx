import { useState, useEffect } from 'react';
import { useMCP } from '../hooks/useMCP';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';

export default function MCPConsole() {
  const { nodes, state, initialized, sendAction, updateState } = useMCP();
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);

  useEffect(() => {
    if (initialized) {
      setOutput(prev => [...prev, { type: 'system', text: '[MCP] Sistema inicializado' }]);
    }
  }, [initialized]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!command.trim()) return;

    setOutput(prev => [...prev, { type: 'input', text: `> ${command}` }]);

    // Processar comando
    const action = sendAction('command', { command });
    setOutput(prev => [...prev, { type: 'output', text: `[MCP] Ação registrada: ${action.id}` }]);

    setCommand('');
    updateState();
  };

  return (
    <div 
      className="min-h-screen bg-black text-green-400 font-mono overflow-x-hidden pb-16 safe-area-inset relative"
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
          
          {/* Hero Card - Console Header */}
          <div className="ios-card mb-4 p-6 spring-in border-green-500/30"
               style={{
                 boxShadow: '0 0 40px rgba(34, 197, 94, 0.2), inset 0 0 30px rgba(34, 197, 94, 0.05)'
               }}>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm flex items-center justify-center ios-shadow-md"
                   style={{
                     boxShadow: '0 0 40px rgba(34, 197, 94, 0.2), inset 0 0 30px rgba(34, 197, 94, 0.05)'
                   }}>
                <span className="text-3xl font-mono">▰</span>
              </div>
              <h1 className="ios-headline text-green-400 mb-2">MCP Console</h1>
              <p className="ios-body text-gray-300 leading-relaxed max-w-md">
                Interface de terminal para interagir com o sistema MCP do Protocolo NΞØ.
              </p>
            </div>
          </div>

          {/* Terminal Output Card - Wide */}
          <div 
            className="ios-card mb-4 p-4 spring-in border-green-500/30" 
            style={{ 
              animationDelay: '0.1s',
              height: '400px',
              minHeight: '400px',
              boxShadow: '0 0 40px rgba(34, 197, 94, 0.15), inset 0 0 40px rgba(34, 197, 94, 0.05)'
            }}>
            <div className="bg-black/60 border border-green-500/30 rounded-lg p-4 h-full overflow-y-auto font-mono">
              {output.length === 0 ? (
                <div className="text-green-400/50 text-sm">Aguardando comandos...</div>
              ) : (
                output.map((item, idx) => (
                  <div key={idx} className={item.type === 'input' ? 'text-green-300' : 'text-green-400'}>
                    {item.text}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Command Input Card */}
          <div className="ios-card mb-4 p-5 spring-in border-green-500/30" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleCommand} className="flex gap-2">
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="flex-1 bg-black/60 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 font-mono"
                placeholder="Digite um comando..."
              />
              <button
                type="submit"
                className="bg-green-400 text-black px-6 py-3 rounded-lg hover:bg-green-300 transition-colors font-mono font-semibold"
              >
                Executar
              </button>
            </form>
          </div>

          {/* Stats Grid - 2 Column */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            
            {/* Nodes Card */}
            <div className="ios-card col-span-1 p-5 spring-in border-green-500/30" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center mb-3 ios-shadow-sm">
                <span className="text-2xl font-mono">⦾</span>
              </div>
              <h3 className="text-base font-semibold text-green-400 mb-2">Nodes Ativos</h3>
              <p className="ios-caption text-gray-400 font-mono text-2xl">{nodes.length}</p>
            </div>

            {/* Status Card */}
            <div className="ios-card col-span-1 p-5 spring-in border-green-500/30" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center mb-3 ios-shadow-sm">
                <span className="text-2xl font-mono">↯</span>
              </div>
              <h3 className="text-base font-semibold text-green-400 mb-2">Status</h3>
              <p className="ios-caption text-green-400 font-mono">
                {initialized ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>

          {/* Nodes List Card - Wide */}
          {nodes.length > 0 && (
            <div className="ios-card mb-4 p-5 spring-in border-green-500/30" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-base font-semibold text-green-400 mb-4 font-mono">Nodes Scanner</h3>
              <div className="space-y-2">
                {nodes.map((node) => (
                  <div key={node.id} className="bg-black/40 border border-green-500/30 rounded-lg p-3">
                    <div className="text-green-300 font-mono text-sm">ID: {node.id}</div>
                    <div className="text-green-400/70 text-xs font-mono">Tipo: {node.type}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* State Debug Card - Wide */}
          {state && (
            <div className="ios-card mb-4 p-5 spring-in border-green-500/30" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-base font-semibold text-green-400 mb-4 font-mono">Estado MCP</h3>
              <pre className="bg-black/40 border border-green-500/30 rounded-lg p-4 text-green-400 text-xs overflow-x-auto font-mono">
                {JSON.stringify(state, null, 2)}
              </pre>
            </div>
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

