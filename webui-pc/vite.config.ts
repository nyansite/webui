/// <reference types="vitest" />
import path from 'node:path'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://ai-geek.top/api',
        rewrite: path => path.replace(/^\/api/, ''),
        changeOrigin: true,
        secure: false, // 忽略证书认证
      },
    },
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true,
          },
        }),
      },
    }),
    VueRouter(),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        'pinia',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: true,
      dirs: [
        './src/composables',
        './src/utils',
        './src/store'
      ],
      vueTemplate: true,
    }),
    Components({
      dts: true,
      resolvers: [
        PrimeVueResolver(),
      ],
      dirs: [
        './src/components',
        './src/pages',
      ],
    }),
    UnoCSS(),
  ],
})
