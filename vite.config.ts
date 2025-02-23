import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import Inspect from 'vite-plugin-inspect';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/WebToolLinks/',
  plugins: [
    preact(),
    Inspect({
      build: true,
      outputDir: '.vite-inspect',
    }),
    compression(), // Включаем сжатие Brotli/Gzip
    visualizer({
      filename: 'dist/stats.html', // Файл отчета
      gzipSize: true, // Учитывает gzip размер
      brotliSize: true, // Учитывает brotli размер
      open: true, // Автоматически откроет отчет в браузере
    }),
  ],
  build: {
    rollupOptions: {
      treeshake: true, // Включаем Tree Shaking
    },
  },
});