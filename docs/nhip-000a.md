# NHIP-000a — Proof of Intention Trigger Specification

**Especificação Formal do Gatilho do PoI no Protocolo NΞØ**

**Categoria:** NHIP  
**Status:** Ativo · Congelado  
**Camada:** Semântica Operacional (Off-Chain)  
**Dependências:** NHIP-000, NHIP-001  
**Autor:** MELLØ  
**Ano:** 2025

---

## 0. PREÂMBULO (LEIA OU NÃO EXECUTA)

O Proof of Intention (PoI) não é um evento,  
não é um pedido,  
não é um direito.

O PoI é um estado emergente reconhecido pelo sistema quando uma entidade atravessa um limiar semântico-operacional definido pelo Protocolo NΞØ.

Este documento define exclusivamente:

- quando o PoI é considerado atingido
- quem pode reconhecê-lo
- o que acontece depois
- e, principalmente, o que nunca acontece automaticamente

---

## 1. DEFINIÇÃO FORMAL DE GATILHO

O gatilho do Proof of Intention ocorre **se e somente se**  
todos os critérios definidos neste documento forem **simultaneamente verdadeiros**  
dentro de um mesmo contexto operacional validado.

Nenhum critério isolado é suficiente.  
Nenhuma exceção é permitida.

---

## 2. ENTIDADES ENVOLVIDAS

### 2.1 Entidade Avaliada (Candidate Node)

Qualquer entidade capaz de ação verificável:

- humano
- agente IA
- bot
- contrato externo
- sistema híbrido

### 2.2 Sistema Avaliador

O gatilho não é avaliado por humanos isolados.

Ele é avaliado por:

- MCP Context Guard
- MCP Intent Engine
- regras definidas em NHIP-000 / NHIP-000a

### 2.3 Autoridade de Ancoragem

- Guardian definido no NHIP-001
- Multisig ou contrato proxy reconhecido

⚠️ **Importante:**  
O Guardian não avalia PoI.  
Ele apenas ancora estados já reconhecidos.

**Restrição Arquitetural:**  
O Guardian não pode ser um agente único humano de forma permanente.  
A autoridade deve evoluir para multisig ou contrato proxy reconhecido.

---

## 3. CRITÉRIOS DO GATILHO (OBRIGATÓRIOS)

O gatilho do PoI é ativado quando todos os critérios abaixo são satisfeitos:

### 3.1 Declaração de Intent Válida

A entidade deve declarar explicitamente uma intent permitida.

**Formato mínimo:**

```
intent: "apresentacao"
```

**Regras:**

- intents fora da whitelist são rejeitadas
- intents ambíguas são rejeitadas
- intents performáticas sem ação associada são ignoradas

### 3.2 Ação Verificável Associada

A intent deve estar ligada a uma ação real, observável e verificável.

**Exemplos válidos (não exaustivos):**

- contribuição técnica rastreável
  - PR, código, deploy, contrato
- criação de infraestrutura
- evento executado
- artefato funcional publicado
- interação protocolar mensurável

**Exemplos inválidos:**

- promessas
- ideias
- textos opinativos
- declarações sem efeito
- "interesse em participar"

### 3.3 Coerência de Contexto

O contexto da ação deve ser coerente com:

- o domínio declarado
- o histórico da entidade
- a ontologia do NΞØ

Violação de contexto invalida o gatilho, mesmo com ação real.

### 3.4 Ausência de Violação Ontológica

A entidade não pode:

- tentar centralizar poder
- tentar burlar o protocolo
- tentar mover o gatilho para on-chain
- solicitar exceções
- misturar domínios sem autorização
- executar intents bloqueados

Uma única violação zera o processo.

### 3.5 Threshold de Impacto Mínimo (CRÍTICO)

O PoI não é binário.  
Ele exige massa crítica mínima.

**Definição formal:**

```
PoI_Threshold ≥ T_min
```

Onde:

