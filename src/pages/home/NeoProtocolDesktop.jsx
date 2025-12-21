import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CommandInput from '../../components/CommandInput';

/**
 * NeoProtocolDesktop - Protocol Shell Frame
 * Fase 1: Protocol Shell Mínimo
 * Alvo: Home Desktop
 */
export default function NeoProtocolDesktop() {
  const [events, setEvents] = useState([
    { id: 1, text: 'Bootstrap sequence completed.' },
    { id: 2, text: 'Protocol shell active.' }
  ]);

  const handleCommand = (cmd) => {
    const timestamp = new Date().toLocaleTimeString();
    setEvents(prev => [
      ...prev,
      { id: Date.now(), text: `CMD: ${cmd.toUpperCase()}` },
      { id: Date.now() + 1, text: `SYS: [${timestamp}] NOT_IMPLEMENTED` }
    ]);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-hidden relative font-mono">
      {/* Background Layer: Minimal/Static */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)',
          backgroundSize: '40px 40px' 
        }}></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        <Navbar />

        {/* Main Operational Area */}
        <main className="flex-1 flex flex-col p-6 overflow-hidden">
          
          {/* Top Telemetry Bar (Placeholder for Phase 2) */}
          <div className="flex justify-between items-start mb-8 text-[10px] uppercase tracking-widest text-gray-500">
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span>Network Status</span>
                <span className="text-gray-700">Waiting initialization...</span>
              </div>
              <div className="flex flex-col">
                <span>MCP Router</span>
                <span className="text-gray-700">Offline</span>
              </div>
            </div>
            <div className="text-right flex flex-col">
              <span>Local Identity</span>
              <span className="text-gray-700">Not Detected</span>
            </div>
          </div>

          {/* Central Action Area (Protocol Input) */}
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-2xl w-full border border-gray-800 p-8 bg-gray-900/20 backdrop-blur-sm">
              <div className="mb-4 text-xs text-gray-600 uppercase tracking-widest">
                [SYSTEM READY] - INPUT REQUIRED
              </div>
              <CommandInput onCommand={handleCommand} />
            </div>
          </div>

          {/* Bottom Event Stream (Phase 2 state binding) */}
          <div className="mt-8 border-t border-gray-900 pt-4">
            <div className="text-[10px] text-gray-700 uppercase mb-2 tracking-[0.2em]">System Events</div>
            <div className="space-y-1 font-mono text-[11px] text-gray-600 h-24 overflow-y-auto">
              {events.map(event => (
                <div key={event.id}>&gt; {event.text}</div>
              ))}
            </div>
          </div>

        </main>

        <Footer />
      </div>
    </div>
  );
}
