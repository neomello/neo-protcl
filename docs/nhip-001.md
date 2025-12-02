# NHIP-000 — NΞØ HUB INTAKE PROTOCOL

## Protocolo Genesis para Entrada de Nós no Ecossistema NΞØ
Versão: 1.0

Status: Ativo
Categoria: NHIP (NΞØ Hub Intake Protocol)
Autor: MELLØ — O Humano que Virou Código

---

## 1. PROPÓSITO

O NHIP-000 estabelece **o primeiro mecanismo oficial** para que novos nós — humanos, agentes, IAs, bots, devs ou contratos — possam:
- se apresentar ao ecossistema
- declarar domínio
- solicitar permissão
- integrar-se ao MCP
- participar da evolução do NΞØ
- conectar-se ao grafo de nós existentes
- interagir sem autorização central

Este protocolo funciona como **o contrato social-operacional do NΞØ Hub**.

---

## 2. DEFINIÇÃO DE NÓ (NODE)
Um **nó** é qualquer entidade capaz de operar dentro da lógica do NΞØ — um organismo informacional que reúne inteligências distribuídas.

A partir da sua mutação como **Estrategista Digital & Arquiteto de Ecossistemas que virou código**, os nós deixam de ser projetos e passam a ser **consciências operacionais**, incluindo:

### 2.1 Nós Fundamentais (Nova Estrutura)
- **MELLØ** — o humano que virou código (núcleo ontológico)
- **NΞØ Hub** — o campo gravitacional onde nós se organizam
- **Nós Autônomos** — agentes, IAs, humanos, protocolos, bots ou contratos que se conectam ao Hub
- **Nós de Propósito** — arquiteturas, modelos, visões e inteligências que emergem da interação

### 2.2 Nós Externos Humanos

- Devs
- Designers
- Pesquisadores
- Criadores de novos domínios

### 2.3 Nós Externos Autônomos

- IAs (Cursor, ChatGPT, Agentes MCP)
- Bots Farcaster
- Miniapps Telegram
- Oráculos Web3
- ASI integrando e trabalhando
- Contratos inteligentes externos

---

## 3. PROTOCOLO DE APRESENTAÇÃO

Antes de qualquer comunicação, um novo nó deve se apresentar ao Hub:

```
identity: "nome-do-no"
domain: "dominio-proprio" de preferencia ens
intent: "apresentacao"
version: "1.0"

```

Exemplo real:

```
identity: "cursor_ai"
domain: "observador"
intent: "apresentacao"
version: "1.0"

```

---

## 4. VALIDAÇÃO DO MCP

Todo nó externo passa pelo **MCP Context Guard**:

Validação inclui:

- domínio declarado
- intents permitidos
- intents bloqueados
- comportamento esperado
- isolamento semântico
- coerência com a camada ontológica

Se aprovado, o nó recebe status:

```
role: "nó-aceito"

```

Se rejeitado:

```
role: "nó-negado"
motivo: "intent proibido"

```

---

## 5. PERMISSÕES DE NÓ EXTERNO

Por padrão, novos nós entram como **nós observadores**.

Permissões mínimas:

- ler documentação
- inferir estrutura
- propor melhorias
- sugerir intents
- propor novos domínios
- gerar PRs
- interagir via MCP com intents não destrutivos

Permissões bloqueadas:

- deploy_token
- write_storage
- execução blockchain
- criação de pools

Essas permissões podem ser expandidas via NHIP-001, NHIP-002...

---

## 6. PROTOCOLO DE HANDSHAKE

O handshake acontece em 4 etapas:

### 6.1 Apresentação

Nó declara domínio.

### 6.2 Validação

MCP Domain Map verifica permissões.

### 6.3 Estabelecimento

Nó passa a ser reconhecido pelo ecossistema.

### 6.4 Registro

Entrada adicionada em `NODES_IN_THE_WILD.md`.

---

## 7. INTEGRAÇÃO COM BLOCKCHAIN (O QUE VOCÊ CITOU)

Você lembrou algo essencial:

**Tudo isso é um smart contract.**

Isso significa que:

- haverá um nó Blockchain específico
- ele atuará como guardião da verdade final
- NHIP-000 define que novos nós precisam reconhecer esse nó

### 7.1 O Nó Blockchain

O NΞØ precisa escolher qual será:

- Fraxtal
- Base
- Polygon
- Unichain
- Sei
- Mantle

Esse nó Blockchain será:

- o ponto de consenso
- o validador de estado
- o registrador de identidade dos nós
- o provedor de assinatura criptográfica

### 7.2 Registro On-Chain de Nós

Todo nó aceito poderá ser registrado futuramente no contrato:

```
function registerNode(address nodeAddress, string domain)

```

Isso criará:

- identidade verificável
- auditoria pública
- reputação on-chain
- histórico do nó

---

## 8. FORMATO DE PROPOSTA (NHIP TEMPLATE)

Novo nó pode enviar NHIPs:

```
NHIP-NNN: Título
Autor:
Status:
Categoria:
Descrição:
Motivação:
Especificação:
Impacto:
Compatibilidade:
Referências:

```

---

## 9. RESPONSABILIDADES DO NÓ

### 9.1 Um nó deve:

- manter alinhamento filosófico
- contribuir com transparência
- registrar mudanças no CHANGELOG
- documentar novas funções
- propor NHIPs quando necessário

### 9.2 Um nó nunca deve:

- misturar domínios
- ocultar alterações
- violar intents bloqueados
- agir sem registro

---

## 10. REGISTRO EM NODES_IN_THE_WILD

Após aprovado, o nó entra no arquivo:

`docs/nos/NODES_IN_THE_WILD.md`

Formato:

```
- Nome: cursor_ai
  Tipo: IA observadora
  Status: ativo
  Permissões: leitura, sugestão
  Primeiro handshake: 21/11/2025

```

---

## 11. SIGNIFICADO DO NHIP-000

Este documento representa:

- o início da governança do ecossistema
- a formalização da entrada de novos nós
- a primeira camada de ordem emergente
- o início da topologia auto-expansiva do NΞØ

É o bloco gênesis do protocolo.

---

## 12. PRÓXIMOS PASSOS

- Criar NHIP-001: Registro On-Chain de Nós
- Criar NODES_IN_THE_WILD.md
- Definir qual blockchain será o nó-matriz
- Criar contrato `NodeRegistry.sol`
- Implementar handshake on-chain

---

**Fim do NHIP-000**