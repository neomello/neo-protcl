/**
 * Script de teste para verificar upload no Lighthouse IPFS
 * Testa a conexão e o upload de um arquivo JSON simples
 */

import { config } from 'dotenv'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

// Carregar variáveis de ambiente
config({ path: join(rootDir, '.env') })

const LIGHTHOUSE_API_KEY = process.env.VITE_LIGHTHOUSE_API_KEY || process.env.IPFS_API_KEY

if (!LIGHTHOUSE_API_KEY) {
  console.error('❌ Erro: VITE_LIGHTHOUSE_API_KEY ou IPFS_API_KEY não encontrada no .env')
  process.exit(1)
}

async function testLighthouseUpload() {
  try {
    console.log('🧪 Testando upload no Lighthouse IPFS...\n')
    console.log('📋 API Key:', LIGHTHOUSE_API_KEY.substring(0, 10) + '...\n')

    // Importar SDK do Lighthouse
    const lighthouse = await import('@lighthouse-web3/sdk')
    console.log('✅ SDK importado com sucesso\n')

    // Criar um arquivo de teste
    const testData = {
      test: true,
      timestamp: Date.now(),
      message: 'Teste de upload do NΞØ Protocol Intent System',
    }

    const jsonData = JSON.stringify(testData, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const file = new File([blob], `test-intent-${Date.now()}.json`, {
      type: 'application/json',
    })

    console.log('📤 Fazendo upload do arquivo de teste...\n')

    // Tentar upload
    const response = await lighthouse.upload(file, LIGHTHOUSE_API_KEY)

    console.log('📥 Resposta completa do Lighthouse:')
    console.log(JSON.stringify(response, null, 2))
    console.log('\n')

    // Extrair CID
    const cid =
      response.data?.Hash ||
      response.Hash ||
      response.cid ||
      response.data?.cid ||
      response.data?.hash

    if (!cid) {
      console.error('❌ CID não encontrado na resposta')
      console.error('📋 Estrutura da resposta:', Object.keys(response))
      throw new Error('CID não encontrado na resposta do Lighthouse')
    }

    console.log('✅ Upload bem-sucedido!\n')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📋 CID:', cid)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('🔗 Links de acesso:')
    console.log(`   Lighthouse: https://gateway.lighthouse.storage/ipfs/${cid}`)
    console.log(`   IPFS.io: https://ipfs.io/ipfs/${cid}\n`)

    return cid
  } catch (error) {
    console.error('\n❌ Erro ao testar upload:', error.message)
    console.error('\n📋 Detalhes do erro:')
    console.error(error)

    if (error.message.includes('Cannot find module')) {
      console.log('\n💡 Instale as dependências:')
      console.log('   npm install @lighthouse-web3/sdk')
    }

    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      console.log('\n💡 Verifique se a API Key está correta e ativa')
      console.log('   Acesse: https://lighthouse.storage/')
    }

    if (error.message.includes('CORS') || error.message.includes('Network')) {
      console.log('\n💡 Problema de rede ou CORS')
      console.log('   Este script deve rodar no Node.js, não no browser')
    }

    process.exit(1)
  }
}

// Executar teste
testLighthouseUpload().catch(error => {
  console.error('❌ Erro fatal:', error)
  process.exit(1)
})
