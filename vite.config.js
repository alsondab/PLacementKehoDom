import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import relumeTailwind from '@relume_io/relume-tailwind';

import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  content: [
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'marquee': 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  presets: [relumeTailwind],
  plugins: [react(), tailwindcss()],
})
