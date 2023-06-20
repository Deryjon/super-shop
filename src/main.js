import './assets/tailwind.css'
import "vue-toastification/dist/index.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Toast, options  } from './lib/toast'

const app = createApp(App)

app.use(router)
app.use(Toast, options)

app.mount('#app')
