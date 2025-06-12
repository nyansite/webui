import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Lara from "@primeuix/themes/lara"

import '@unocss/reset/tailwind.css'
import './styles/main.scss'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)

const themeColor = "purple"

app.use(PrimeVue, {
  theme: {
    preset: Lara,
    semantic: {
        primary: {
            50: `{${themeColor}.50}`,
            100: `{${themeColor}.100}`,
            200: `{${themeColor}.200}`,
            300: `{${themeColor}.300}`,
            400: `{${themeColor}.400}`,
            500: `{${themeColor}.500}`,
            600: `{${themeColor}.600}`,
            700: `{${themeColor}.700}`,
            800: `{${themeColor}.800}`,
            900: `{${themeColor}.900}`,
            950: `{${themeColor}.950}`
        }
    },
    options: {
      darkModeSelector: ".dark"
    }
  }
})
app.mount('#app')
