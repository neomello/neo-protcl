import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import BottomNavigation from '../../components/BottomNavigation';
import Footer from '../../components/Footer';
import { useDesktopBlock } from '../../hooks/useDesktopBlock';

export default function ProjectPage() {
  useDesktopBlock();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      className="min-h-screen bg-black relative overflow-hidden pb-16 safe-area-inset"
      style={{ paddingBottom: `calc(80px + env(safe-area-inset-bottom))` }}
    >
      {/* Fundo minimalista */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black"></div>
      </div>

      <div className="relative z-10">
        {/* Status Bar Spacer */}
        <div className="ios-status-bar"></div>

        <Navbar />

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 pt-safe">
          
          {/* Hero Section - Project Info */}
          <div className="ios-card mb-4 p-6 spring-in">
            <div className="flex flex-col items-center text-center mb-6">
              <h1 className="ios-headline text-white mb-2">NEØ Protocol</h1>
              <p className="ios-body text-gray-400 mb-4">
                Verified ERC-20 project. Actively maintained.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                  Active
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/30">
                  Maintained
                </span>
              </div>

              <div className="w-full space-y-3 mt-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-800">
                  <span className="text-sm text-gray-400">Network</span>
                  <span className="text-sm text-white font-mono">Ethereum Mainnet</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-800">
                  <span className="text-sm text-gray-400">Contract</span>
                  <a 
                    href="https://etherscan.io/address/0x53c407bdea9b336b2b15995d0765876e702f16af" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-cyan-400 hover:text-cyan-300 font-mono break-all"
                  >
                    0x53c4...16af
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Identity Proof Section */}
          <div className="ios-card mb-4 p-6 spring-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-lg font-semibold text-white mb-4">On-Chain Identity Proof</h2>
            
            <div className="bg-black/50 rounded-lg p-4 border border-gray-800 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">ENS</span>
                <span className="text-lg font-mono text-cyan-400">neoprotocol.eth</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-800">
                <span className="text-xs text-gray-500">Resolve to</span>
                <span className="text-xs font-mono text-gray-300 break-all">
                  0x86fA14CE610C184f308F7647ca5De04c37663118
                </span>
              </div>
            </div>

            <a
              href="https://app.ens.domains/neoprotocol.eth"
              target="_blank"
              rel="noopener noreferrer"
              className="ios-button-primary w-full text-center block"
            >
              View on ENS / Etherscan
            </a>
          </div>

          {/* Verification & References */}
          <div className="ios-card mb-4 p-6 spring-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-lg font-semibold text-white mb-4">Verification & References</h2>
            
            <div className="space-y-3 mb-4">
              <a
                href="https://etherscan.io/address/0x53c407bdea9b336b2b15995d0765876e702f16af#code"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 px-4 bg-black/50 rounded-lg border border-gray-800 hover:border-cyan-500/30 transition-colors"
              >
                <span className="text-sm text-white">Etherscan – Contract (verified source)</span>
                <span className="text-cyan-400">→</span>
              </a>
              
              <a
                href="https://app.ens.domains/neoprotocol.eth"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 px-4 bg-black/50 rounded-lg border border-gray-800 hover:border-cyan-500/30 transition-colors"
              >
                <span className="text-sm text-white">ENS profile</span>
                <span className="text-cyan-400">→</span>
              </a>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              Source verified on Etherscan. No on-chain ownership model. Maintained by NEØ Protocol.
            </p>
          </div>

          {/* Maintainer Statement */}
          <div className="ios-card mb-4 p-6 spring-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-lg font-semibold text-white mb-4">Maintainer Statement</h2>
            <p className="text-sm text-gray-300 leading-relaxed font-mono">
              This contract does not implement ownership. NEØ Protocol maintains documentation, metadata and public references.
            </p>
          </div>

          {/* Contact */}
          <div className="ios-card mb-4 p-6 spring-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-lg font-semibold text-white mb-4">Institutional Contact</h2>
            <a
              href="mailto:neo@neoprotocol.space"
              className="text-cyan-400 hover:text-cyan-300 text-sm font-mono"
            >
              neo@neoprotocol.space
            </a>
          </div>

          {/* Footer Spacer */}
          <div className="h-4"></div>

        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
