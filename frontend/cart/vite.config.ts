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
      name: "cart", // unique remote name
      filename: "remoteEntry.js",
      exposes: {
        "./Cart": "./src/App.tsx",
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
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  base: "http://localhost:3002/",

  server: {
    port: 3002,

    strictPort: true,

    origin: "http://localhost:3002",
  },
  build: {
    target: "chrome89",
  },
});
