import App from './App.vue'
import { createApp } from 'vue'
import { Quasar } from 'quasar'
import VueMask from '@devindex/vue-mask';
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import '/src/style/main.scss'
import store from '/store'
import router from "../router";
import { clearNumber } from '/src/plugins/custom-functions'

const app = createApp(App)

// global

app.config.globalProperties.$clearNumber = clearNumber

app.use(Quasar, {
    plugins: {}
})
app.use(router)
app.use(store)
app.use(VueMask)
app.mount('#app')
