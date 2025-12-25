# ⚠️ Warnings NPM Deprecated — Explicação

**Data:** 2025-01-27

---

## 🔍 O que são esses warnings?

São avisos do npm sobre **dependências transitivas** (não diretas) que estão marcadas como **deprecated** (obsoletas).

### **Dependências Deprecated Encontradas:**

1. **`sourcemap-codec@1.4.8`** → Use `@jridgewell/sourcemap-codec`
2. **`node-domexception@1.0.0`** → Use DOMException nativo
3. **`@paulmillr/qr@0.2.1`** → Use `qr` package
4. **`@hey-api/client-fetch@0.10.0`** → Bundled em `@hey-api/openapi-ts`
5. **`source-map@0.8.0-beta.0`** → Beta não será incluído em versões futuras
6. **`@walletconnect/*` (várias versões)** → Melhorias de confiabilidade e performance

---

## 📊 Análise

### **Origem das Dependências:**

```
thirdweb@5.116.1
  ├─ @walletconnect/sign-client@2.21.8
  ├─ @walletconnect/universal-provider@2.21.8
  ├─ @thirdweb-dev/engine@3.4.0
  │   └─ @hey-api/client-fetch@0.10.0
  └─ x402@0.7.0
      └─ wagmi@2.19.5
          └─ @wagmi/connectors@6.2.0
              ├─ @metamask/sdk@0.33.1
              │   └─ @paulmillr/qr@0.2.1
              └─ @walletconnect/ethereum-provider@2.21.1
                  └─ @reown/appkit@1.7.8
                      └─ @walletconnect/universal-provider@2.21.0
                          └─ @walletconnect/sign-client@2.21.0

node-fetch@3.3.2
  └─ fetch-blob@3.2.0
      └─ node-domexception@1.0.0
```

**Todas são dependências transitivas** — não estão no seu `package.json` diretamente.

---

## ✅ É um problema?

**NÃO.**

- ✅ **Não são erros** — apenas warnings informativos
- ✅ **Não quebram funcionalidade** — código funciona normalmente
- ✅ **Não estão no seu controle** — são dependências do `thirdweb` e outras libs
- ✅ **Serão atualizados** — quando `thirdweb` atualizar suas dependências

---

## 🎯 O que fazer?

### **Opção 1: Ignorar (Recomendado)**

Esses warnings são **cosméticos** e não afetam o funcionamento. Você pode ignorá-los com segurança.

### **Opção 2: Aguardar atualização do thirdweb**

Quando o `thirdweb` atualizar para versões mais recentes, esses warnings desaparecerão automaticamente.

### **Opção 3: Usar `npm install --legacy-peer-deps` (se necessário)**

Se os warnings estiverem causando problemas (raro), você pode usar:

```bash
npm install --legacy-peer-deps
```

Mas **não é necessário** neste caso.

---

## 📋 Status por Dependência

### **1. WalletConnect Packages**

**Status:** ⚠️ Deprecated (mas funcionais)

- `@walletconnect/sign-client@2.21.8` - Versão mais recente disponível
- `@walletconnect/universal-provider@2.21.8` - Versão mais recente disponível
- Versões antigas (2.21.0, 2.21.1) ainda presentes via dependências transitivas

**Ação:** Aguardar atualização do `thirdweb` e `@reown/appkit`

### **2. sourcemap-codec**

**Status:** ⚠️ Deprecated

- Usado por bundlers internos
- Não afeta funcionalidade

**Ação:** Nenhuma necessária

### **3. node-domexception**

**Status:** ⚠️ Deprecated

- Usado por `node-fetch@3.3.2`
- Funcional, mas recomendam usar DOMException nativo

**Ação:** Aguardar atualização do `node-fetch` ou migrar para `node-fetch@3.x` mais recente

### **4. @paulmillr/qr**

**Status:** ⚠️ Deprecated

- Usado por `@metamask/sdk`
- Funcional, mas recomendam usar `qr` package

**Ação:** Aguardar atualização do `@metamask/sdk`

### **5. @hey-api/client-fetch**

**Status:** ⚠️ Deprecated

- Usado por `@thirdweb-dev/engine`
- Agora bundled em `@hey-api/openapi-ts`

**Ação:** Aguardar atualização do `@thirdweb-dev/engine`

---

## 💡 Recomendação

**Ignorar esses warnings por enquanto.**

Eles são:

- ✅ Cosméticos (não afetam funcionalidade)
- ✅ Transitivos (não estão no seu controle)
- ✅ Temporários (serão resolvidos quando dependências atualizarem)

**Foco em:**

- ✅ Funcionalidade do código
- ✅ Build funcionando
- ✅ Testes passando

---

## 📚 Referências

- [npm deprecate documentation](https://docs.npmjs.com/cli/v9/commands/npm-deprecate)
- [Thirdweb v5 Documentation](https://portal.thirdweb.com/)
- [WalletConnect Migration Guide](https://github.com/WalletConnect/walletconnect-monorepo/releases)

---

**NΞØ Protocol // A Mente é a Nova Blockchain**
