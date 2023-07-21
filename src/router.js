import{createRouter, createWebHashHistory} from "vue-router";
import HomeComponent from "./components/HomeComponent.vue";
import LoginComponent from "./components/LoginComponent.vue";
import RegisterComponent from "./components/RegisterComponent.vue";


const routerHistory = createWebHashHistory();
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeComponent
        },
        {
            path: "/login",
            name: "login",
            component: LoginComponent
        },
        {
          path: "/register",
          name: "register",
          component: RegisterComponent
      }
    ]
});

export default router;