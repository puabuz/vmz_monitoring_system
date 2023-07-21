<template>
  <nav class="navbar navbar-expand navbar-light">
    <div class="container">
      <router-link to="/" class="navbar-brand">Главная</router-link>
      <div class="collapse navbar-collapse">
        <!-- v-if="!user" -->
        <ul class="navbar-nav ms-auto" v-if="!getUser">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Войти</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link"
              >Регистрация</router-link
            >
          </li>
        </ul>
        <!-- v-if="getUser" -->
        <ul v-if="getUser" class="navbar-nav ms-auto">
          <li class="nav-item">
            <a href="#" class="nav-link out_btn">{{ getUser }}</a>
          </li>
          <li class="nav-item">

            <!-- PROFILE MENU -->
            <ProfileMenuComponent />
            <!-- PROFILE MENU -->

          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

import axios from "axios";
import ProfileMenuComponent from "./ProfileMenuComponent.vue";

export default {
  name: "NavComponent",
  components: {
    ProfileMenuComponent
  },
  data() {
    return {
      isShowDropdown: false,
    };
  },
  methods: {
    async logOut() {
      this.$cookies.remove("vmz.cloud.auth");

      axios.defaults.withCredentials = true;
      await axios
        .post("auth/jwt/logout")
        .then(() => {
          this.$store.dispatch("user", null); // удаляем пользователя из хранилища
          this.$store.dispatch("userId", null); // удаляем ID пользователя из хранилища
          if (!this.$store.getters.getUser) {
            this.isShowDropdown = !this.isShowDropdown;
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showDropdown() {
      this.isShowDropdown = !this.isShowDropdown;
    },
  },
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
  },
};
</script>

<style scoped>
.out_btn {
  margin-top: 9px;
}

.nav-item {
  align-items: center;
}

a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
</style>
