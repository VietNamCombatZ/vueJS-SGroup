import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';
//  defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })
mergeConfig(viteConfig, defineConfig({
    test: {
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'e2e/**'],
        root: fileURLToPath(new URL('./', import.meta.url)),
    },
}));
export default { defineConfig, mergeConfig };
