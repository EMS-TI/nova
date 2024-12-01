import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Define caminhos relativos
  build: {
    outDir: 'dist', // Certifique-se de que a saída está correta
  },
});
