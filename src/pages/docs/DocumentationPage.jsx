import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import BottomNavigation from '../../components/BottomNavigation';
import Footer from '../../components/Footer';
import MermaidDiagram from '../../components/MermaidDiagram';

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('overview');

  // Diagrama Mermaid do PoI
  const poiDiagram = `
flowchart TD
    A["Consciência Latente"] -->|Incomodação| B["Contra o Sistema"]
    B -->|Atrito Real| C{"Intenção Verificável?"}

    C -->|Não| D["Ruído / Consumo Passivo"]
    D -->|Loop Infinito| B

    C -->|Sim| E["Prova de Ação"]
    E --> F["PoI Reconhecido<br/>(NHIP-000 · MCP Context Guard)"]

    F -->|Ancoragem de Estado| G["Registro de Nó<br/>On-Chain<br/>(NHIP-001)"]

    G --> H["Identidade Reputacional"]
    H --> I["Entrada como Nó NΞØ"]
    I --> J["Execução Distribuída"]
    J -->|Impacto Gerado| H

    style A fill:#1e293b,stroke:#64748b,color:#cbd5e1
    style B fill:#7c3aed,stroke:#a78bfa,color:#fff
    style C fill:#0ea5e9,stroke:#38bdf8,color:#fff
    style D fill:#ef4444,stroke:#f87171,color:#fff

    style E fill:#10b981,stroke:#34d399,color:#fff
    style F fill:#22c55e,stroke:#4ade80,color:#0A0A0A,font-weight:bold

    style G fill:#00CFFF,stroke:#00FF99,color:#0A0A0A,font-weight:bold

    style H fill:#00FF99,stroke:#00CFFF,color:#0A0A0A
    style I fill:#7c3aed,stroke:#00FF99,stroke-width:2px,color:#fff
    style J fill:#0ea5e9,stroke:#00CFFF,color:#fff
`;

  const sections = [
    { id: 'overview', title: 'Visão Geral', icon: '📋' },
    { id: 'token', title: 'Token', icon: '🪙' },
    { id: 'nhips', title: 'NHIPs', icon: '📜' },
    { id: 'architecture', title: 'Arquitetura', icon: '🏗️' },
    { id: 'proof-of-intention', title: 'Proof of Intention', icon: '🧬' },
    { id: 'smart-contracts', title: 'Smart Contracts', icon: '📦' },
    { id: 'guides', title: 'Guias', icon: '📚' },
    { id: 'developers', title: 'Developers', icon: '💻' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">Documentação do Protocolo NΞØ</h1>
              <p className="text-gray-300 leading-relaxed mb-6">
                Documentação técnica completa do Protocolo NΞØ, incluindo especificações de protocolo (NHIPs), 
                arquitetura, smart contracts e guias de implementação.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">📜 NHIPs</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Especificações formais do protocolo (NΞØ Hub Intake Protocol)
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <Link to="#nhips" onClick={() => setActiveSection('nhips')} className="text-cyan-400 hover:text-cyan-300">NHIP-000</Link> — Hub Intake Protocol</li>
                  <li>• <Link to="#nhips" onClick={() => setActiveSection('nhips')} className="text-cyan-400 hover:text-cyan-300">NHIP-000a</Link> — PoI Trigger Specification</li>
                  <li>• <Link to="#nhips" onClick={() => setActiveSection('nhips')} className="text-cyan-400 hover:text-cyan-300">NHIP-001</Link> — NodeRegistry.sol</li>
                </ul>
              </div>

              <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">🏗️ Arquitetura</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Estrutura e design do protocolo
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <Link to="#architecture" onClick={() => setActiveSection('architecture')} className="text-cyan-400 hover:text-cyan-300">Proof of Intention Architecture</Link></li>
                  <li>• <Link to="#architecture" onClick={() => setActiveSection('architecture')} className="text-cyan-400 hover:text-cyan-300">MCP Context Guard</Link></li>
                  <li>• <Link to="#architecture" onClick={() => setActiveSection('architecture')} className="text-cyan-400 hover:text-cyan-300">Camadas do Protocolo</Link></li>
                </ul>
              </div>

              <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">📦 Smart Contracts</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Contratos inteligentes do protocolo
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <Link to="#smart-contracts" onClick={() => setActiveSection('smart-contracts')} className="text-cyan-400 hover:text-cyan-300">NodeRegistry.sol</Link></li>
                  <li>• <Link to="#smart-contracts" onClick={() => setActiveSection('smart-contracts')} className="text-cyan-400 hover:text-cyan-300">Auditoria</Link></li>
                  <li>• <Link to="#smart-contracts" onClick={() => setActiveSection('smart-contracts')} className="text-cyan-400 hover:text-cyan-300">Deploy</Link></li>
                </ul>
              </div>

              <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">💻 Developers</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Documentação técnica para desenvolvedores
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <Link to="#developers" onClick={() => setActiveSection('developers')} className="text-cyan-400 hover:text-cyan-300">Quick Start</Link></li>
                  <li>• <Link to="#developers" onClick={() => setActiveSection('developers')} className="text-cyan-400 hover:text-cyan-300">API Reference</Link></li>
                  <li>• <Link to="#developers" onClick={() => setActiveSection('developers')} className="text-cyan-400 hover:text-cyan-300">SDKs e Bibliotecas</Link></li>
                  <li>• <Link to="#developers" onClick={() => setActiveSection('developers')} className="text-cyan-400 hover:text-cyan-300">Exemplos de Código</Link></li>
                </ul>
              </div>

              <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">📚 Guias</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Guias de implementação e uso
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <Link to="#guides" onClick={() => setActiveSection('guides')} className="text-cyan-400 hover:text-cyan-300">NHIP-000 Implementation Guide</Link></li>
                  <li>• <Link to="#guides" onClick={() => setActiveSection('guides')} className="text-cyan-400 hover:text-cyan-300">Mermaid Usage</Link></li>
                  <li>• <Link to="#guides" onClick={() => setActiveSection('guides')} className="text-cyan-400 hover:text-cyan-300">Intent System</Link></li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'token':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">NEØ Token</h1>
              <p className="text-gray-300 leading-relaxed mb-6">
                Documentation about the ERC-20 token of the NEØ Protocol.
              </p>
            </div>

            {/* What is the token */}
            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">What is the token</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                The NEØ token is a verified ERC-20 on the Ethereum Mainnet. It is a reference token 
                of the NEØ Protocol, actively maintained with verified source code on Etherscan.
              </p>
              <div className="bg-black/50 rounded p-3 border border-gray-700">
                <div className="font-mono text-xs text-gray-300 space-y-1">
                  <div><span className="text-cyan-400">Contract Address:</span> <span className="text-gray-400">0x53c407bdea9b336b2b15995d0765876e702f16af</span></div>
                  <div><span className="text-cyan-400">Network:</span> <span className="text-gray-400">Ethereum Mainnet</span></div>
                  <div><span className="text-cyan-400">Standard:</span> <span className="text-gray-400">ERC-20</span></div>
                  <div><span className="text-cyan-400">Status:</span> <span className="text-green-400">Verified</span></div>
                </div>
              </div>
            </div>

            {/* What it is not */}
            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">What it is not</h2>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span><strong className="text-white">Not a utility token:</strong> The token does not confer usage rights or access to protocol functionalities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span><strong className="text-white">Not a governance token:</strong> The token does not confer voting rights or governance over the protocol.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span><strong className="text-white">No on-chain ownership model:</strong> The contract does not implement ownership or control functions.</span>
                </li>
              </ul>
            </div>

            {/* Current usage */}
            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Current usage</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                The NEØ token serves as an on-chain reference for the NEØ Protocol. Currently:
              </p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Project identification and verification on the blockchain</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Identity anchoring via ENS (neoprotocol.eth)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Public reference for documentation and metadata</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Proof of active project maintenance</span>
                </li>
              </ul>
            </div>

            {/* Next steps */}
            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Next steps</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Technical roadmap for the token and protocol:
              </p>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>Continuous maintenance of documentation and public references</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>Metadata updates as needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>Expansion of on-chain and off-chain references</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>Integration with verification and auditing systems</span>
                </li>
              </ul>
            </div>

            {/* Useful links */}
            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">References</h2>
              <div className="space-y-2">
                <a
                  href="https://etherscan.io/address/0x53c407bdea9b336b2b15995d0765876e702f16af"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 px-3 bg-black/50 rounded border border-gray-700 hover:border-cyan-500/30 transition-colors"
                >
                  <span className="text-sm text-white">Etherscan Contract</span>
                  <span className="text-cyan-400 text-xs">→</span>
                </a>
                <a
                  href="https://app.ens.domains/neoprotocol.eth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 px-3 bg-black/50 rounded border border-gray-700 hover:border-cyan-500/30 transition-colors"
                >
                  <span className="text-sm text-white">ENS Profile</span>
                  <span className="text-cyan-400 text-xs">→</span>
                </a>
                <a
                  href="https://www.neoprotocol.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 px-3 bg-black/50 rounded border border-gray-700 hover:border-cyan-500/30 transition-colors"
                >
                  <span className="text-sm text-white">Official Site</span>
                  <span className="text-cyan-400 text-xs">→</span>
                </a>
              </div>
            </div>
          </div>
        );

      case 'nhips':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">NHIPs — NΞØ Hub Intake Protocol</h1>
              <p className="text-gray-300 leading-relaxed mb-6">
                Especificações formais do protocolo. Cada NHIP define um aspecto crítico do funcionamento do NΞØ.
              </p>
            </div>

            <div className="space-y-6">
              {/* NHIP-000 */}
              <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">NHIP-000</h2>
                    <p className="text-gray-400 text-sm">NΞØ Hub Intake Protocol</p>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">Ativo</span>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Protocolo Genesis para entrada de nós no ecossistema NΞØ. Define o mecanismo de apresentação, 
                  validação via MCP Context Guard e handshake em 4 etapas.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded">Off-Chain</span>
                  <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded">MCP</span>
                  <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded">Handshake</span>
                </div>
              </div>

              {/* NHIP-000a */}
              <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">NHIP-000a</h2>
                    <p className="text-gray-400 text-sm">Proof of Intention Trigger Specification</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full">Congelado</span>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Especificação formal do gatilho do PoI. Define os 5 critérios obrigatórios, modelo de threshold 
                  e relação com NHIP-001. Este documento congela o protocolo contra deriva técnica e social.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded">PoI</span>
                  <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded">Threshold</span>
                  <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded">Off-Chain</span>
                </div>
              </div>

              {/* NHIP-001 */}
              <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">NHIP-001</h2>
                    <p className="text-gray-400 text-sm">NodeRegistry.sol</p>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">Implementável</span>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Contrato inteligente minimalista para registro on-chain de nós. O contrato não valida intenção, 
                  apenas ancora estados já reconhecidos via NHIP-000. Apenas o Guardian pode registrar.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded">On-Chain</span>
                  <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded">Solidity</span>
                  <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded">Guardian</span>
                </div>
                <div className="bg-black/50 rounded p-3 font-mono text-xs text-gray-400">
                  <div>contract NodeRegistry</div>
                  <div className="mt-2 text-cyan-400">function registerNode(address, domain)</div>
                  <div className="text-gray-500">function deactivateNode(address)</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'architecture':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">Arquitetura do Protocolo</h1>
              <p className="text-gray-300 leading-relaxed mb-6">
                O Protocolo NΞØ opera em camadas separadas: semântica off-chain, validação contextual e ancoragem on-chain.
              </p>
            </div>

            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Arquitetura em 3 Camadas</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-cyan-400 pl-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Camada 1 — PoI Semântico (Off-Chain)</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Apresentação, coerência ontológica, MCP Context Guard, validação de intenção real. 
                    Governado pelo NHIP-000.
                  </p>
                </div>
                <div className="border-l-4 border-green-400 pl-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Camada 2 — PoI Operacional</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Handshake, atribuição de role, permissões iniciais, entrada como nó observador. 
                    Determinístico e auditável.
                  </p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Camada 3 — PoI Ancorado (On-Chain)</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Smart contract NodeRegistry.sol (NHIP-001). Não decide, apenas sela estados já reconhecidos.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Princípios Arquiteturais</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span><strong className="text-white">Minimalismo radical:</strong> Menos lógica = menos superfícies de ataque</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span><strong className="text-white">Separação de camadas:</strong> Semântica fora da blockchain. Estado dentro.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span><strong className="text-white">Autoridade explícita:</strong> Apenas o Nó Guardião pode registrar</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span><strong className="text-white">Imutabilidade histórica:</strong> Nada é apagado. Apenas desativado.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span><strong className="text-white">Neutralidade ontológica:</strong> O contrato não julga. Apenas registra.</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'proof-of-intention':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">Proof of Intention (PoI)</h1>
              <p className="text-gray-300 leading-relaxed mb-6">
                O PoI não é um evento, não é um pedido, não é um direito. É um estado emergente reconhecido 
                pelo sistema quando uma entidade atravessa um limiar semântico-operacional.
              </p>
            </div>

            {/* Diagrama Mermaid */}
            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Fluxo do Proof of Intention</h2>
              <div className="bg-black/50 rounded-lg p-4 border border-cyan-500/20">
                <MermaidDiagram diagram={poiDiagram} />
              </div>
              <p className="text-gray-400 text-sm mt-4">
                O diagrama mostra o fluxo completo: da consciência latente até a execução distribuída, 
                passando pelo reconhecimento off-chain (NHIP-000) e ancoragem on-chain (NHIP-001).
              </p>
            </div>

            {/* Critérios do Gatilho */}
            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Critérios do Gatilho (NHIP-000a)</h2>
              <p className="text-gray-300 mb-4 text-sm">
                O gatilho do PoI é ativado quando <strong className="text-white">todos</strong> os critérios abaixo são satisfeitos:
              </p>
              <ol className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">1.</span>
                  <span><strong className="text-white">Declaração de Intent Válida:</strong> Intent permitida declarada explicitamente</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">2.</span>
                  <span><strong className="text-white">Ação Verificável Associada:</strong> Intent ligada a ação real, observável e verificável</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">3.</span>
                  <span><strong className="text-white">Coerência de Contexto:</strong> Contexto coerente com domínio, histórico e ontologia</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">4.</span>
                  <span><strong className="text-white">Ausência de Violação Ontológica:</strong> Nenhuma tentativa de centralizar, burlar ou misturar domínios</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">5.</span>
                  <span><strong className="text-white">Threshold de Impacto Mínimo:</strong> PoI_Threshold ≥ T_min (70)</span>
                </li>
              </ol>
            </div>

            {/* O que o PoI não é */}
            <div className="bg-[#1B1B1B] border border-red-500/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">O que o PoI NÃO é</h2>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>PoI permissionless</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>PoI automático on-chain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>PoI por pagamento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>PoI por voto ou indicação social</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>PoI explicado em onboarding</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'smart-contracts':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">Smart Contracts</h1>
              <p className="text-gray-300 leading-relaxed mb-6">
                Contratos inteligentes do Protocolo NΞØ. Minimalistas, seguros e auditados.
              </p>
            </div>

            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">NodeRegistry.sol</h2>
              <p className="text-gray-300 mb-4 text-sm">
                <strong className="text-white">Versão:</strong> Solidity ^0.8.20<br />
                <strong className="text-white">Compatibilidade:</strong> Base / Polygon / EVM padrão<br />
                <strong className="text-white">NHIP:</strong> 001
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Funções Principais</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="bg-black/50 rounded p-3 border border-gray-700">
                  <div className="text-cyan-400">function registerNode(</div>
                  <div className="text-gray-400 ml-4">address nodeAddress,</div>
                  <div className="text-gray-400 ml-4">string calldata domain</div>
                  <div className="text-cyan-400">) external onlyGuardian</div>
                </div>
                <div className="bg-black/50 rounded p-3 border border-gray-700">
                  <div className="text-cyan-400">function deactivateNode(</div>
                  <div className="text-gray-400 ml-4">address nodeAddress</div>
                  <div className="text-cyan-400">) external onlyGuardian</div>
                </div>
                <div className="bg-black/50 rounded p-3 border border-gray-700">
                  <div className="text-cyan-400">function isRegistered(</div>
                  <div className="text-gray-400 ml-4">address nodeAddress</div>
                  <div className="text-cyan-400">) external view returns (bool)</div>
                </div>
                <div className="bg-black/50 rounded p-3 border border-gray-700">
                  <div className="text-cyan-400">function getNode(</div>
                  <div className="text-gray-400 ml-4">address nodeAddress</div>
                  <div className="text-cyan-400">) external view returns (Node memory)</div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Eventos</h3>
              <div className="space-y-2 font-mono text-sm text-gray-300">
                <div>event NodeRegistered(address indexed nodeAddress, string domain, uint256 registeredAt)</div>
                <div>event NodeDeactivated(address indexed nodeAddress, uint256 deactivatedAt)</div>
              </div>

              <h3 className="text-lg font-semibold text-white mt-6 mb-3">Auditoria</h3>
              <div className="bg-green-500/10 border border-green-500/20 rounded p-4">
                <p className="text-green-400 text-sm font-semibold mb-2">✅ Status: Conforme</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>✓ Não tem função pública de auto-registro</li>
                  <li>✓ Não tem lógica de validação de intenção</li>
                  <li>✓ Não tem dependência de inputs humanos semânticos</li>
                  <li>✓ Tem função externa chamável após o gatilho</li>
                  <li>✓ Tem autoridade clara (guardian)</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'guides':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">Guias de Implementação</h1>
              <p className="text-gray-300 leading-relaxed mb-6">
                Guias práticos para implementar e usar o Protocolo NΞØ.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-3">NHIP-000 Implementation Guide</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Guia completo para implementar o ponto de entrada do NHIP-000. O NHIP-000 não ensina, ele testa.
                </p>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3 text-sm">
                  <p className="text-yellow-400 font-semibold mb-2">⚠️ Princípio Fundamental</p>
                  <p className="text-gray-300">
                    Se alguém precisa de um botão "o que é", ainda não é um nó. O NHIP-000 não converte. Ele reconhece.
                  </p>
                </div>
              </div>

              <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-3">Mermaid Usage</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Como usar diagramas Mermaid no projeto. O componente MermaidDiagram já está configurado 
                  com o tema escuro do NΞØ Protocol.
                </p>
                <div className="bg-black/50 rounded p-3 font-mono text-xs text-gray-400">
                  <div>import MermaidDiagram from '../components/MermaidDiagram';</div>
                  <div className="mt-2">&lt;MermaidDiagram diagram={'{poiDiagram}'} /&gt;</div>
                </div>
              </div>

              <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-3">Intent System</h2>
                <p className="text-gray-300 text-sm mb-4">
                  Sistema de mapeamento morfológico de intenções. Não mapeia quem você é, 
                  revela como você opera no campo simbólico.
                </p>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Três dimensões: Resolução, Colaboração, Criação</li>
                  <li>• Análise por keywords e ressonância</li>
                  <li>• Geração de padrão integrado (sinergia)</li>
                  <li>• Diagrama Mermaid automático</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'developers':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">Documentação para Developers</h1>
              <p className="text-gray-300 leading-relaxed mb-6">
                Recursos técnicos, APIs, SDKs e exemplos de código para integrar com o Protocolo NΞØ.
              </p>
            </div>

            {/* Quick Start */}
            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">🚀 Quick Start</h2>
              <p className="text-gray-300 text-sm mb-4">
                Comece a integrar com o Protocolo NΞØ em minutos.
              </p>
              <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                <div className="font-mono text-sm text-gray-300 space-y-2">
                  <div className="text-cyan-400"># Instalar dependências</div>
                  <div className="text-gray-400">npm install @neoprotocol/sdk</div>
                  <div className="text-cyan-400 mt-4"># Ou via yarn</div>
                  <div className="text-gray-400">yarn add @neoprotocol/sdk</div>
                </div>
              </div>
              <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded p-3 text-sm">
                <p className="text-blue-400 font-semibold mb-2">ℹ️ Em Desenvolvimento</p>
                <p className="text-gray-300">
                  O SDK oficial está em desenvolvimento. Esta seção será atualizada em breve.
                </p>
              </div>
            </div>

            {/* API Reference */}
            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">📡 API Reference</h2>
              <p className="text-gray-300 text-sm mb-4">
                Referência completa da API do Protocolo NΞØ.
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-cyan-400 pl-4">
                  <h3 className="text-lg font-semibold text-white mb-2">MCP Context Guard API</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Endpoints para validação de nós e intents via MCP Context Guard.
                  </p>
                  <div className="bg-black/50 rounded p-3 font-mono text-xs">
                    <div className="text-green-400">POST</div>
                    <div className="text-gray-300">/api/mcp/validate-node</div>
                  </div>
                </div>

                <div className="border-l-4 border-green-400 pl-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Node Registry API</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Consulta ao registro on-chain de nós (NodeRegistry.sol).
                  </p>
                  <div className="bg-black/50 rounded p-3 font-mono text-xs">
                    <div className="text-blue-400">GET</div>
                    <div className="text-gray-300">/api/nodes/{'{address}'}</div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-400 pl-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Intent System API</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Endpoints para o sistema de mapeamento de intenções.
                  </p>
                  <div className="bg-black/50 rounded p-3 font-mono text-xs">
                    <div className="text-yellow-400">POST</div>
                    <div className="text-gray-300">/api/intent/analyze</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded p-3 text-sm">
                <p className="text-blue-400 font-semibold mb-2">ℹ️ Em Desenvolvimento</p>
                <p className="text-gray-300">
                  A documentação completa da API será disponibilizada em breve.
                </p>
              </div>
            </div>

            {/* SDKs */}
            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">📦 SDKs e Bibliotecas</h2>
              <p className="text-gray-300 text-sm mb-4">
                Bibliotecas oficiais e comunitárias para diferentes linguagens e frameworks.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">JavaScript/TypeScript</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    SDK oficial para Node.js e browsers
                  </p>
                  <div className="font-mono text-xs text-gray-300">
                    <div>npm: @neoprotocol/sdk</div>
                    <div className="text-gray-500 mt-1">Status: Em desenvolvimento</div>
                  </div>
                </div>

                <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Python</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    SDK para integração Python
                  </p>
                  <div className="font-mono text-xs text-gray-300">
                    <div>pip: neoprotocol-sdk</div>
                    <div className="text-gray-500 mt-1">Status: Planejado</div>
                  </div>
                </div>

                <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Rust</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    SDK nativo em Rust
                  </p>
                  <div className="font-mono text-xs text-gray-300">
                    <div>cargo: neoprotocol</div>
                    <div className="text-gray-500 mt-1">Status: Planejado</div>
                  </div>
                </div>

                <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">React Hooks</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Hooks React para integração frontend
                  </p>
                  <div className="font-mono text-xs text-gray-300">
                    <div>npm: @neoprotocol/react</div>
                    <div className="text-gray-500 mt-1">Status: Em desenvolvimento</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Examples */}
            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">💻 Exemplos de Código</h2>
              <p className="text-gray-300 text-sm mb-4">
                Exemplos práticos de integração com o protocolo.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Registrar Nó (MCP Context)</h3>
                  <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                    <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
{`import { acknowledgeNodeOffChain } from '@neoprotocol/mcp';

const node = await acknowledgeNodeOffChain({
  identity: 'my-node',
  domain: 'my-domain.eth',
  intent: 'apresentacao',
  version: '1.0'
});

console.log('Nó reconhecido:', node.id);`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Verificar Registro On-Chain</h3>
                  <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                    <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
{`import { NodeRegistry } from '@neoprotocol/contracts';

const registry = new NodeRegistry(contractAddress);
const isRegistered = await registry.isRegistered(nodeAddress);
const nodeData = await registry.getNode(nodeAddress);

console.log('Registrado:', isRegistered);
console.log('Dados:', nodeData);`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Analisar Intenção</h3>
                  <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                    <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
{`import { analyzeText } from '@neoprotocol/intent';

const result = await analyzeText({
  text: 'Desmonto o problema em partes...',
  dimension: 'problem_solving'
});

console.log('Arquétipo:', result.archetype);
console.log('Intenção:', result.intent);`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Integration Guides */}
            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">🔌 Guias de Integração</h2>
              <p className="text-gray-300 text-sm mb-4">
                Guias passo a passo para integrar o Protocolo NΞØ em diferentes contextos.
              </p>

              <div className="space-y-3">
                <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-base font-semibold text-white mb-2">Integração com React</h3>
                  <p className="text-gray-400 text-sm">
                    Como usar o Protocolo NΞØ em aplicações React
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded">
                    Em breve
                  </span>
                </div>

                <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-base font-semibold text-white mb-2">Integração com Next.js</h3>
                  <p className="text-gray-400 text-sm">
                    Setup completo para projetos Next.js
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded">
                    Em breve
                  </span>
                </div>

                <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-base font-semibold text-white mb-2">Integração com Smart Contracts</h3>
                  <p className="text-gray-400 text-sm">
                    Como interagir com NodeRegistry.sol via Web3
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded">
                    Em breve
                  </span>
                </div>

                <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-base font-semibold text-white mb-2">Integração com MCP</h3>
                  <p className="text-gray-400 text-sm">
                    Como usar o MCP Context Guard em seu projeto
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded">
                    Em breve
                  </span>
                </div>
              </div>
            </div>

            {/* Testing */}
            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">🧪 Testing</h2>
              <p className="text-gray-300 text-sm mb-4">
                Ferramentas e guias para testar integrações com o protocolo.
              </p>

              <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                <h3 className="text-base font-semibold text-white mb-3">Testnet</h3>
                <div className="font-mono text-xs text-gray-300 space-y-2">
                  <div>
                    <span className="text-cyan-400">Testnet URL:</span>
                    <span className="text-gray-400 ml-2">https://testnet.neoprotocol.eth</span>
                  </div>
                  <div>
                    <span className="text-cyan-400">Chain ID:</span>
                    <span className="text-gray-400 ml-2">TBD</span>
                  </div>
                  <div>
                    <span className="text-cyan-400">RPC Endpoint:</span>
                    <span className="text-gray-400 ml-2">TBD</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded p-3 text-sm">
                <p className="text-blue-400 font-semibold mb-2">ℹ️ Em Desenvolvimento</p>
                <p className="text-gray-300">
                  A testnet e ferramentas de teste serão disponibilizadas em breve.
                </p>
              </div>
            </div>

            {/* Contributing */}
            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">🤝 Contribuindo</h2>
              <p className="text-gray-300 text-sm mb-4">
                Como contribuir com código, documentação ou melhorias para o protocolo.
              </p>

              <div className="space-y-3">
                <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-base font-semibold text-white mb-2">Repositório</h3>
                  <div className="font-mono text-xs text-gray-300">
                    <div className="text-cyan-400">GitHub:</div>
                    <div className="text-gray-400 mt-1">github.com/neoprotocol/neo-protcl</div>
                  </div>
                </div>

                <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-base font-semibold text-white mb-2">Propondo NHIPs</h3>
                  <p className="text-gray-400 text-sm">
                    Para propor melhorias ao protocolo, siga o formato NHIP e abra uma issue no repositório.
                  </p>
                </div>

                <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-base font-semibold text-white mb-2">Reportar Bugs</h3>
                  <p className="text-gray-400 text-sm">
                    Use o template de bug report no GitHub Issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 pb-16 safe-area-inset">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-[#1B1B1B] border border-gray-800 rounded-lg p-4 sticky top-20">
              <h2 className="text-lg font-semibold text-white mb-4">Documentação</h2>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6 lg:p-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      <BottomNavigation />
    </div>
  );
}
