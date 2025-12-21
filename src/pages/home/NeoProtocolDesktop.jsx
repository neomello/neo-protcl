import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

/**
 * NeoProtocolDesktop - Protocol Shell Frame
 * Fase 0: Corte e Limpeza Radical
 * Alvo: Home Desktop
 */
export default function NeoProtocolDesktop() {
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

          {/* Central Action Area (Placeholder for Command Input - Phase 1) */}
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-2xl w-full border border-gray-800 p-8 bg-gray-900/20 backdrop-blur-sm">
              <div className="mb-4 text-xs text-gray-600">
                [SYSTEM READY] - INPUT REQUIRED
              </div>
              <div className="text-2xl text-gray-400">
                <span className="text-cyan-500 animate-pulse">_</span>
              </div>
            </div>
          </div>

          {/* Bottom Event Stream (Placeholder for Phase 2) */}
          <div className="mt-8 border-t border-gray-900 pt-4">
            <div className="text-[10px] text-gray-700 uppercase mb-2">System Events</div>
            <div className="space-y-1 font-mono text-[11px] text-gray-600">
              <div>> Bootstrap sequence completed.</div>
              <div>> Protocol shell active.</div>
            </div>
          </div>

        </main>

        <Footer />
      </div>
    </div>
  );
}
