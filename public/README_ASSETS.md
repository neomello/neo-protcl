# 📁 Estrutura de Assets - NΞØ Protocol

## 🌐 ENS Domain

**neoprotocol.eth**

## 📍 Localização dos Arquivos

Todos os arquivos estáticos (imagens, ícones, fontes) devem ser colocados na pasta `public/`.

## 🗂️ Estrutura de Pastas

```
public/
├── logos/              # Logos do projeto
│   ├── neo_ico.png     # Logo principal (ícone) - usado no hero
│   └── neowhite.png    # Logo branco - usado no footer
├── images/             # Outras imagens do projeto
│   ├── hero/           # Imagens da seção hero (opcional)
│   ├── sections/       # Imagens das seções (opcional)
│   └── backgrounds/    # Imagens de fundo (opcional)
├── favicons/           # Ícones do navegador
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   └── apple-touch-icon.png
└── fonts/              # Fontes customizadas (se necessário)
```

## 📝 Arquivos Necessários

### Logos (obrigatórios)

1. **`public/logos/neo_ico.png`**
   - Tamanho recomendado: 128x128px ou 256x256px
   - Formato: PNG com transparência
   - Uso: Logo principal no hero da página

2. **`public/logos/neowhite.png`**
   - Tamanho recomendado: 80px de largura (altura proporcional)
   - Formato: PNG com transparência
   - Uso: Logo no footer da página

### Favicons (opcional, mas recomendado)

- `favicon.ico` - 16x16, 32x32, 48x48
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` - 180x180px

## 🔗 Como Referenciar os Arquivos

No código React, os arquivos em `public/` são referenciados com caminho absoluto começando com `/`:

```jsx
// ✅ Correto
<img src="/logos/neo_ico.png" alt="NΞØ Protocol" />

// ❌ Incorreto (não funciona)
<img src="./logos/neo_ico.png" alt="NΞØ Protocol" />
<img src="../public/logos/neo_ico.png" alt="NΞØ Protocol" />
```

## 📐 Especificações Técnicas Recomendadas

### Logos

- **Formato**: PNG com transparência
- **Resolução**: Mínimo 2x para telas Retina
- **Tamanho de arquivo**: Otimizado (use ferramentas como TinyPNG)

### Imagens Gerais

- **Formato**: WebP (melhor compressão) ou PNG/JPG
- **Lazy loading**: Considere usar `loading="lazy"` em imagens abaixo da dobra

## 🎨 Identidade Visual

Se você tiver outros elementos da identidade visual:

- **Cores**: Defina no `tailwind.config.js` se necessário
- **Fontes**: Coloque em `public/fonts/` e importe no CSS
- **Ícones**: Use bibliotecas como React Icons ou coloque SVGs em `public/icons/`

## 📦 Otimização

Antes de adicionar imagens grandes, considere:

- Comprimir com ferramentas como TinyPNG, ImageOptim
- Converter para WebP quando possível
- Usar diferentes tamanhos para mobile/desktop se necessário
