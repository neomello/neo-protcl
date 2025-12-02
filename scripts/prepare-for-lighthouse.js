#!/usr/bin/env node

/**
 * Script para preparar dist-boot para upload manual no Lighthouse
 * Cria um ZIP pronto para upload via interface web
 */

import { existsSync, createWriteStream, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

async function prepareForUpload() {
  try {
    console.log('📦 Preparando arquivo para upload manual no Lighthouse...\n');

    const distBootPath = join(rootDir, 'dist-boot');
    
    if (!existsSync(distBootPath)) {
      console.error('❌ Erro: dist-boot não encontrado!');
      console.log('💡 Execute primeiro: npm run build:boot');
      process.exit(1);
    }

    console.log('📦 Diretório:', distBootPath);

    // Criar ZIP
    console.log('📦 Criando arquivo ZIP...\n');
    
    const zipPath = join(rootDir, 'dist-boot-for-upload.zip');
    const output = createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    return new Promise((resolve, reject) => {
      output.on('close', () => {
        const sizeMB = (archive.pointer() / 1024 / 1024).toFixed(2);
        console.log(`✅ ZIP criado: ${sizeMB} MB`);
        console.log(`📁 Arquivo: ${zipPath}\n`);
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📋 INSTRUÇÕES PARA UPLOAD MANUAL:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        console.log('1️⃣  Acesse: https://lighthouse.storage/');
        console.log('2️⃣  Faça login na sua conta');
        console.log('3️⃣  Vá em "Upload" → "Upload Folder"');
        console.log(`4️⃣  Selecione o arquivo: ${zipPath}`);
        console.log('5️⃣  Aguarde o upload concluir');
        console.log('6️⃣  Copie o CID retornado\n');
        
        console.log('💡 OU use o botão de upload na interface web do Lighthouse\n');
        
        console.log('📝 Após obter o CID:');
        console.log('   1. Acesse: https://app.ens.domains/name/neoprotocol.eth/details');
        console.log('   2. Vá em "Records" → "Content"');
        console.log('   3. Configure: ipfs://SEU_CID_AQUI');
        console.log('   4. Confirme a transação\n');
        
        // Salvar instruções em arquivo
        const instructions = `
# Instruções de Upload para Lighthouse

## Arquivo preparado:
${zipPath}

## Passos:

1. Acesse: https://lighthouse.storage/
2. Faça login
3. Vá em "Upload" → "Upload Folder"
4. Selecione: dist-boot-for-upload.zip
5. Aguarde o upload
6. Copie o CID retornado

## Após obter o CID:

1. Acesse: https://app.ens.domains/name/neoprotocol.eth/details
2. Vá em "Records" → "Content"
3. Configure: ipfs://SEU_CID
4. Confirme a transação

## Links de acesso (após configurar ENS):

- https://gateway.lighthouse.storage/ipfs/SEU_CID
- https://ipfs.io/ipfs/SEU_CID
- https://cloudflare-ipfs.com/ipfs/SEU_CID
- neoprotocol.eth (via ENS)
`;
        
        writeFileSync(
          join(rootDir, 'UPLOAD_INSTRUCTIONS.md'),
          instructions,
          'utf-8'
        );
        
        console.log('💾 Instruções salvas em UPLOAD_INSTRUCTIONS.md\n');
        
        resolve(zipPath);
      });

      archive.on('error', reject);
      archive.pipe(output);
      archive.directory(distBootPath, false);
      archive.finalize();
    });

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executar
prepareForUpload().catch(error => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});

