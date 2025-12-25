# Status do Dependabot - NΞØ Protocol

## 📊 Resumo

O Dependabot está ativo e monitorando vulnerabilidades no repositório.

## 🔴 Alertas Abertos (Ação Necessária)

### 1. cookie (Alert #24 e #7)

- **Severidade:** LOW
- **Pacote:** `cookie`
- **Versão vulnerável:** < 0.7.0
- **Versão corrigida:** 0.7.0
- **Tipo:** Dependência transitiva (development)
- **CVE:** CVE-2024-47764
- **Descrição:** Cookie name, path e domain aceitam caracteres fora dos limites, podendo resultar em valores inesperados
- **Status:** OPEN
- **Links:**
  - Alert #24: https://github.com/NEO-PROTOCOL/neo-protcl/security/dependabot/24
  - Alert #7: https://github.com/NEO-PROTOCOL/neo-protcl/security/dependabot/7

**Ação:** Atualizar dependência transitiva que usa `cookie` ou usar `npm overrides` para forçar versão 0.7.0+

## ✅ Alertas Corrigidos (Resolvidos)

A maioria dos alertas já foi corrigida automaticamente ou via atualizações:

### Vulnerabilidades Corrigidas:

- ✅ **elliptic** (múltiplas CVEs) - Corrigido para 6.6.1+
- ✅ **@coinbase/wallet-sdk** - Corrigido para 4.3.0+
- ✅ **esbuild** - Corrigido para 0.25.0+
- ✅ **ws** (WebSocket) - Corrigido para 8.17.1+
- ✅ **axios** - Corrigido para 1.6.0+

## 🔍 Como Verificar Alertas

### Via GitHub Web:

https://github.com/NEO-PROTOCOL/neo-protcl/security/dependabot

### Via CLI:

```bash
gh api repos/NEO-PROTOCOL/neo-protcl/dependabot/alerts
```

### Via API:

```bash
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/NEO-PROTOCOL/neo-protcl/dependabot/alerts
```

## 🛠️ Ações Recomendadas

### Para cookie (LOW severity):

1. Verificar qual dependência usa `cookie`:

   ```bash
   npm ls cookie
   ```

2. Se for dependência transitiva, usar `overrides` no `package.json`:

   ```json
   {
     "overrides": {
       "cookie": "^0.7.0"
     }
   }
   ```

3. Ou aguardar atualização upstream da dependência que usa `cookie`

## 📈 Monitoramento

- **Total de alertas:** ~30+
- **Abertos:** 2 (cookie - LOW)
- **Corrigidos:** ~28+
- **Última verificação:** Dezembro 2025

## ⚙️ Configuração do Dependabot

O Dependabot está configurado para:

- ✅ Alertas de segurança automáticos
- ✅ Atualizações de segurança automáticas (se habilitado)
- ✅ Dependency graph ativo

## 🔗 Links Úteis

- **Dependabot Alerts:** https://github.com/NEO-PROTOCOL/neo-protcl/security/dependabot
- **Dependency Graph:** https://github.com/NEO-PROTOCOL/neo-protcl/network/dependencies
- **Security Settings:** https://github.com/NEO-PROTOCOL/neo-protcl/settings/security_analysis

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.
