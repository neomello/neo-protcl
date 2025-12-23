# Configuração da Organização NEO-PROTOCOL

Guia completo para ativar, proteger e preparar a organização para colaborações.

## ◭ Checklist de Configuração

### 1. Configurações da Organização

#### A. Acessar Configurações
- URL: https://github.com/organizations/NEO-PROTOCOL/settings

#### B. Profile Settings
- [ ] Adicionar descrição completa
- [ ] Adicionar website: `neoprotocol.eth.link`
- [ ] Adicionar localização: Brazil
- [ ] Upload de logo/avatar da organização

#### C. Member Privileges
- [ ] Configurar permissões padrão para membros
- [ ] Definir base permissions (Read, Write, Admin)
- [ ] Ativar "Allow members to create repositories"
- [ ] Configurar "Repository creation" (se necessário)

### 2. Repository Settings (neo-protcl)

#### A. General Settings
- URL: https://github.com/NEO-PROTOCOL/neo-protcl/settings

**Description:**
```
Protocol for symbolic presence, trustless interaction and autonomous identity. 
Each mint is a signal. Powered by $NEO
```

**Topics (adicionar):**
- `blockchain`
- `web3`
- `protocol`
- `decentralized`
- `ethereum`
- `base`
- `pwa`
- `react`
- `solidity`

**Website:** `https://neoprotocol.space`

#### B. Features
- [x] Issues (ativar)
- [x] Projects (ativar)
- [x] Wiki (opcional)
- [x] Discussions (ativar para comunidade)
- [x] Sponsorships (se aplicável)

### 3. Branch Protection Rules

#### A. Proteger Branch `main`
- URL: https://github.com/NEO-PROTOCOL/neo-protcl/settings/branches

**Configurações recomendadas:**

1. **Branch name pattern:** `main`

2. **Protect matching branches:**
   - [x] Require a pull request before merging
     - [x] Require approvals: **1** (ou mais)
     - [x] Dismiss stale pull request approvals when new commits are pushed
     - [x] Require review from Code Owners (se configurado)
   
   - [x] Require status checks to pass before merging
     - [x] Require branches to be up to date before merging
     - Adicionar status checks específicos:
       - `lint` - Verificação de lint e formatação
       - `build` - Build do projeto
       - `compile-contracts` - Compilação de contratos Hardhat
       - `security` - Verificação de segurança
   
   - [x] Require conversation resolution before merging
   
   - [x] Require signed commits (opcional, mas recomendado)
   
   - [x] Require linear history (opcional)
   
   - [x] Include administrators (recomendado para manter padrões)

3. **Restrict who can push to matching branches:**
   - Deixar vazio (permitir via PR apenas)

4. **Allow force pushes:** ⨷ NÃO
5. **Allow deletions:** ⨷ NÃO

### 4. Security Settings

#### A. Code Security and Analysis
- URL: https://github.com/NEO-PROTOCOL/neo-protcl/settings/security_analysis

**Ativar:**
- [x] Dependency graph
- [x] Dependabot alerts
- [x] Dependabot security updates
- [x] Code scanning (opcional, mas recomendado)
- [x] Secret scanning

#### B. Secrets and Variables
- URL: https://github.com/NEO-PROTOCOL/neo-protcl/settings/secrets/actions

**Secrets necessários (adicionar quando necessário):**
- `VITE_THIRDWEB_CLIENT_ID`
- `VITE_THIRDWEB_SECRET_KEY`
- `VITE_X402_SERVER_WALLET_ADDRESS`
- Outros secrets de deploy

### 5. Collaborators & Teams

#### A. Adicionar Collaborators
- URL: https://github.com/NEO-PROTOCOL/neo-protcl/settings/access

**Níveis de acesso:**
- **Read:** Visualização apenas
- **Triage:** Pode gerenciar issues/PRs
- **Write:** Pode fazer push em branches (exceto main protegida)
- **Maintain:** Pode gerenciar repositório (exceto settings críticos)
- **Admin:** Acesso completo

#### B. Teams (se necessário)
- Criar teams para diferentes níveis de acesso
- Exemplo: `developers`, `reviewers`, `maintainers`

### 6. Actions & CI/CD

#### A. Habilitar GitHub Actions
- URL: https://github.com/NEO-PROTOCOL/neo-protcl/settings/actions

**Configurações:**
- [x] Allow all actions and reusable workflows
- [ ] Allow local actions and reusable workflows (se necessário)
- [x] Allow actions created by GitHub
- [x] Allow Marketplace actions

#### B. Workflow Permissions
- [x] Read and write permissions (para deploy automático)
- [x] Allow GitHub Actions to create and approve pull requests

#### C. Configurar CI Workflow
Criar `.github/workflows/ci.yml` com jobs para:
- Lint & Format Check
- Build Check (app principal + boot ritual)
- Compile Smart Contracts
- Security Check (npm audit)

**Status checks gerados pelo workflow:**
- `lint` - Verificação de código e formatação
- `build` - Build do projeto
- `compile-contracts` - Compilação de contratos
- `security` - Verificação de segurança

**Importante:** Após criar o workflow, aguardar primeira execução para que os status checks apareçam nas Branch Protection Rules.

### 7. CODEOWNERS File

Criar arquivo `.github/CODEOWNERS`:

```
# NEO-PROTOCOL Code Owners
* @NEO-PROTOCOL/owners

# Contracts
/contracts/ @NEO-PROTOCOL/contracts-team

# Documentation
/docs/ @NEO-PROTOCOL/docs-team

# Frontend
/src/ @NEO-PROTOCOL/frontend-team
```

### 8. Issue & PR Templates

#### A. Issue Template
Criar `.github/ISSUE_TEMPLATE/bug_report.md` e `feature_request.md`

#### B. PR Template
Criar `.github/pull_request_template.md`

### 9. Contributing Guidelines

Criar `CONTRIBUTING.md` na raiz do repositório.

### 10. Security Policy

Criar `SECURITY.md` na raiz do repositório.

## ⧉ Segurança Adicional

### Two-Factor Authentication
- [ ] Exigir 2FA para todos os membros da organização
- URL: https://github.com/organizations/NEO-PROTOCOL/settings/security

### Webhooks (se necessário)
- Configurar webhooks para integrações externas
- URL: https://github.com/NEO-PROTOCOL/neo-protcl/settings/hooks

## ⨀ Monitoring & Insights

### Insights
- URL: https://github.com/NEO-PROTOCOL/neo-protcl/insights
- Monitorar: Traffic, Commits, Contributors, Community

## ⦿ Próximos Passos

1. Executar checklist acima
2. Configurar branch protection
3. Adicionar CODEOWNERS
4. Criar templates de Issue/PR
5. Configurar Actions para CI/CD
6. Adicionar colaboradores conforme necessário

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.
