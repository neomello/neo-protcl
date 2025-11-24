import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";

/**
 * Botão de conexão de wallet usando Thirdweb
 * O Thirdweb já inclui suporte para múltiplas wallets (MetaMask, WalletConnect, Coinbase, etc)
 */
export default function ConnectButton() {
  const address = useAddress();
  const disconnect = useDisconnect();

  if (address) {
    return (
      <div className="flex flex-col items-center my-6 space-y-3">
        <div className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium w-full text-center">
          ✓ Conectado: {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <button
          onClick={disconnect}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors w-full"
        >
          Desconectar
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-6">
      <ConnectWallet
        theme="dark"
        btnTitle="Conectar Wallet"
        modalTitle="Conectar Wallet"
        modalSize="wide"
        welcomeScreen={{
          title: "Bem-vindo ao NΞØ Protocol",
          subtitle: "Conecte sua wallet para começar"
        }}
        style={{
          width: "100%"
        }}
      />
    </div>
  );
}
