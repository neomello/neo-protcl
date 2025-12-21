# 🗺️ Rotas do NΞØ Protocol

Documento completo de todas as rotas disponíveis no projeto.

**Última atualização:** 2025-01-27

---

## 📋 Índice

1. [Rotas React Router (Ativas)](#rotas-react-router-ativas)
2. [Rotas HTML Estáticas](#rotas-html-estáticas)
3. [Rotas Desabilitadas/Comentadas](#rotas-desabilitadascomentadas)
4. [Proteção Desktop](#proteção-desktop)
5. [Navegação](#navegação)

---

## 🚀 Rotas React Router (Ativas)

Todas as rotas abaixo são gerenciadas pelo React Router e estão ativas no aplicativo principal.

### `/` (Home)

**Componente:** `NeoProtocol`  
**Arquivo:** `src/pages/home/NeoProtocol.jsx`  
**Alias:** `/neo-protocol`

**Descrição:**  
Página inicial do protocolo. Apresenta o NΞØ Protocol com layout Bento Grid, incluindo:

- Hero card com logo e frase animada
- Cards de navegação para Nodes e Manifesto
- Status do sistema em tempo real
- Terminal com informações do protocolo
- Features principais (Auto Custódia, Blockchain, IA Neural)

**Características:**

- ✅ Proteção desktop ativa
- ✅ Pull-to-refresh habilitado
- ✅ Animações spring-in
- ✅ Som de navegação

---

### `/manifesto`

**Componente:** `ManifestoPage`  
**Arquivo:** `src/pages/manifesto/ManifestoPage.jsx`

**Descrição:**  
Página de manifesto do protocolo. Exibe o documento público em formato de terminal com:

- Terminal fixo de altura 500px
- Efeito typewriter linha por linha
- Scroll automático durante digitação
- Fade-out de linhas antigas
- Opção de scroll manual após conclusão
- Imagem de runa no canto superior direito

**Características:**

- ✅ Proteção desktop ativa
- ✅ Terminal com scroll suave
- ✅ Gradientes fade durante digitação
- ✅ Som de papel avançando

---

### `/nos`

**Componente:** `NosPage`  
**Arquivo:** `src/pages/nos/NosPage.jsx`

**Descrição:**  
Página dos Nós do protocolo. Apresenta os 8 nós do NΞØ com:

- Network Graph 3D interativo
- Cards informativos sobre cada nó
- Interação por hover e clique
- Suporte a gestos mobile (pinch-to-zoom, pan, rotate)
- Integração com sensor de movimento do dispositivo
- Efeitos de glow profissional e profundidade 3D

**Características:**

- ✅ Proteção desktop ativa
- ✅ Canvas 3D com WebGL
- ✅ Device motion sensor (gyroscope)
- ✅ Touch gestures completos
- ✅ Sistema de partículas

**Nós disponíveis:**

1. ORIGEM
2. CONSCIÊNCIA
3. ACESSO
4. REESCRITA
5. EXECUÇÃO
6. DESCENTRALIZAÇÃO
7. IMPACTO
8. TRANSCENDÊNCIA

---

### `/boot`

**Componente:** `IntelligenceBoot`  
**Arquivo:** `src/pages/boot/IntelligenceBoot.jsx`

**Descrição:**  
Página de inicialização/boot do protocolo. Simula um terminal de boot com:

- Sequência de inicialização tipo terminal
- Efeito typewriter linha por linha
- Prompt de interação (Y/n) para registrar nó
- Efeito scanline
- Redirecionamento para home após confirmação

**Características:**

- ✅ Proteção desktop ativa
- ✅ Terminal estilo retro
- ✅ Efeitos visuais (scanline, cursor piscante)
- ✅ Som de confirmação/erro

---

## 📄 Rotas HTML Estáticas

Arquivos HTML estáticos servidos diretamente, não gerenciados pelo React Router.

### `/desktop-redirect.html`

**Arquivo:** `public/desktop-redirect.html`

**Descrição:**  
Página de redirecionamento para usuários desktop. Exibe:

- Mensagem informando que o app é exclusivo para mobile
- QR Code para acesso via celular
- Botão "NÃO ACESSE AQUI" (aparece após 30 segundos)
- Links aleatórios para redirecionamento

**Características:**

- ⚠️ Acessível apenas via desktop
- ⏱️ Timer de 30 segundos para botão
- 🎲 Links aleatórios de redirecionamento
- 📱 QR Code gerado dinamicamente

**Uso:**  
Redirecionamento automático quando usuário desktop tenta acessar qualquer rota protegida.

---

### `/branding-pure.html`

**Arquivo:** `public/branding-pure.html`  
**Build:** Incluído em `dist-boot/` para deploy IPFS

**Descrição:**  
Landing page minimalista para IPFS/ENS. Versão standalone HTML da página de branding com:

- Grid background animado
- Efeito glow que segue o mouse
- Animações fadeInDown e fadeInScale
- Links externos seguros (target="_blank", rel="noopener noreferrer")
- Botão para iniciar boot sequence

**Características:**

- ✅ Proteção desktop ativa (script inline)
- ✅ HTML puro (sem React)
- ✅ Otimizado para IPFS
- ✅ Deploy via Lighthouse

---

### `/boot.html`

**Arquivo:** `boot.html` (raiz do projeto)

**Descrição:**  
Página HTML estática de boot. Ponto de entrada alternativo para o boot ritual.

**Status:** ⚠️ Verificar se está em uso ou se foi substituído por `/boot` (React Router)

---

### `/branding.html`

**Arquivo:** `branding.html` (raiz do projeto)

**Descrição:**  
Página HTML estática de branding. Usada no build `dist-boot` para deploy IPFS.

**Status:** ⚠️ Usado no processo de build para IPFS

---

## 🚫 Rotas Desabilitadas/Comentadas

Rotas que existem no código mas estão comentadas ou desabilitadas.

### `/mcp`

**Componente:** `MCPConsole`  
**Arquivo:** `src/pages/mcp-console.jsx`

**Status:** ❌ Comentado no `App.jsx`

**Descrição:**  
Console MCP (Model Context Protocol) para interação com o sistema de nós.

**Motivo:**  
Comentado com nota: "será instruído depois"

**Nota:**  
O componente existe e tem proteção desktop, mas a rota não está ativa no router.

---

## 🛡️ Proteção Desktop

Todas as rotas React Router ativas possuem proteção contra acesso desktop implementada via hook `useDesktopBlock`.

### Hook: `useDesktopBlock`

**Arquivo:** `src/hooks/useDesktopBlock.js`

**Funcionamento:**
1. Detecta se é desktop através de:

   - Largura da janela > 768px
   - Ausência de suporte a touch (`ontouchstart` e `navigator.maxTouchPoints === 0`)
2. Se detectado desktop, redireciona para `/desktop-redirect.html`

**Aplicado em:**
- ✅ `/` (NeoProtocol)
- ✅ `/neo-protocol` (NeoProtocol)
- ✅ `/manifesto` (ManifestoPage)
- ✅ `/nos` (NosPage)
- ✅ `/boot` (IntelligenceBoot)
- ✅ `/x402-example` (X402Example)
- ✅ `/sdk-example` (SDKExample)
- ✅ `BrandingLanding` (componente, não rota ativa)
- ✅ `MCPConsole` (mesmo desabilitado, tem proteção)

---

## 🧭 Navegação

### Bottom Navigation

**Componente:** `BottomNavigation`  
**Arquivo:** `src/components/BottomNavigation.jsx`

**Rotas disponíveis na navegação inferior:**

| Partícula | Rota | Label | Accent Color |
|-----------|------|-------|--------------|
| `⟡` | `/` | HOME | `#34E1FF` (Glitch.Cyan) |
| `⦾` | `/nos` | NODES | `#1A9AF7` (Anomaly.Blue) |
| `⦙` | `/manifesto` | DOCS | `#7B5DFF` (Signal.Violet) |
| `⊘` | `null` | NEEO | `#34E1FF` (não clicável) |

**Características:**
- Navegação fixa no bottom
- Safe area insets (iOS)
- Som de navegação
- Indicador visual da rota ativa

---

## 📊 Resumo de Rotas

### Rotas Ativas (React Router)

| Rota | Componente | Status | Proteção Desktop |
|------|------------|--------|------------------|
| `/` | `NeoProtocol` | ✅ Ativa | ✅ Sim |
| `/neo-protocol` | `NeoProtocol` | ✅ Ativa | ✅ Sim |
| `/manifesto` | `ManifestoPage` | ✅ Ativa | ✅ Sim |
| `/nos` | `NosPage` | ✅ Ativa | ✅ Sim |
| `/boot` | `IntelligenceBoot` | ✅ Ativa | ✅ Sim |
| `/x402-example` | `X402Example` | ✅ Ativa | ✅ Sim |
| `/sdk-example` | `SDKExample` | ✅ Ativa | ✅ Sim |

### Rotas HTML Estáticas

| Rota | Arquivo | Status | Descrição |
|------|---------|--------|-----------|
| `/desktop-redirect.html` | `public/desktop-redirect.html` | ✅ Ativa | Redirecionamento desktop |
| `/branding-pure.html` | `public/branding-pure.html` | ✅ Ativa | Landing IPFS |
| `/boot.html` | `boot.html` | ⚠️ Verificar | Boot estático |
| `/branding.html` | `branding.html` | ⚠️ Build | Build IPFS |

### Rotas Desabilitadas

| Rota | Componente | Status | Motivo |
|------|------------|--------|--------|
| `/mcp` | `MCPConsole` | ❌ Comentado | Será instruído depois |

---

## 💻 URLs Locais (Desenvolvimento)

Para acessar as rotas localmente durante o desenvolvimento:

### Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor Vite iniciará na porta padrão **5173** (ou próxima disponível).

### URLs Disponíveis

| Rota | URL Local |
|------|-----------|
| Home | `http://localhost:5173/` |
| Home (alias) | `http://localhost:5173/neo-protocol` |
| Manifesto | `http://localhost:5173/manifesto` |
| Nós | `http://localhost:5173/nos` |
| Boot | `http://localhost:5173/boot` |
| x402 Example | `http://localhost:5173/x402-example` |
| SDK Example | `http://localhost:5173/sdk-example` |
| Desktop Redirect | `http://localhost:5173/desktop-redirect.html` |

**Nota:**  
⚠️ Todas as rotas React Router têm proteção desktop ativa. Para testar em desktop, você precisará:
1. Desabilitar temporariamente o hook `useDesktopBlock()` no componente
2. Ou usar o modo mobile do DevTools do navegador (F12 → Toggle Device Toolbar)

---

## 🔗 Links Úteis

- **ENS Domain:** `neoprotocol.eth`
- **Deploy IPFS:** Via Lighthouse (`dist-boot/`)
- **GitHub:** https://github.com/NEO-PROTOCOL
- **Instagram:** https://www.instagram.com/neoprotocol.eth/

---

## 📝 Notas de Desenvolvimento

### Adicionar Nova Rota

1. Criar componente em `src/pages/[nome]/[Nome]Page.jsx`
2. Importar no `src/App.jsx`
3. Adicionar `<Route>` no `<Routes>`
4. Aplicar `useDesktopBlock()` no componente
5. Adicionar à navegação se necessário

### Exemplo:

```jsx
// src/App.jsx
import NovaPage from './pages/nova/NovaPage';

<Route path="/nova" element={<NovaPage />} />
```

```jsx
// src/pages/nova/NovaPage.jsx
import { useDesktopBlock } from '../../hooks/useDesktopBlock';

export default function NovaPage() {
  useDesktopBlock();
  // ... resto do componente
}
```

---

**Documento mantido por:** NΞØ Protocol Team  
**Versão:** 1.0

