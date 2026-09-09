import react, { reactCompilerPreset } from '@vitejs/plugin-react'

import babel from '@rolldown/plugin-babel'
import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

// module federation plugin for vite is going to help the app
// so that it can expose the modules at runtime
// via remoteentry.js

export default defineConfig({
  plugins: [
    federation({
      name: "products", // unique remote name
      filename: "remoteEntry.js",
      exposes: {
        "./ProductList": "./src/App.tsx",
      },
     
      dts: false,
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  base: "http://localhost:3001/",

  server: {
    port: 3001,

    strictPort: true,

    origin: "http://localhost:3001",
  },
  build: {
    target: "chrome89",
  },
});
