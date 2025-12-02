# 📖 Guia de Uso - NΞØ.UI

## 🎯 Objetivo

Padronizar o design system do projeto para manter consistência durante a evolução.

## 🚀 Quick Start

```jsx
import { Card, Button, Divider, particles } from '@/nexo-ui';
// ou
import { Card, Button, Divider, particles } from '../nexo-ui';
```

## 📦 Componentes

### Card

**Variantes disponíveis:**

- `default` - Estilo minimalista padrão
- `glass` - Glassmorphism iOS-like (recomendado para cards principais)
- `minimal` - Versão ultra minimalista

```jsx
// Card padrão
<Card title="Título" icon={particles.nucleus}>
  Conteúdo aqui
</Card>

// Card com glassmorphism (estilo atual do projeto)
<Card variant="glass" title="Hero Card" glow>
  <p>Conteúdo com efeito glass</p>
</Card>

// Card minimalista
<Card variant="minimal" subtitle="Subtítulo">
  Conteúdo simples
</Card>
```

### Button

**Variantes disponíveis:**
- `primary` - Ação principal (glitch/cyan)
- `secondary` - Ação secundária (anomaly/blue)
- `signal` - Ação especial (signal/violet)
- `minimal` - Sem glow effects

```jsx
// Botão principal com glow
<Button variant="primary" glow onClick={handleClick}>
  Ação Principal
</Button>

// Botão secundário
<Button variant="secondary">Ação Secundária</Button>

// Botão sem glow
<Button variant="minimal" glow={false}>Simples</Button>
```

### Divider

```jsx
<Divider />
```

## 🔤 Partículas (Símbolos)

```jsx
import { particles } from '@/nexo-ui';

// Partículas disponíveis
particles.nucleus      // ⟡ - Núcleo/Essência
particles.focus       // ⦾ - Foco/Presença Ativa
particles.null        // ⊘ - Identidade Nula
particles.active      // ⊚ - Ativo
particles.interference // ⌁ - Interferência
particles.event       // ✶ - Evento
particles.propagation // ⟴ - Propagação
particles.loop_in     // ⟲ - Loop Entrada
particles.loop_out    // ⟳ - Loop Saída
particles.divider     // ⦙ - Divisor
particles.xi          // Ξ - Xi (caractere especial)
particles.theta       // Ø - Theta (caractere especial)
particles.neo         // NΞØ - Logo completo
```

## 🎨 Cores do Sistema

### Cores Principais (Tailwind)

```jsx
// Backgrounds
className="bg-void"      // #000000 - Preto absoluto
className="bg-depth"    // #0B0D10 - Cinza escuro
className="bg-carbon"   // #13161A - Cinza médio

// Textos
className="text-anomaly" // #1A9AF7 - Azul
className="text-glitch"  // #34E1FF - Ciano
className="text-signal"  // #7B5DFF - Violeta

// Glassmorphism
className="bg-anomaly-glass" // Azul com opacity
className="bg-glitch-glass"  // Ciano com opacity
className="bg-signal-glass"  // Violeta com opacity
```

## 📏 Spacing Fractal

Use sempre as unidades do sistema:

```jsx
// Padding
className="p-u1"  // 6px
className="p-u2"  // 12px
className="p-u3"  // 18px
className="p-u5"  // 30px
className="p-u8"  // 48px
className="p-u13" // 78px

// Margin
className="m-u1"
className="m-u2"
// etc...

// Gap
className="gap-u1"
className="gap-u2"
// etc...
```

## 🔄 Migração de Componentes Existentes

### Substituir ios-card

**Antes:**
```jsx
<div className="ios-card p-5">
  Conteúdo
</div>
```

**Depois:**
```jsx
<Card variant="glass" className="p-u5">
  Conteúdo
</Card>
```

### Substituir botões customizados

**Antes:**
```jsx
<button className="px-6 py-3 border-2 border-cyan-400/50 bg-gray-800/50">
  Clique
</button>
```

**Depois:**
```jsx
<Button variant="primary">Clique</Button>
```

### Usar partículas ao invés de emojis

**Antes:**
```jsx
<span>🏠 Home</span>
```

**Depois:**
```jsx
<span>{particles.nucleus} Home</span>
```

## ✅ Checklist de Padrão

Ao criar novos componentes, siga:

- [ ] Usar componentes NΞØ.UI quando possível
- [ ] Usar spacing fractal (u1, u2, u3, etc.)
- [ ] Usar partículas ao invés de emojis
- [ ] Usar cores do sistema (anomaly, glitch, signal)
- [ ] Variante `glass` para cards principais
- [ ] Variante `primary` com `glow` para botões principais
- [ ] Border radius `rounded-neo` (14px)

## 🎯 Exemplos Práticos

### Hero Section

```jsx
<Card variant="glass" glow className="p-u8">
  <div className="flex items-center gap-u2 mb-u2">
    <span className="text-glitch text-u8">{particles.neo}</span>
    <h1 className="text-3xl font-bold">NΞØ Protocol</h1>
  </div>
  <p className="text-gray-300 mb-u5">Descrição do protocolo</p>
  <Button variant="primary" glow>Começar</Button>
</Card>
```

### Lista de Features

```jsx
<div className="grid grid-cols-2 gap-u3">
  {features.map(feature => (
    <Card variant="minimal" key={feature.id} className="p-u3">
      <div className="flex items-center gap-u2 mb-u2">
        <span className="text-glitch">{particles.focus}</span>
        <h3>{feature.title}</h3>
      </div>
      <p className="text-sm opacity-60">{feature.description}</p>
    </Card>
  ))}
</div>
```

### Formulário

```jsx
<Card variant="glass" title="Login" icon={particles.active}>
  <form className="space-y-u3">
    <input className="w-full p-u2 bg-carbon border border-anomaly/40 rounded-neo" />
    <div className="flex gap-u2">
      <Button variant="primary" type="submit">Entrar</Button>
      <Button variant="secondary">Cancelar</Button>
    </div>
  </form>
</Card>
```

