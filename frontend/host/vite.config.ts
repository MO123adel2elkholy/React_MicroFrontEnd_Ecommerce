import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import { federation } from "@module-federation/vite";


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    federation({
      name: "host",
      remotes: {
        products: {
          type: "module",
          name: "products",
          entry: "http://localhost:3001/remoteEntry.js",
          entryGlobalName: "products",
          shareScope: "default",
        },
        cart: {
          type: "module",
          name: "cart",
          entry: "http://localhost:3002/remoteEntry.js",
          entryGlobalName: "cart",
          shareScope: "default",
        },
      },
      shared: {
        react: {
          singleton: true, // only one react instance in the browser
          requiredVersion: "^19.2.8",
        },
        "react/": {
          singleton: true, // subpaths imports like -> 'react/jsx-rumtime
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.2.8",
        },
      },
      dts: false,
    }),
  ],
   server: {
    port: 3000, // keep this stable

    // if 3000 is busy, fail instead of jumping to 3001/3002
    strictPort: true,

    origin: "http://localhost:3000",
  },

})
