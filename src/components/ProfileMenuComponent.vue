<template>
  <div class="dropdown">
    <div class="avatar" @click="showDropdown">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        class="bi bi-gear"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
        />
        <path
          d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
        />
      </svg>
    </div>
    <div v-if="isShowDropdown" class="dropdown-content">
      <div class="drop_down_btn_title">Профиль</div>
      <hr />
      <!--------------------- ADD DEVICES BUTTON -------------------->
      <div>
        <a
          href="#"
          class="drop_down_btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal_2"
          >Добавить устройство</a
        >
      </div>

      <!--------------------- ADD ORGANIZATION BUTTON -------------------->
      <div>
        <a
          href="#"
          class="drop_down_btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          >Добавить организацию</a
        >
      </div>

      <hr />
      <div @click="logOut">
        <a href="#" class="drop_down_btn">Выход</a>
      </div>
    </div>
    <div v-if="isShowDropdown" class="back" @click="showDropdown"></div>
  </div>
  <!-- -----------------------------------POPUP 1 Add Organizations-------------->
  <PopupAdd_Organizations />
  <!-- -----------------------------------POPUP 2 Add Devices-------------------->
  <PopupAdd_Devices />
</template>

<script>
import axios from "axios";
import PopupAdd_Organizations from "./PopupAdd_Organizations.vue";

import PopupAdd_Devices from './PopupAdd_Devices.vue';

export default {
  name: "ProfileMenuComponent",
  components: {
    PopupAdd_Organizations,
    PopupAdd_Devices
  },
  data() {
    return {
      isShowDropdown: false,
      form: {
        org_name: "",
        org_descr: "",
      },
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
        .catch(() => {
          console.log("Ошибка выхода");
        });
    },
    // ---------------------------------УСЛОВНАЯ ОТРИСОВКА
    showDropdown() {
      this.isShowDropdown = !this.isShowDropdown;
    },
  },
  computed: {
    //-------------------------ПОЛУЧЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ ИЗ ХРАНИЛИЩА
    getUser() {
      return this.$store.getters.getUser;
    },
  },
};
</script>

<style scoped>
svg {
  position: relative;
  padding: 12px;
  border-radius: 8px;
  display: block;
  margin: auto;
}

.bi:hover {
  background-color: #ddf0f1;
}
.drop_down_btn:hover {
  background-color: rgba(200, 240, 240, 0.76);
}
.dropdown {
  position: relative;
  display: inline-block;
}
.drop_down_btn_title {
  margin: 15px;
  font-weight: 500;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  padding: 8px;
  display: block;
}

.back {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100vw;
  height: 100vh;
}

.dropdown-content {
  position: absolute;
  right: -40%;
  width: 250px;
  z-index: 99;
  border: 1px solid rgb(198, 198, 198);
  margin-top: 5px;
  margin-left: 20px;
  backdrop-filter: blur(8px);
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
</style>
