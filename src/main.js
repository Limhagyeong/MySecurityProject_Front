import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

// Import Vuetify CSS
import 'vuetify/dist/vuetify.min.css'

createApp(App).use(router).use(vuetify).mount("#app")

