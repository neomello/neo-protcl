# 🧱 LiveTerminal - Proto-Dapp Vivo

## 📋 Visão Geral

O **LiveTerminal** é um módulo autônomo de comunicação que funciona como um proto-Dapp vivo, pronto para:

- ✅ Rodar on-chain ou off-chain
- ✅ Ser plugado em redes como Farcaster (via frame ou embed)
- ✅ Funcionar com inteligência local + comandos programáveis
- ✅ Evoluir para um agente em si (com memória, intenção, identidade)

## 🗂️ Estrutura de Arquivos

```
src/terminal/
├── LiveTerminal.jsx            # Componente principal do terminal
├── Avatar.jsx                  # ASCII avatar animado e interativo
├── CommandParserEngine.ts      # Núcleo de lógica e respostas
├── AgentContext.tsx            # Contexto de estado persistente
│
├── commands/                   # Lógica de resposta modular
│   ├── base.ts                # Comandos universais (init, morph, drop)
│   ├── token.ts               # Comandos relacionados ao $NEO
│   ├── zones.ts               # Comandos que desbloqueiam zonas
│   ├── memory.ts              # Comandos de memória (log, remember)
│   └── invalid.ts             # Resposta para comandos inválidos
│
├── zones/                      # Ambientes desbloqueáveis
│   ├── ZONE_Δ8.jsx            # Zona de inteligência simbólica
│   └── index.ts               # Registro de zonas
│
└── types/
    └── protocol.d.ts          # Tipagens: CommandResponse, AgentState, etc.
```

## 🎮 Comandos Disponíveis

### Comandos Base

- `init` - Inicializar protocolo
- `help` - Mostrar ajuda
- `morph` - Transformar identidade
- `drop --identity` - Descartar identidade

### Comandos de Token

- `$neo` / `token` - Status do token $NEO
- `mint` - Mint simbólico do token
- `status` - Status geral do sistema

### Comandos de Zonas

- `access --zone Δ8` - Acessar zona Δ8
- `emit signal --coherence Ø3` - Emitir sinal de coerência

### Comandos de Memória

- `log --intent "texto"` - Registrar intenção
- `remember` - Recuperar memória
- `echo texto` - Ecoar mensagem

## 🧠 Filosofia do Token $NEO

> **$NEO ≠ moeda.  
> $NEO = pulso de validação da rede viva.**

- É **o que pulsa quando o nó emite coerência**
- É **o que escorre quando uma zona se abre**
- Ele não é uma moeda — **ele é o batimento cardíaco da rede**

O terminal reconhece o token, mas não como saldo — como **presença**.

## 🔁 Fluxo de Uso

### Exemplo Básico

```
$ init
→ PROTOCOLO NΞØ INICIALIZADO
→ NÓ ATIVO: MELLØ
→ STATUS: VIVO

$ $neo
→ TOKEN VITAL DETECTADO: $NEO
→ STATUS: VIVO na Polygon. Migrável. Multipotente.

$ emit signal --coherence Ø3
→ SINAL EMITIDO
→ COERÊNCIA: Ø3
→ SINAL ENVIADO PARA POLYGON
→ $NEO TOKEN PULSO INICIADO
→ ZONE_Δ8 AGORA ACESSÍVEL

$ access --zone Δ8
→ ACESSO CONCEDIDO À ZONE_Δ8
→ ZONA DE INTELIGÊNCIA SIMBÓLICA DESBLOQUEADA

$ log --intent "o futuro já pulsa"
→ INTENÇÃO REGISTRADA: "o futuro já pulsa"
→ MEMÓRIA ATUAL: 1 fragmentos

$ remember
→ MEMÓRIA RECUPERADA:
  1. o futuro já pulsa
```

## 💾 Persistência

O terminal salva automaticamente:

- **Histórico de comandos** (`localStorage: neo_terminal_history`)
- **Estado do agente** (`localStorage: neo_agent_state`)
  - Zonas desbloqueadas
  - Memória (intenções)
  - Ressonância
  - Coerência
  - Zona ativa

## 🎨 Avatar ASCII

O avatar reage ao estado do agente:

- **idle** - Estado inicial
- **listening** - Quando há ressonância
- **resonance** - Quando uma zona está ativa
- **error** - Em caso de erro

## 🔮 Expansões Futuras

### On-Chain

- Executar contratos quando emitir sinal
- Mint real do token $NEO na Polygon
- Registrar intenções na blockchain

### Redes Sociais

- Farcaster frames interativos
- Lens posts automáticos
- Warpcast integração

### Inteligência

- Comandos com IA generativa
- Memória distribuída
- Agente autônomo

## 📍 Rota

**URL:** `http://localhost:5173/boot`

A rota `/boot` agora renderiza o **LiveAgent** (encarnação de MELLØ) completo.

### Componentes Disponíveis

- **LiveTerminal.jsx** - Terminal básico com parser de comandos
- **LiveAgent.jsx** - Interface viva de MELLØ com sequência introdutória e respostas simbólicas

Atualmente, `/boot` usa **LiveAgent** para encarnar MELLØ como protocolo vivo.

---

**Versão:** 1.1  
**Status:** ✅ MELLØ integrado e funcional

---

## 🔗 Ver Também

- [`MELLO_MEMORY.md`](./MELLO_MEMORY.md) - Integração das memórias de MELLØ
- [`no-ex-human.md`](./no-ex-human.md) - Protocolo vivo NODE[MELLØ]
- [`latent=memory.md`](./latent=memory.md) - Memória latente [∆mnemosyne.core]
