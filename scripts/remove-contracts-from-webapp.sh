#!/bin/bash

# Script para remover contratos do repositório webapp
# Uso: ./scripts/remove-contracts-from-webapp.sh

set -e

echo "🧹 Removendo contratos do repositório webapp..."
echo ""

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
  echo "❌ Erro: Execute este script na raiz do projeto"
  exit 1
fi

# Remover contratos
if [ -d "contracts" ]; then
  echo "  ✅ Removendo contracts/"
  rm -rf contracts/
fi

# Remover Hardhat config
if [ -f "hardhat.config.js" ]; then
  echo "  ✅ Removendo hardhat.config.js"
  rm hardhat.config.js
fi

# Remover scripts de deploy
if [ -f "scripts/deploy.js" ]; then
  echo "  ✅ Removendo scripts/deploy.js"
  rm scripts/deploy.js
fi

if [ -f "scripts/verify-deploy-ready.js" ]; then
  echo "  ✅ Removendo scripts/verify-deploy-ready.js"
  rm scripts/verify-deploy-ready.js
fi

# Remover test (se for só de contratos)
if [ -d "test" ] && [ ! -f "test/frontend.test.js" ]; then
  echo "  ⚠️  test/ encontrado. Verifique se não há testes do frontend antes de remover"
  # rm -rf test/
fi

# Atualizar package.json (remover Hardhat)
echo "  ✅ Atualizando package.json..."
if [ -f "package.json" ]; then
  # Remover scripts relacionados a contratos
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Remover script compile se existir
    if (pkg.scripts && pkg.scripts.compile) {
      delete pkg.scripts.compile;
    }
    
    // Remover dependências do Hardhat
    if (pkg.devDependencies) {
      delete pkg.devDependencies['@nomiclabs/hardhat-ethers'];
      delete pkg.devDependencies['hardhat'];
    }
    
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
  "
fi

# Atualizar .github/workflows/ci.yml (remover compile-contracts)
if [ -f ".github/workflows/ci.yml" ]; then
  echo "  ✅ Atualizando .github/workflows/ci.yml..."
  # Criar backup
  cp .github/workflows/ci.yml .github/workflows/ci.yml.bak
  
  # Remover job compile-contracts
  node -e "
    const fs = require('fs');
    const yaml = fs.readFileSync('.github/workflows/ci.yml', 'utf8');
    const lines = yaml.split('\n');
    let inCompileJob = false;
    let indentLevel = 0;
    const result = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      
      if (trimmed.startsWith('compile-contracts:')) {
        inCompileJob = true;
        indentLevel = line.length - line.trimStart().length;
        continue;
      }
      
      if (inCompileJob) {
        const currentIndent = line.length - line.trimStart().length;
        if (trimmed && currentIndent <= indentLevel && !trimmed.startsWith('#')) {
          inCompileJob = false;
        } else {
          continue;
        }
      }
      
      result.push(line);
    }
    
    fs.writeFileSync('.github/workflows/ci.yml', result.join('\n'));
  "
fi

echo ""
echo "✅ Contratos removidos do webapp"
echo ""
echo "📝 Próximos passos:"
echo "  1. npm install (para remover Hardhat do node_modules)"
echo "  2. git add ."
echo "  3. git commit -m 'chore: remover contratos, separar em repositório dedicado'"
echo "  4. git push"
echo ""
echo "⚠️  IMPORTANTE: Adicione os endereços dos contratos no .env.example:"
echo "   VITE_NODE_REGISTRY_ADDRESS=0x..."
echo "   VITE_NODE_DESIGNER_REVIEW_ADDRESS=0x..."

