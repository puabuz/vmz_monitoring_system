import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./axios";
import store from "./vuex";
import cors from "cors";
import cookies from "vue-cookies";
import PrimeVue from "primevue/config";
// import "primeicons/primeicons.css"

//---PrimeVue Component---------------
import Sidebar from 'primevue/sidebar';
import Button from "primevue/button"
import TreeSelect from 'primevue/treeselect';
import Dialog from 'primevue/dialog';
//---PrimeVue Component---------------


import Highcharts from "highcharts";
import StockModule from "highcharts/modules/stock";
import HighchartsVue from "highcharts-vue";


//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";
// import "primevue/resources/themes/bootstrap4-dark-blue/theme.css"
// import "primevue/resources/themes/md-dark-indigo/theme.css"
// import "primevue/resources/themes/arya-green/theme.css"
// import "primevue/resources/themes/saga-orange/theme.css"
import "primevue/resources/primevue.min.css";

// In order to use Highcharts Stock we need to
// wrap Highcharts with the correct module:
StockModule(Highcharts);

const app = createApp(App);

app.use(HighchartsVue);
app.use(HighchartsVue, {
  highcharts: Highcharts,
});

app.use(cookies);
app.use(store);
app.use(router);
app.use(cors);
app.use(PrimeVue);
app.component("ButTon", Button);
app.component("SideBar", Sidebar);
app.component("TreeSelect", TreeSelect);
app.component("DiaLog", Dialog);

app.mount("#app");
