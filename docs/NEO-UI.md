# NΞØ.UI — Design System v0.1

**Sistema visual do Protocolo NΞØ**
Autoria: MELLØ + NΞØ:One
Status: Genesis Build

---

# ◉ 1. Princípios Fundamentais

Esses princípios orientam qualquer elemento do ecossistema.

### ∴ 1.1. Anti-ornamento

Sem cores chamativas, sem brilhos, sem “futuro ilustrado”.
O futuro aqui é **frio, cognitivo, minimal, pós-simbólico**.

### ∴ 1.2. Estrutura é significado

Linhas, divisores e fractais **não decoram**, eles **transmitem estado**.
Toda forma carrega intenção.

### ∴ 1.3. Falha como estética

Glitch é linguagem.
Interferência é metáfora.
Nada é perfeito — tudo é vivo.

### ∴ 1.4. Matéria negra

O preto não é estilo; é filosofia.
O Ø nasce do vazio fértil.

### ∴ 1.5. Consciência modular

Cada componente é um nó.
Cada nó é autônomo, mas conectado a um protocolo maior.

---

# ◉ 2. Paleta Cromática (NΞØ Spectrum)

A cor no NΞØ não grita; ela **revela presença**.

### Primárias

```
Void.Black      #000000
Depth.Gray      #0B0D10
Carbon.Shd      #13161A
```

### Acentos (para fraturas, sinais, interferências)

```
Anomaly.Blue    #1A9AF7
Glitch.Cyan     #34E1FF
Signal.Violet   #7B5DFF
Pulse.Purple    #8D2BFF (uso raro)
```

### Sem luz, sem neon, sem gradientes excitados.

Tudo é **matte, frio, técnico**.

---

# ◉ 3. Tipografia

O texto do NΞØ não “aparece”; ele **pensa**.

### Fonte primária

**Inter** (peso 100–600)
Uso: interfaces, docs, terminal, manifesto.

### Fonte secundária (opcional)

**JetBrains Mono**
Uso: CLI, prompts, código, blocos técnicos.

### Filosofia:

• sem serifas
• sem personalidade humana
• fluida, cognitiva, limpa

---

# ◉ 4. Grid e Espaçamento

O NΞØ não usa espaçamento de 4/8/16 como UI tradicional.
Ele usa **métrica fractal**.

```
x = 6px
1x  = unidade mínima
2x  = cluster pequeno
3x  = respiração
5x  = seção
8x  = bloco
13x = fractal especial (header/manifesto)
```

Por quê?
Porque 6 é número estrutural que ecoa a lógica modular do Protocolo (hex, clusters, fractais).

---

# ◉ 5. Biblioteca de Partículas (Core Symbols)

A gramática que substitui ícones e emojis.

```
⟡  núcleo / essência
⦾  foco / presença ativa
⊘  identidade nula
◍  atividade parcial
⌁  interferência
↯  energia instável
⧉  duplicação
⟲  loop interno
⟳  loop externo
⋮  continuidade
╌  linha fraturada
⦙  divisor singular
⊚  identidade ativa
✶  evento inesperado
⟴  propagação
```

Esta é a sua **língua visual**.
Nada mais entra além disso.

---

# ◉ 6. Componentes Base (Atoms)

Os blocos mínimos do NΞØ.UI

### ∎ 6.1. Cards

Formato: **bordas arredondadas 14px**, fundo preto profundo com `Depth.Gray` levemente visível.
Borda: opcional, `1px Glitch.Cyan` com 3% de distorção.
Shadow: nunca.
Glow: nunca.

Estado interno:
• Header: Inter 600, `Glitch.Cyan`
• Subtexto: Inter 300, `#A3AAB5`
• Partícula associada: sempre uma (⟡, ⧉, ⟲ etc.)

### ∎ 6.2. Botões

Nunca usar bordas sólidas coloridas.

**Primário**

```
background: #0B0D10
border: 1px solid #1A9AF7
text: #1A9AF7
```

**Secundário**

```
background: transparent
border: 1px dashed #7B5DFF
```

Hover: apenas leve “interferência”

```
filter: saturate(115%) blur(0.2px)
```

### ∎ 6.3. Divisores

Nunca `hr` tradicional.

Usar:

```
╌
⦙
⋯
⌇
```

---

# ◉ 7. Componentes Avançados (Molecules)

### 7.1. Painel de Estado do Nó

Elementos:

• símbolo central (⟡, ⯈, ⦾ etc.)
• latência
• conexão wallet
• reputação (algorítmica)
• propagação
• atividade recente

Funciona quase como HUD:
um painel “de leitura”, não “de decoração”.

### 7.2. Console NΞØ (terminal embed)

Fundo: `#000000`
Texto: `Anomaly.Blue`
Interferência leve (1–2px horizontal shift randômico a cada 8–12s)

### 7.3. Stack de Documentação

Cada seção inicia com uma partícula:

```
⦙ Princípios
⟡ Estruturas
⊘ Identidade
⧉ Integrações
⟴ Propagação
```

---

# ◉ 8. Patterns Específicos (HUD / Fractal)

### 8.1. Fratura Lateral

Uma linha glitch na lateral:

```
╌╌╌╌╌╌╌╌╌╌↯
```

### 8.2. Grid quebrado

pontos dispersos:

```
▪ ▫ ▪ ▫ ▫ ▪ ▫ ▪
```

### 8.3. Interferência modular

“Ruído” calculado:

```
▤▥▦
```

---

# ◉ 9. Sistema de Ícones do Ø

Não usar SVGs bonitinhos.
Usar sempre **interpretações fractalizadas do Ø**.

Variações canônicas:

1. `⊘` — vazio ativo
2. `⦵` — Ø expandido
3. `⦷` — Ø instável
4. `⦶` — Ø foco total
5. Ø corrompido (imagem azul glitch)

---

# ◉ 10. Motion / Animação

Nada de bounce, nada de ease-in-out feliz.

### Regras:

• movimento sempre linear
• deslocamento curto
• micro vibrações
• interferência aleatória
• transições quase imperceptíveis

O NΞØ não “anima”, ele **respira**.

---

# ◉ 11. Pacote de Implementação

Te entrego os módulos para instalar nos seus frontends:

### `/nexoui/variables.css`

• cores
• unidade
• bordas
• tipografia

### `/nexoui/tokens.json`

• partículas
• estados
• símbolos

### `/nexoui/components/`

• Card
• Badge
• Divider
• Button
• NodePanel
• Terminal
• HUD

### `/nexoui/patterns/`

• fractal-lines
• glitch-overlay
• interference-mask

---

# ◉ 12. Documentação para devs

**“If you break the pattern, break with intenção.”**

Todos os componentes devem permitir:

• override de partícula
• override de cor acento
• injeção de glitch
• versão monolito (dark total)

---

# ◉ 13. Conclusão

O NΞØ.UI não é um design system.
É **uma linguagem ontológica**.
É o modo visual como o Protocolo pensa.

Você agora tem:

◍ paleta
◍ tipografia
◍ grid
◍ partículas
◍ componentes
◍ hud
◍ motion
◍ tokens
◍ estrutura de pastas
◍ filosofia estética
