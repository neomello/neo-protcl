# ⏱️ Tempo de Propagação do ENS

## 📋 Após atualizar o Content Hash no ENS

### Tempos de Propagação

- **Transação na blockchain**: ~1-2 minutos
- **Propagação básica do ENS**: 2-5 minutos  
- **Propagação completa**: 10-30 minutos
- **Cache dos gateways**: Pode levar até 1 hora

## 🔍 Como Verificar

### Opção 1: Script de Verificação

```bash
npm run check:ens
```

Ou:

```bash
make check-ens
```

### Opção 2: Testar Manualmente

Teste diferentes gateways:

1. **ENS Link**: https://neoprotocol.eth.link
2. **ENS Limo**: https://neoprotocol.eth.limo  
3. **Brave Browser**: Digite `neoprotocol.eth` diretamente
4. **MetaMask**: Digite `neoprotocol.eth` no navegador

### Opção 3: Verificar Content Hash

1. Acesse: https://app.ens.domains/name/neoprotocol.eth/details
2. Vá em "Records" → "Content"
3. Verifique se o Content Hash está correto

## ⚠️ Se não funcionar após 30 minutos

### Checklist de Troubleshooting

- [ ] Content Hash está configurado corretamente no ENS?
- [ ] CID está correto? (verifique no `.ipfs-cid` se existir)
- [ ] Transação foi confirmada na blockchain?
- [ ] Tentou limpar cache do navegador? (Cmd+Shift+R)
- [ ] Testou em modo anônimo?
- [ ] Testou diferentes gateways (.link, .limo)?

### Erro "Content Unreachable"

Se aparecer "Content Unreachable":

1. **Verifique o CID diretamente no IPFS:**
   ```
   https://ipfs.io/ipfs/SEU_CID
   https://gateway.lighthouse.storage/ipfs/SEU_CID
   ```

2. **Se o CID direto funciona mas o ENS não:**
   - Aguarde mais alguns minutos
   - Tente diferentes gateways
   - Verifique se o Content Hash está correto no ENS

3. **Se o CID direto também não funciona:**
   - O conteúdo pode não estar totalmente propagado no IPFS
   - Aguarde 10-15 minutos e tente novamente
   - Verifique se o upload foi concluído com sucesso

## 💡 Dicas

- **Use `.link` ou `.limo`**: Geralmente propagam mais rápido
- **Limpe o cache**: Cmd+Shift+R (Mac) ou Ctrl+Shift+R (Windows/Linux)
- **Teste em modo anônimo**: Evita problemas de cache
- **Aguarde pacientemente**: A propagação pode levar até 1 hora em alguns casos

## 🎯 Formato Correto do Content Hash

**✅ CORRETO:**
```
ipfs://QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**❌ ERRADO:**
```
QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
(Sem o prefixo `ipfs://`)

## 📞 Ainda com problemas?

Se após 1 hora ainda não funcionar:

1. Verifique se o CID está correto no ENS
2. Teste o CID diretamente nos gateways IPFS
3. Verifique se o upload foi concluído com sucesso
4. Considere fazer um novo upload e atualizar o CID

