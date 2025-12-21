import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/Navbar';
import BottomNavigation from '../../components/BottomNavigation';
import Footer from '../../components/Footer';

/**
 * NeoProtocolMobile - Protocol Shell Frame
 * Fase 0: Corte e Limpeza Radical
 * Alvo: Home Mobile
 */
export default function NeoProtocolMobile() {
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartY = useRef(0);
  const containerRef = useRef(null);

  // Pull to Refresh logic (infrastructure maintained)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (window.scrollY === 0 && touchStartY.current > 0) {
        const distance = e.touches[0].clientY - touchStartY.current;
        if (distance > 0) {
          setPullDistance(Math.min(distance, 80));
        }
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > 50) {
        window.location.reload();
      }
      setPullDistance(0);
      touchStartY.current = 0;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black text-gray-100 overflow-x-hidden pb-16 safe-area-inset relative font-mono"
      style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
    >
      {/* Background Layer: Minimal/Static */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #333 1px, transparent 0)',
          backgroundSize: '30px 30px' 
        }}></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="ios-status-bar"></div>
        <Navbar />

        {/* Main Operational Area */}
        <main className="flex-1 flex flex-col p-4 pt-safe overflow-hidden">
          
          {/* Mobile Telemetry Grid (Placeholder for Phase 2) */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-[9px] uppercase tracking-widest text-gray-500">
            <div className="flex flex-col border-l border-gray-800 pl-2">
              <span>Network</span>
              <span className="text-gray-700">Waiting...</span>
            </div>
            <div className="flex flex-col border-l border-gray-800 pl-2">
              <span>MCP</span>
              <span className="text-gray-700">Offline</span>
            </div>
            <div className="flex flex-col border-l border-gray-800 pl-2">
              <span>Node</span>
              <span className="text-gray-700">Unknown</span>
            </div>
            <div className="flex flex-col border-l border-gray-800 pl-2">
              <span>Local</span>
              <span className="text-gray-700">No Key</span>
            </div>
          </div>

          {/* Central Action Area (Touch Optimized) */}
          <div className="flex-1 flex items-center justify-center py-4">
            <div className="w-full border border-gray-800 p-6 bg-gray-900/20 backdrop-blur-sm">
              <div className="mb-3 text-[10px] text-gray-600">
                [SYSTEM READY] - COMMAND REQUIRED
              </div>
              <div className="text-xl text-gray-400">
                <span className="text-cyan-500 animate-pulse">_</span>
              </div>
            </div>
          </div>

          {/* Bottom Event Log (Minimal for Mobile) */}
          <div className="mt-6 border-t border-gray-900 pt-3 mb-4">
            <div className="text-[9px] text-gray-700 uppercase mb-2">System Stream</div>
            <div className="space-y-1 text-[10px] text-gray-600">
              <div>> Bootstrap complete.</div>
              <div>> Shell active.</div>
            </div>
          </div>

        </main>

        <Footer />
      </div>

      {/* Persistent Navigation */}
      <BottomNavigation />
    </div>
  );
}
