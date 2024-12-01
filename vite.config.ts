import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Garante que os caminhos sejam tratados de forma relativa
  build: {
    outDir: 'dist', // Diretório de saída para o build
    assetsDir: 'assets', // Diretório para arquivos estáticos
    rollupOptions: {
      input: 'index.html', // Certifique-se de que o Vite sabe onde está o ponto de entrada
    },
  },
});
