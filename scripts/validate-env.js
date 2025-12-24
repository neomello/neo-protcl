#!/usr/bin/env node

/**
 * Validação de Variáveis de Ambiente para Build de Produção
 * 
 * Este script valida se as variáveis de ambiente críticas estão configuradas
 * antes de permitir o build de produção.
 */

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Carregar variáveis de ambiente
config({ path: join(rootDir, '.env') });

const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('--production');

// Variáveis críticas para produção
const CRITICAL_VARS = {
  VITE_THIRDWEB_CLIENT_ID: {
    required: true,
    message: 'VITE_THIRDWEB_CLIENT_ID é obrigatório para produção (wallet connect)',
    warning: 'VITE_THIRDWEB_CLIENT_ID não configurado - funcionalidades limitadas'
  }
};

// Variáveis recomendadas (não bloqueiam build)
const RECOMMENDED_VARS = {
  VITE_THIRDWEB_SECRET_KEY: {
    message: 'VITE_THIRDWEB_SECRET_KEY não configurado - x402 Payments não funcionará'
  },
  VITE_X402_SERVER_WALLET_ADDRESS: {
    message: 'VITE_X402_SERVER_WALLET_ADDRESS não configurado - x402 Payments não funcionará'
  }
};

function validateEnv() {
  const errors = [];
  const warnings = [];

  // Verificar se .env existe
  const envPath = join(rootDir, '.env');
  if (!existsSync(envPath)) {
    if (isProduction && !isCI) {
      errors.push('Arquivo .env não encontrado. Copie .env.example para .env e configure.');
    } else if (isCI) {
      // Em CI, avisos são aceitáveis (variáveis podem estar em secrets)
      warnings.push('Arquivo .env não encontrado em CI. Usando variáveis de ambiente do CI.');
    } else {
      warnings.push('Arquivo .env não encontrado. Usando variáveis do sistema.');
    }
  }

  // Validar variáveis críticas
  for (const [varName, config] of Object.entries(CRITICAL_VARS)) {
    const value = process.env[varName];
    
    if (!value || value.trim() === '' || value.includes('your-') || value.includes('here')) {
      if (config.required && isProduction && !isCI) {
        errors.push(`❌ ${varName}: ${config.message}`);
      } else {
        warnings.push(`⚠️  ${varName}: ${config.warning || config.message}`);
      }
    }
  }

  // Validar variáveis recomendadas
  for (const [varName, config] of Object.entries(RECOMMENDED_VARS)) {
    const value = process.env[varName];
    
    if (!value || value.trim() === '' || value.includes('your-') || value.includes('here')) {
      warnings.push(`⚠️  ${varName}: ${config.message}`);
    }
  }

  // Exibir resultados
  if (warnings.length > 0) {
    console.log('\n⚠️  Avisos de Configuração:\n');
    warnings.forEach(w => console.log(`  ${w}`));
  }

  if (errors.length > 0) {
    console.error('\n❌ Erros Críticos:\n');
    errors.forEach(e => console.error(`  ${e}`));
    console.error('\n💡 Solução:');
    console.error('  1. Copie .env.example para .env');
    console.error('  2. Configure as variáveis obrigatórias');
    console.error('  3. Execute o build novamente\n');
    process.exit(1);
  }

  if (warnings.length === 0 && errors.length === 0) {
    console.log('✅ Todas as variáveis de ambiente estão configuradas corretamente');
  }

  return errors.length === 0;
}

// Executar validação
try {
  validateEnv();
} catch (error) {
  console.error('Erro ao validar variáveis de ambiente:', error);
  process.exit(1);
}

