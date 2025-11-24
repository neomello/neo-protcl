import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConnectButton from '../../components/WalletConnect/ConnectButton';

const phrases = [
  "nada aqui está pronto. tudo está plugado.",
  "feito em rede, não em linha de produção.",
  "isso não é produto. é processo.",
  "infraestrutura viva em execução.",
  "sempre em estado beta."
];

export default function NeoProtocol() {
  const fullText = 'NΞØ Protocol';
  const [typedText, setTypedText] = useState('');
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const rotate = setInterval(() => {
      setCurrentPhrase((prev) => {
        const i = phrases.indexOf(prev);
        return phrases[(i + 1) % phrases.length];
      });
    }, 5000);
    return () => clearInterval(rotate);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white safe-area-inset">
      {/* 🧠 HERO - Mobile First */}
      <section className="relative py-12 px-4 pt-safe pb-safe">
        <div className="max-w-full mx-auto text-center">
          <div className="mb-6 animate-pulse">
            <img 
              src="/logos/neo_ico.png" 
              alt="NΞØ Protocol" 
              className="w-24 h-24 mx-auto mb-4"
              loading="eager"
            />
          </div>

          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent neon-text px-4">
            {typedText}
          </h1>

          <h2 className="text-xl font-medium mb-4 text-gray-300 px-4">
            é uma nova forma de existir em rede.
          </h2>

          <div className="px-4 space-y-4 mb-6 text-sm leading-relaxed text-gray-400">
            <p>
              Quando você vê o selo "Desenvolvido por NΞØ Protocol", está diante de um sistema simbólico e tecnológico que rompe com a lógica centralizada das plataformas tradicionais.
            </p>

            <p>
              O protocolo é <strong className="text-white">open source</strong> por princípio e <strong className="text-white">Web3</strong> por arquitetura. Sua empresa não precisa ficar presa a <strong className="text-white">Big Techs</strong>. Ela pode se tornar uma <strong className="text-white">rede própria</strong> — com regras públicas, autonomia digital e soberania simbólica.
            </p>
          </div>

          {/* 🔐 MCP + Thirdweb Wallet - Mobile Optimized */}
          <div className="flex justify-center mt-6 px-4">
            <div className="w-full max-w-sm bg-gray-900/40 border border-gray-700 rounded-2xl p-5 shadow-lg">
              <h3 className="text-base font-semibold mb-4 text-gray-300">Conectar Wallet</h3>
              <ConnectButton />
            </div>
          </div>
        </div>
      </section>

      {/* 📰 MANIFESTO - Mobile First */}
      <section className="py-12 px-4 bg-gray-900/50">
        <div className="max-w-full mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center px-4">
            📰 MANIFESTO PÚBLICO
          </h2>

          <div className="space-y-4 text-sm leading-relaxed px-4">
            <p>
              Uma <strong>DAO (Organização Autônoma Descentralizada)</strong> não pertence a empresas. Não depende de liderança carismática. É movida por <strong>contratos inteligentes</strong>: regras autoexecutáveis registradas em Blockchain, abertas, auditáveis, imutáveis.
            </p>

            <p>
              <strong>NΞØ Protocol</strong> opera sob essa lógica. Nenhum centro de comando. Nenhuma hierarquia vertical.
            </p>

            <p>
              Cada participante é um <strong>nó com voz</strong>. Cada decisão emerge da <strong>inteligência coletiva da rede</strong>.
            </p>

            <p>
              <strong>NΞØ é uma organização sem dono</strong>. Um organismo vivo que aprende, adapta e evolui com quem o habita.
            </p>

            <p>
              Isso não é uma promessa. Isso já está acontecendo — em sistemas reais, em interações invisíveis, em projetos que escolheram se libertar da dependência estrutural.
            </p>

            <p className="text-base font-medium text-blue-400 neon-blue">
              O protocolo já está em curso. E quem acessa, transforma.
            </p>
          </div>
        </div>
      </section>

      {/* ⚙️ COMO FUNCIONA - Mobile First */}
      <section className="py-12 px-4 bg-gray-900/50">
        <div className="max-w-full mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center px-4">
            ⚙️ COMO FUNCIONA
          </h2>

          <h3 className="text-lg font-medium mb-6 text-center text-gray-300 px-4">
            O que significa estar plugado ao NΞØ Protocol?
          </h3>

          <div className="grid grid-cols-1 gap-4 mb-6 px-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full neon-dot"></div>
                <span>Autonomia simbólica e técnica</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full neon-dot"></div>
                <span>Governança descentralizada via DAPP</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full neon-dot"></div>
                <span>Integração opcional com o token $NEØ</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full neon-dot"></div>
                <span>Rede de validação entre projetos independentes</span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4 px-4">
            <p className="text-sm leading-relaxed">
              A integração pode ser <strong className="text-white">simbólica</strong>, <strong className="text-white">técnica</strong> ou <strong className="text-white">total</strong>. Cada projeto decide seu grau de autonomia. Mas todos compartilham o mesmo código: <strong className="text-white">liberdade com responsabilidade</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ⛃ TOKEN - Mobile First */}
      <section className="py-12 px-4">
        <div className="max-w-full mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center px-4">
            ⛃ SOBRE O TOKEN $NΞØ
          </h2>

          <h3 className="text-lg font-medium mb-6 text-center text-gray-300 px-4">
            $NΞØ não é investimento. É infraestrutura simbólica.
          </h3>

          <div className="text-center space-y-4 px-4">
            <p className="text-sm leading-relaxed">
              O token <strong className="text-white">$NΞØ</strong> representa participação, não especulação. Ele permite coordenação de decisões, reconhecimento entre pares e validação simbólica da rede.
            </p>

            <p className="text-base font-medium text-blue-400 neon-blue">
              Não é um ativo. É sua liberdade.
            </p>

            <a 
              href="https://dexscreener.com/base/0x471e78b85b634460c152782667f805310fa66eb850bfda305717836c2ca4f0bb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-orange-600 active:bg-orange-700 rounded-xl font-medium transition-colors touch-manipulation"
            >
              Saiba mais sobre o token →
            </a>
          </div>
        </div>
      </section>

      {/* 🛰️ FOOTER - Mobile First */}
      <footer className="py-8 px-4 border-t border-gray-800 pb-safe">
        <div className="max-w-full mx-auto text-center space-y-2">
          <img 
            src="/logos/neowhite.png" 
            alt="NΞØ Protocol" 
            className="w-20 h-auto mx-auto mb-2"
          />
          <p className="text-gray-400 text-sm">
            ↳ Desenvolvido sob o <strong>NΞØ Protocol</strong>
          </p>
          <p className="text-xs text-gray-500 italic">
            {currentPhrase}
          </p>
          <Link 
            to="/"
            className="inline-block mt-4 px-6 py-3 bg-gray-800 active:bg-gray-700 rounded-lg font-medium transition-colors touch-manipulation"
          >
            ← Voltar
          </Link>
        </div>
      </footer>
    </div>
  );
}

