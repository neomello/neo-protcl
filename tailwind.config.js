/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // NΞØ.UI Core Colors
        void: '#000000',
        depth: '#0B0D10',
        carbon: '#13161A',
        anomaly: '#1A9AF7',
        glitch: '#34E1FF',
        signal: '#7B5DFF',
        // Glassmorphism variants
        'anomaly-glass': 'rgba(26, 154, 247, 0.2)',
        'glitch-glass': 'rgba(52, 225, 255, 0.2)',
        'signal-glass': 'rgba(123, 93, 255, 0.2)',
        // Legacy colors (mantidos para compatibilidade)
        'neo-green': '#00ff66',
        'neo-blue': '#00eaff',
        'neo-purple': '#b026ff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        neo: '14px',
      },
      spacing: {
        // NΞØ.UI Fractal Spacing
        u1: '6px',
        u2: '12px',
        u3: '18px',
        u5: '30px',
        u8: '48px',
        u13: '78px',
        // iOS Safe Area
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      padding: {
        safe: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
      transitionDuration: {
        't-fast': '90ms',
        't-mid': '160ms',
        't-slow': '300ms',
      },
    },
  },
  plugins: [],
}