- `PoI_Threshold` = soma ponderada dos impactos verificados
- `T_min` = limiar definido pelo Hub

---

## 4. MODELO DE THRESHOLD (VERSÃO CANÔNICA)

### 4.1 Componentes do Threshold

O impacto é calculado como:

```
PoI_Threshold = A + C + R
```

Onde:

- **A (Action Weight)**  
  Peso da ação executada  
  (complexidade, esforço, irreversibilidade)

- **C (Context Coherence)**  
  Grau de alinhamento entre ação, domínio e ontologia

- **R (Reputation Delta)**  
  Histórico prévio de execução consistente (se houver)

### 4.2 Valores de Referência (inicial)

| Componente | Intervalo |
| ---------- | --------- |
| A          | 0 – 60    |
| C          | 0 – 30    |
| R          | 0 – 10    |
| **T_min**  | **70**    |

⚠️ **Observações importantes:**

- Threshold não é gamificado
- Não há UI de score
- Valores não são expostos ao candidato
- Ajustes só via NHIP futuro
- **O threshold não representa pontuação objetiva, mas convergência mínima entre execução, coerência e impacto**

---

## 5. CONDIÇÃO DE ATIVAÇÃO DO GATILHO

O gatilho é considerado **ATINGIDO** quando:

```
intent ∈ whitelist
AND action.isVerifiable == true
AND context.isCoherent == true
AND noOntologicalViolation == true
AND PoI_Threshold ≥ T_min
```

Qualquer falha aborta silenciosamente o processo.

Não há feedback explicativo.

---

## 6. EFEITOS DO GATILHO (IMPORTANTÍSSIMO)

Quando o gatilho é atingido:

- ✅ O PoI é reconhecido off-chain
- ❌ Nenhuma ação on-chain é automática
- ❌ Nenhum direito é concedido
- ❌ Nenhuma permissão é escalada

O único efeito permitido é:

> **AUTORIZAÇÃO PARA ANCORAGEM**

---

## 7. RELAÇÃO COM NHIP-001 (ON-CHAIN)

Após o reconhecimento do PoI:

- o Guardian **pode**, mas **não é obrigado** a:
  - chamar `registerNode()` no NodeRegistry
- a decisão de ancoragem considera:
  - saúde do ecossistema
  - timing
  - equilíbrio topológico

⚠️ **O PoI não força o contrato.  
Ele habilita o selo.**

---

## 8. O QUE ESTE DOCUMENTO PROÍBE EXPLICITAMENTE

Este protocolo proíbe:

- PoI permissionless
- PoI automático on-chain
- PoI por pagamento
- PoI por voto
- PoI por indicação social
- PoI por volume de interação
- PoI por engajamento
- PoI explicado em onboarding

---

## 9. FALHAS E SILÊNCIO

O NΞØ não responde falhas de PoI.

Se o gatilho não é atingido:

- nada acontece
- nenhum erro é emitido
- nenhum feedback é fornecido

**Silêncio também é resposta.**

---

## 10. CONGELAMENTO DO PROTOCOLO

Este documento:

- só pode ser alterado via NHIP formal
- exige consenso do núcleo validador
- qualquer fork deve declarar divergência explícita

---

## 11. DECLARAÇÃO FINAL

Intenção não se pede.  
Execução não se explica.  
Reconhecimento não se negocia.

O Proof of Intention não seleciona pessoas.  
Ele detecta estados.

Se este gatilho não dispara em você,  
o protocolo permanece inerte.

E isso é o funcionamento correto.

---

**NHIP-000a // Proof of Intention é Limiar, não Interface**

---

## 📚 Referências

- [NHIP-000 — NΞØ Hub Intake Protocol](./nhip-000.md)
- [NHIP-001 — NodeRegistry.sol](./nhip-001.md)
- [Proof of Intention Architecture](./PROOF_OF_INTENTION_ARCHITECTURE.md)

---

**Status:** Ativo · Congelado | **Autor:** MELLØ | **Ano:** 2025
