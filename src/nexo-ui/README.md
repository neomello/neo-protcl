# NΞØ.UI - Sistema Visual Oficial

Sistema de design consistente para o NΞØ Protocol, alinhado com o estilo atual do projeto.

## Princípios

-  **Consistência**: Padrão único para evolução do projeto
-  **Glassmorphism**: Efeitos de vidro e blur
-  **Glow Effects**: Brilhos sutis para elementos interativos
-  **Partículas**: Símbolos únicos incluindo Ξ e Ø

## Componentes

### Card

```jsx
import { Card } from '@/nexo-ui';

// Variante padrão (minimalista)
<Card title="Título" icon={particles.nucleus}>
  Conteúdo
</Card>

// Variante glass (iOS-like)
<Card variant="glass" title="Título" glow>
  Conteúdo com glassmorphism
</Card>

// Variante minimal
<Card variant="minimal" subtitle="Subtítulo">
  Conteúdo minimalista
</Card>
```

### Button

```jsx
import { Button } from '@/nexo-ui';

// Variante primary (com glow)
<Button variant="primary" glow>Clique</Button>

// Variante secondary
<Button variant="secondary">Ação</Button>

// Variante signal
<Button variant="signal">Sinal</Button>

// Variante minimal (sem glow)
<Button variant="minimal" glow={false}>Simples</Button>
```

### Divider

```jsx
import { Divider } from '@/nexo-ui'
;<Divider />
```

## Partículas

```jsx
import { particles } from '@/nexo-ui'

particles.nucleus // ⟡
particles.focus // ⦾
particles.null // ⊘
particles.active // ⊚
particles.xi // Ξ
particles.theta // Ø
particles.neo // NΞØ
```

## Cores

### Cores Principais

-  `bg-void` / `text-void` - Preto absoluto
-  `bg-depth` / `text-depth` - Cinza escuro (#0B0D10)
-  `bg-carbon` / `text-carbon` - Cinza médio (#13161A)
-  `bg-anomaly` / `text-anomaly` - Azul (#1A9AF7)
-  `bg-glitch` / `text-glitch` - Ciano (#34E1FF)
-  `bg-signal` / `text-signal` - Violeta (#7B5DFF)

### Variantes Glassmorphism

-  `bg-anomaly-glass` - Azul com opacity
-  `bg-glitch-glass` - Ciano com opacity
-  `bg-signal-glass` - Violeta com opacity

## Spacing Fractal

Use as unidades do sistema:

-  `p-u1` / `m-u1` - 6px
-  `p-u2` / `m-u2` - 12px
-  `p-u3` / `m-u3` - 18px
-  `p-u5` / `m-u5` - 30px
-  `p-u8` / `m-u8` - 48px
-  `p-u13` / `m-u13` - 78px

## Utilitários

### cn (className merge)

```jsx
import { cn } from '@/nexo-ui'
;<div className={cn('base-class', condition && 'conditional-class')} />
```

### glitch (microinterferência)

```jsx
import { glitch } from '@/nexo-ui'
;<div style={glitch()} />
```

## Guia de Uso

### Quando usar cada variante

**Card:**

-  `default`: Cards informativos, listas
-  `glass`: Cards principais, hero sections
-  `minimal`: Cards secundários, backgrounds

**Button:**

-  `primary`: Ações principais (com glow)
-  `secondary`: Ações secundárias
-  `signal`: Ações especiais/sinais
-  `minimal`: Ações discretas (sem glow)

## Migração

Para migrar componentes existentes:

1.  Substitua `ios-card` por `<Card variant="glass">`
2.  Substitua botões customizados por `<Button variant="primary">`
3.  Use `particles` ao invés de emojis
4.  Use spacing fractal (`u1`, `u2`, etc.) ao invés de valores fixos

---

Author: MELLØ // POST-HUMAN

This project follows my personal working standards.
Changes are allowed, inconsistency is not.
