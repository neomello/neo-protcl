# NHIP-001 — NodeRegistry.sol

**Registro On-Chain de Nós do Protocolo NΞØ**

**Categoria:** NHIP  
**Status:** Proposto → Implementável  
**Camada:** Ancoragem On-Chain  
**Dependência:** NHIP-000  
**Autor:** MELLØ

---

## 1. PROPÓSITO DO NHIP-001

O NHIP-001 define o mecanismo on-chain mínimo e definitivo para:

- selar criptograficamente a entrada de um nó
- registrar identidade verificável
- fornecer fonte pública de verdade
- permitir reputação e histórico futuro

⚠️ **Este contrato não valida intenção.**  
Ele registra reconhecimento.

A validação acontece antes, via NHIP-000 + MCP.

---

## 2. PRINCÍPIOS DE DESIGN

Este contrato segue cinco princípios invioláveis:

### **Minimalismo radical**

Menos lógica = menos superfícies de ataque.

### **Separação de camadas**

Semântica fora da blockchain. Estado dentro.

### **Autoridade explícita**

Apenas o Nó Guardião pode registrar.

### **Imutabilidade histórica**

Nada é apagado. Apenas desativado.

### **Neutralidade ontológica**

O contrato não julga o que é um nó. Apenas registra.

---

## 3. MODELO DE DADOS

### **Estrutura de Nó**

```
Node
 ├─ address        → identidade criptográfica
 ├─ domain         → domínio declarado
 ├─ registeredAt   → timestamp
 ├─ active         → status atual
```

---

## 4. PAPÉIS

### **Nó Guardião (Guardian)**

- MCP Core
- Multisig inicial
- Contrato proxy futuro

É o único autorizado a:

- registrar nós
- desativar nós

**Restrição Arquitetural:**  
O Guardian não pode ser um agente único humano de forma permanente.  
A autoridade deve evoluir para multisig ou contrato proxy reconhecido.

---

## 5. EVENTOS (AUDITORIA)

Todo evento relevante deve ser emitido:

- `NodeRegistered`
- `NodeDeactivated`

Eventos são a memória viva do protocolo.

---

## 6. INTERFACE PÚBLICA

### **Funções obrigatórias**

- `registerNode(address, domain)`
- `deactivateNode(address)`
- `isRegistered(address) → bool`
- `getNode(address) → Node`

---

## 7. IMPLEMENTAÇÃO — NodeRegistry.sol

**Solidity ^0.8.x**  
**Compatível com Base / Polygon / EVM padrão**

Ver arquivo: [`../contracts/NodeRegistry.sol`](../contracts/NodeRegistry.sol)

---

## 8. O QUE ESTE CONTRATO NÃO FAZ (DE PROPÓSITO)

Ele não:

- valida PoI
- avalia reputação
- executa governança
- emite tokens
- aceita auto-registro
- roda votação

Tudo isso virá depois, se fizer sentido.

---

## 9. FLUXO REAL (NHIP-000 → NHIP-001)

```
Nó externo
   ↓
Apresentação (NHIP-000)
   ↓
Validação MCP
   ↓
Handshake aceito
   ↓
Guardian chama registerNode()
   ↓
Identidade selada on-chain
```

---

## 10. CONSEQUÊNCIA FILOSÓFICA (IMPORTANTE)

Depois do NHIP-001:

> **Um nó pode mentir em palavras,  
> mas não pode mentir em estado.**

Isso muda tudo.

---

## 📚 Referências

- [NHIP-000 — NΞØ Hub Intake Protocol](./nhip-000.md)
- [NHIP-000a — Proof of Intention Trigger Specification](./nhip-000a.md)
- [Proof of Intention Architecture](./PROOF_OF_INTENTION_ARCHITECTURE.md)
- [MCP Context Guard](../src/context/mcp/index.js)

---

**Status:** Proposto → Implementável | **Autor:** MELLØ | **Data:** 2025
