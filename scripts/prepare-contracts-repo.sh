#!/bin/bash

# Script para preparar repositório de contratos separado
# Uso: ./scripts/prepare-contracts-repo.sh

set -e

echo "🔀 Preparando separação de repositórios..."
echo ""

# Criar diretório temporário
TEMP_DIR="../neo-protocol-contracts-temp"
REPO_NAME="neo-protocol-contracts"

echo "📦 Criando estrutura do repositório de contratos..."

# Criar diretório temporário
mkdir -p "$TEMP_DIR"

# Copiar contratos
echo "  ✅ Copiando contracts/"
cp -r contracts "$TEMP_DIR/"

# Copiar Hardhat config
echo "  ✅ Copiando hardhat.config.js"
cp hardhat.config.js "$TEMP_DIR/"

# Copiar scripts de deploy
echo "  ✅ Copiando scripts de deploy"
mkdir -p "$TEMP_DIR/scripts"
cp scripts/deploy.js "$TEMP_DIR/scripts/" 2>/dev/null || true
cp scripts/verify-deploy-ready.js "$TEMP_DIR/scripts/" 2>/dev/null || true

# Copiar test (se existir)
if [ -d "test" ]; then
  echo "  ✅ Copiando test/"
  cp -r test "$TEMP_DIR/"
fi

# Copiar docs de contratos
echo "  ✅ Copiando documentação de contratos"
mkdir -p "$TEMP_DIR/docs"
cp -r docs/nhip-*.md "$TEMP_DIR/docs/" 2>/dev/null || true
cp docs/PROOF_OF_INTENTION_ARCHITECTURE.md "$TEMP_DIR/docs/" 2>/dev/null || true

# Criar package.json mínimo
echo "  ✅ Criando package.json"
cat > "$TEMP_DIR/package.json" << 'EOF'
{
  "name": "@neo-protocol/contracts",
  "version": "1.0.0",
  "description": "NΞØ Protocol Smart Contracts",
  "type": "module",
  "scripts": {
    "compile": "hardhat compile",
    "test": "hardhat test",
    "deploy:base": "hardhat run scripts/deploy.js --network base",
    "deploy:polygon": "hardhat run scripts/deploy.js --network polygon",
    "verify": "node scripts/verify-deploy-ready.js"
  },
  "devDependencies": {
    "@nomiclabs/hardhat-ethers": "^2.2.3",
    "dotenv": "^16.3.1",
    "ethers": "^5.7.2",
    "hardhat": "^2.19.4"
  },
  "keywords": [
    "solidity",
    "smart-contracts",
    "neo-protocol",
    "blockchain"
  ],
  "author": "NΞØ Protocol",
  "license": "MIT"
}
EOF

# Criar .gitignore
echo "  ✅ Criando .gitignore"
cat > "$TEMP_DIR/.gitignore" << 'EOF'
# Dependencies
node_modules/

# Environment
.env
.env.*

# Hardhat
cache/
artifacts/
coverage/
coverage.json
typechain/
typechain-types/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
EOF

# Criar README.md
echo "  ✅ Criando README.md"
cat > "$TEMP_DIR/README.md" << 'EOF'
# NΞØ Protocol — Smart Contracts

**Repositório dedicado aos contratos inteligentes do NΞØ Protocol**

---

## 📋 Contratos

- `NodeRegistry.sol` - Registro on-chain de nós (NHIP-001)
- `NodeDesignerReview.sol` - Sistema de revisão de design
- `NeoNodeAdmission.sol` - Admissão genérica de nós
- `ReputationBootstrap.sol` - Bootstrap de reputação
- `NodeAdmission.sol` - Admissão baseada em reputação
- `symbolic/NeoSymbolicNode.sol` - Marcador simbólico

---

## 🚀 Deploy

### Pré-requisitos

```bash
# Instalar dependências
npm install

# Configurar .env
cp .env.example .env
# Editar .env com PRIVATE_KEY e RPC_URL
```

### Deploy

```bash
# Verificar configuração
npm run verify

# Deploy em Base Mainnet
npm run deploy:base

# Deploy em Polygon
npm run deploy:polygon
```

---

## 📚 Documentação

- [NHIP-001 - NodeRegistry](../docs/nhip-001.md)
- [Deploy Checklist](../docs/ops/DEPLOY_CHECKLIST.md)
- [Fluxo de Aceitação](../docs/ops/FLUXO_ACEITACAO_CONTRATOS.md)

---

## 🔗 Links

- **Webapp:** [neo-protocol-webapp](https://github.com/NEO-PROTOCOL/neo-protocol-webapp)
- **Contratos:** Este repositório

---

**NΞØ Protocol // A Mente é a Nova Blockchain**
EOF

# Criar .github/workflows/ci.yml
echo "  ✅ Criando CI workflow"
mkdir -p "$TEMP_DIR/.github/workflows"
cat > "$TEMP_DIR/.github/workflows/ci.yml" << 'EOF'
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  compile:
    name: Compile Smart Contracts
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Compile contracts
        run: npm run compile

  security:
    name: Security Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run npm audit
        run: npm audit --audit-level=moderate || true
EOF

echo ""
echo "✅ Estrutura criada em: $TEMP_DIR"
echo ""
echo "📝 Próximos passos:"
echo "  1. Criar repositório no GitHub: $REPO_NAME"
echo "  2. cd $TEMP_DIR"
echo "  3. git init"
echo "  4. git add ."
echo "  5. git commit -m 'feat: repositório de contratos separado'"
echo "  6. git remote add origin https://github.com/NEO-PROTOCOL/$REPO_NAME.git"
echo "  7. git push -u origin main"
echo ""
echo "🔗 Depois, atualizar o webapp removendo contracts/ e hardhat.config.js"

