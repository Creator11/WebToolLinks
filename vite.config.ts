import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import Inspect from 'vite-plugin-inspect';

// https://vite.dev/config/
export default defineConfig({
  // @ts-ignore
  plugins: [preact(), Inspect({
    build: true,
    outputDir: '.vite-inspect'
  })],

})
