# Estratégia de Transição: Protocol Shell NΞØ (Home Desktop & Mobile)

Este documento estabelece a arquitetura e o plano de execução para converter o frontend da Home (Desktop e Mobile) do NΞØ PROTOCOL em um nó de acesso técnico (Protocol Shell).

## 1. Escopo Unificado

- **Alvo:** Home Desktop (`src/pages/home/NeoProtocolDesktop.jsx`) e Home Mobile (`src/pages/home/NeoProtocolMobile.jsx`).
- **Excluídos:** `/register`, `/nos`, `/manifesto`. Estas rotas permanecem intactas, encapsuladas apenas conceitualmente como futuros estados de foco.
- **Regra de Consistência:** A experiência mobile deve espelhar a densidade técnica do desktop, adaptada para interações de toque (touch-optimized terminal/telemetry).

## 2. Arquitetura de Execução

### Camadas da Interface

1. **Background Layer:** Estático ou Canvas 2D simples (Fase 0/1). Reatividade visual apenas após a integração de estado real (Fase 2+).
2. **Telemetry Layer:** Painéis periféricos exibindo no mínimo:
   - `network_status`
   - `mcp_status`
   - `local_identity_state`
   - `last_event`
3. **Action Layer:** `CommandInput` central como entrada primária (stdin).
   - **Regra de Ouro:** Não é busca. Não há sugestões amigáveis. Comandos inválidos retornam `NOT_IMPLEMENTED` de forma explícita.

## 3. Implementação Técnica

- **Local-First:** O estado exibido reflete diretamente o `localStorage` e o `IdentityGraph` do operador.
- **Densidade:** Redução de espaços em branco institucionais em favor de dados brutos e logs de sistema.

## 4. Roadmap por Fases

### Fase 0: Corte e Limpeza (Atual)

- **Objetivo:** Remover ruído institucional e slogans da Home Desktop.
- **Entregáveis:** Remoção de carrosséis de frases, heros explicativos e links de navegação em galeria.
- **Duração:** 1 dia.
- **Teste:** Visual (Eliminação total de marketing).

### Fase 1: Protocol Shell Mínimo

- **Objetivo:** Estabelecer a moldura operacional e Command Input.
- **Duração:** 2 dias.

### Fase 2: Estado e Telemetria

- **Objetivo:** Expor os 4 sinais obrigatórios no primeiro frame.
- **Duração:** 2 dias.

### Fase 3: Ciclo de Intenção e Feedback

- **Objetivo:** Processamento de comandos e logs sistêmicos.
- **Duração:** 2 dias.

---

## 5. Regra de Decisão Final

Priorizar sempre **menos UI, menos texto e menos explicação**. Se parecer um site, pare e remova.
