import { createRouter, createWebHashHistory } from "vue-router";
import HomeComponent from "./components/HomeComponent.vue";
import LoginComponent from "./components/LoginComponent.vue";
import RegisterComponent from "./components/RegisterComponent.vue";
import DevicesComponent from "./components/DevicesComponent.vue"
import OrganizationsComponent from "./components/OrganizationsComponent.vue";
import ServicesComponent from "./components/ServicesComponent.vue"
import ContactsComponent from "./components/ContactsComponent.vue"
import ArchiveComponent from "./components/ArchiveComponent.vue"

const routerHistory = createWebHashHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeComponent,
    },
    {
      path: "/login",
      name: "login",
      component: LoginComponent,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterComponent,
    },
    {
      path: "/devices",
      name: "devices",
      component: DevicesComponent,
    },
    {
      path: "/organizations",
      name: "organizations",
      component: OrganizationsComponent,
    },
    {
      path: "/services",
      name: "services",
      component: ServicesComponent,
    },
    {
      path: "/contacts",
      name: "contacts",
      component: ContactsComponent,
    },
    {
      path: "/archive",
      name: "archive",
      component: ArchiveComponent,
    },

  ],
});

export default router;
