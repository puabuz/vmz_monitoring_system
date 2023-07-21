import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./axios"
import store from "./vuex";
import cors from 'cors';
import cookies from "vue-cookies"

const app = createApp(App);

app.use(cookies)
app.use(store);
app.use(router);
app.use(cors);

app.mount("#app");
