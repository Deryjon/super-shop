import "vue-toastification/dist/index.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Toast, options  } from './lib/toast'
import { createPinia } from 'pinia'

import vuetify from './lib/vuetify'
import './assets/tailwind.css'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(pinia)
app.use(Toast, options)

app.mount('#app')
