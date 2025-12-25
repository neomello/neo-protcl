# 🔧 Fix: CORS Error com Gateway IPFS Lighthouse

**Data:** 2025-01-27

---

## ❌ Problema

Erro de CORS ao acessar imagens IPFS via `gateway.lighthouse.storage`:

```
Access to image at 'https://bafybeicwktbd4bpuey7w5efaqqzgtrul43hlwn4ison5l4vn37b3cklzdi.ipfs.localhost:8080/'
(redirected from 'https://gateway.lighthouse.storage/ipfs/bafybeicwktbd4bpuey7w5efaqqzgtrul43hlwn4ison5l4vn37b3cklzdi')
from origin 'https://neoprotocol.space' has been blocked by CORS policy.
```

**Causa:** O gateway Lighthouse está redirecionando para um gateway localhost que não tem CORS configurado corretamente.

---

## ✅ Solução

Trocar todas as referências de `gateway.lighthouse.storage` para **Cloudflare IPFS Gateway** (`cloudflare-ipfs.com`), que tem melhor suporte a CORS.

### **Gateway Anterior:**

```
https://gateway.lighthouse.storage/ipfs/{cid}
```

### **Gateway Novo:**

```
https://cloudflare-ipfs.com/ipfs/{cid}
```

---

## 📝 Arquivos Atualizados

### **1. Função Helper**

- `src/services/intentDataCapture.js` - `getIPFSGatewayUrl()` agora usa Cloudflare

### **2. HTML Files**

- `index.html` - Favicon, og:image, twitter:image
- `boot.html` - Favicon
- `branding.html` - Favicon
- `public/branding-pure.html` - Favicon e logo

### **3. Componentes React**

- `src/components/Navbar.jsx` - Logo
- `src/pages/home/NeoProtocolMobile.jsx` - Hero logo
- `src/pages/home/NeoProtocolDesktop.jsx` - Hero logo
- `src/pages/boot/BrandingLanding.jsx` - Logo
- `public/desktop-redirect.html` - Links aleatórios

### **4. Scripts**

- `src/services/intentDataCapture.js` - Console log de URL

---

## 🌐 Gateways IPFS com CORS

### **Recomendados (CORS configurado):**

- ✅ `https://cloudflare-ipfs.com/ipfs/` - **Usado agora**
- ✅ `https://ipfs.io/ipfs/` - Alternativa
- ✅ `https://gateway.pinata.cloud/ipfs/` - Alternativa (requer conta)
- ✅ `https://dweb.link/ipfs/` - Alternativa

### **Não recomendados (problemas de CORS):**

- ❌ `https://gateway.lighthouse.storage/ipfs/` - Redireciona para localhost sem CORS

---

## 🔄 Como Trocar Gateway no Futuro

Se precisar trocar o gateway novamente, atualize:

1. **Função helper:**

   ```javascript
   // src/services/intentDataCapture.js
   export function getIPFSGatewayUrl(cid) {
     return `https://NOVO_GATEWAY/ipfs/${cid}`
   }
   ```

2. **Buscar e substituir em todos os arquivos:**

   ```bash
   # Buscar todas as referências
   grep -r "gateway.lighthouse.storage" .

   # Substituir (cuidado com scripts/docs)
   find . -type f -name "*.js" -o -name "*.jsx" -o -name "*.html" | \
     xargs sed -i '' 's/gateway\.lighthouse\.storage/cloudflare-ipfs.com/g'
   ```

---

## 📚 Notas

- **CIDs não mudam:** Os CIDs IPFS são imutáveis, apenas o gateway muda
- **Cache:** Pode levar alguns minutos para o cache do navegador atualizar
- **Redundância:** Considere usar múltiplos gateways para fallback no futuro

---

**NΞØ Protocol // A Mente é a Nova Blockchain**
