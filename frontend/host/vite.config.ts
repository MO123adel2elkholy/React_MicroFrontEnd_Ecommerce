import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
   server: {
    port: 3000, // keep this stable

    // if 3000 is busy, fail instead of jumping to 3001/3002
    strictPort: true,

    origin: "http://localhost:3000",
  },

})
