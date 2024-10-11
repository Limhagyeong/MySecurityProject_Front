// Vue instance 생성
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

// Import Vuetify CSS
import 'vuetify/dist/vuetify.min.css'

createApp(App).use(router).use(vuetify).use(store).mount("#app")

