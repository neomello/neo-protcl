# 🔗 Redirect URIs - Thirdweb Configuration

**Data:** 2025-01-27

---

## 📋 O que são Redirect URIs?

**Redirect URIs** são URLs para onde o usuário é redirecionado após autenticação social (Google, Apple, etc.). Eles são usados principalmente para:

- **React Native** - Deep links para apps mobile
- **Unity/Unreal Engine** - Games com autenticação social
- **Web Apps** - Geralmente **NÃO são necessários** (OAuth funciona via popup/redirect automático)

---

## 🎯 Para o NΞØ Protocol (Web App)

### **Status Atual:**

O projeto NΞØ Protocol é uma **aplicação web React** (não React Native), então:

- ✅ **Redirect URIs geralmente NÃO são necessários**
- ✅ OAuth funciona via popup/redirect automático no navegador
- ✅ O Thirdweb gerencia os redirects automaticamente

### **Quando Configurar:**

Você só precisa configurar Redirect URIs se:

1. **Futuro uso mobile** - Se planeja criar app React Native
2. **Deep linking** - Se precisa de deep links customizados
3. **OAuth providers específicos** - Se algum provider exigir

---

## 🔧 Como Configurar (Se Necessário)

### **No Thirdweb Dashboard:**

1. Acesse: [thirdweb.com/dashboard](https://thirdweb.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Auth** → **Redirect URIs**
4. Adicione os URIs (um por linha ou separados por vírgula)

### **Exemplos de Redirect URIs:**

#### **Para Web App (Opcional):**

```
https://neoprotocol.space/auth/callback
https://neoprotocol.space/callback
https://www.neoprotocol.space/auth/callback
```

#### **Para React Native (Futuro):**

```
neoprotocol://auth/callback
com.neoprotocol://auth/callback
neoprotocol://oauth/callback
```

#### **Para Desenvolvimento Local:**

```
http://localhost:5173/auth/callback
http://localhost:5173/callback
http://127.0.0.1:5173/auth/callback
```

---

## ⚠️ Importante

### **Para Aplicações Web:**

- **Você pode deixar em branco** se for apenas web app
- O Thirdweb gerencia redirects automaticamente via popup
- Não é obrigatório configurar para funcionar

### **Padrão de OAuth Web:**

1. Usuário clica em "Sign in with Google"
2. Popup abre com Google OAuth
3. Usuário autentica
4. Google redireciona para callback do Thirdweb
5. Thirdweb processa e fecha popup
6. Usuário autenticado no app

**Nenhum redirect URI customizado necessário!**

---

## 📱 Se Planejar React Native no Futuro

Se você planeja criar um app mobile React Native, configure:

### **Deep Link Scheme:**

No `app.json` ou configuração do app:

```json
{
  "scheme": "neoprotocol",
  "ios": {
    "bundleIdentifier": "com.neoprotocol.app"
  },
  "android": {
    "package": "com.neoprotocol.app"
  }
}
```

### **Redirect URIs Correspondentes:**

```
neoprotocol://auth/callback
com.neoprotocol://auth/callback
```

---

## 🎯 Recomendação para NΞØ Protocol

### **Ação Imediata:**

**Deixe em branco** ou **não configure** Redirect URIs por enquanto, pois:

- ✅ É uma aplicação web (não mobile)
- ✅ OAuth funciona automaticamente via popup
- ✅ Não há necessidade de deep links no momento

### **Se o Dashboard Exigir:**

Se o dashboard do Thirdweb exigir pelo menos um URI, adicione:

```
https://neoprotocol.space/auth/callback
```

Mas isso **não é necessário** para o funcionamento atual.

---

## 📚 Referências

- [Thirdweb Embedded Wallets](https://portal.thirdweb.com/wallets/embedded-wallet)
- [OAuth 2.0 Redirect URIs](https://oauth.net/2/redirect-uris/)
- [React Native Deep Linking](https://reactnative.dev/docs/linking)

---

## ✅ Checklist

- [ ] Verificar se é aplicação web (✅ Sim - NΞØ Protocol)
- [ ] Verificar se precisa de deep links (❌ Não no momento)
- [ ] Verificar se planeja React Native (❌ Não no momento)
- [ ] **Ação:** Deixar Redirect URIs em branco ou não configurar

---

**NΞØ Protocol // A Mente é a Nova Blockchain**
