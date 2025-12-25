# 💳 Configuração x402 Payments - NΞØ Protocol

## 📋 O que é x402 Payments?

x402 Payments é um sistema de micropagamentos descentralizado da Thirdweb que permite processar pagamentos pequenos de forma eficiente na blockchain, usando a rede Base.

## 🔧 Configuração

### 1. Obter Secret Key do Thirdweb

1. Acesse [thirdweb.com/dashboard](https://thirdweb.com/dashboard)
2. Vá em **Settings > API Keys**
3. Copie o **Secret Key** (não o Client ID)
4. Cole no arquivo `.env`:

```env
VITE_THIRDWEB_SECRET_KEY=seu-secret-key-aqui
```

### 2. Configurar Server Wallet Address

O Server Wallet Address é o endereço da wallet do servidor que facilitará os pagamentos.

```env
VITE_X402_SERVER_WALLET_ADDRESS=0x765B22a98F101a82c071D4C36980B51213B98d4C
```

**Nota**: Use o endereço da sua wallet de servidor. O exemplo acima é apenas um placeholder.

## 📝 Uso no Frontend

### Componente PaymentButton

```jsx
import PaymentButton from '../components/X402/PaymentButton'
;<PaymentButton
  resourceUrl="https://api.example.com/premium-content"
  price="$0.01"
  method="GET"
  onSuccess={result => console.log('Sucesso:', result)}
  onError={error => console.error('Erro:', error)}
>
  Pagar $0.01
</PaymentButton>
```

### Hook useX402Payment

```jsx
import { useX402Payment } from '../hooks/useX402Payment'

const { processPayment, fetchWithPayment, loading, error, isConfigured } = useX402Payment()

// Processar pagamento
const result = await processPayment({
  resourceUrl: 'https://api.example.com/resource',
  method: 'GET',
  paymentData: 'header-x-payment-value',
  price: '$0.01',
})
```

## 🔌 Uso no Backend (Recomendado)

Para processar pagamentos no backend usando a Thirdweb API:

### Exemplo com cURL

```bash
curl -X POST "https://api.thirdweb.com/v1/transactions" \
  -H "Content-Type: application/json" \
  -H "x-secret-key: <your-project-secret-key>" \
  -d '{
    "chainId": "84532",
    "from": "<your-server-wallet-address>",
    "transactions": [
      {
        "type": "contractCall",
        "contractAddress": "0x...",
        "method": "function mintTo(address to, uint256 amount)",
        "params": ["0x...", "100"]
      }
    ]
  }'
```

### Exemplo com settlePayment (Node.js/Edge)

```javascript
import { createThirdwebClient } from 'thirdweb'
import { facilitator, settlePayment } from 'thirdweb/x402'
import { arbitrumSepolia } from 'thirdweb/chains'

const client = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY,
})

const thirdwebX402Facilitator = facilitator({
  client,
  serverWalletAddress: process.env.X402_SERVER_WALLET_ADDRESS,
})

export async function GET(request) {
  const result = await settlePayment({
    resourceUrl: 'https://api.example.com/premium-content',
    method: 'GET',
    paymentData: request.headers.get('x-payment'),
    network: arbitrumSepolia,
    price: '$0.01',
    facilitator: thirdwebX402Facilitator,
  })

  if (result.status === 200) {
    return Response.json({ data: 'premium content' })
  } else {
    return Response.json(result.responseBody, {
      status: result.status,
      headers: result.responseHeaders,
    })
  }
}
```

## 🌐 Rede

O projeto está configurado para usar a rede **Base** (`base`). Se precisar mudar:

1. Atualize `src/providers/X402Provider.jsx`
2. Altere `import { base } from "thirdweb/chains"` para a rede desejada
3. Atualize o `chainId` nas requisições

## 📍 Rotas

- `/x402` - Página de exemplo de x402 Payments

## ⚠️ Importante

- **Secret Key**: Nunca exponha no frontend! Use apenas no backend.
- **Server Wallet**: Deve ter fundos para facilitar pagamentos.
- **Network**: Configure para a rede correta (Base por padrão).

## 🔗 Referências

- [Thirdweb x402 Documentation](https://portal.thirdweb.com/x402)
- [Thirdweb API Reference](https://portal.thirdweb.com/references)
