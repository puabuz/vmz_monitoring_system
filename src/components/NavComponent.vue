<template>
  <nav class="header navbar navbar-expand-lg" data-bs-theme="dark">
    <div class="container">
      <a class="navbar-brand" href="#">VMZ</a>
      <div>
        <div class="btn-group">
          <button
            v-if="width <= 991 && getUser"
            class="btn btn-secondary btn-sm dropdown-toggle btn-group_1 m-1"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ getUser }}
          </button>
          <ul v-if="width <= 991 && getUser" class="dropdown-menu">
            <li @click="logOut" class="drop_down">
              <span class="logout_btn">Выход</span>
            </li>
          </ul>
        </div>
        <button
          v-if="getUser"
          class="navbar-toggler m-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="екгу"
          aria-label="Переключатель навигации"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div v-if="getUser" class="collapse navbar-collapse" id="navbarNav">
        <div class="nav_wrapper">
          <div class="">
            <div class="navbar-nav">
              <li class="">
                <router-link to="/" class="nav-link">Дашборд</router-link>
              </li>
              <li class="">
                <router-link to="/devices" class="nav-link"
                  >Устройства</router-link
                >
              </li>
              <li class="">
                <router-link to="/organizations" class="nav-link"
                  >Организации</router-link
                >
              </li>
              <li class="">
                <router-link to="/services" class="nav-link"
                  >Сервисные центры</router-link
                >
              </li>
              <li class="">
                <router-link to="/contacts" class="nav-link"
                  >Контакты</router-link
                >
              </li>
              <div class="d-flex">
                <!-- <li @click="logOut">
                  <a href="#" class="nav-link"
                    ><span class="logout_btn">Выход</span></a
                  >
                </li> -->
                <!-- ------------------------ -->
                <div class="btn-group">
                  <button
                    v-if="width > 991 && getUser"
                    class="btn btn-secondary btn-sm dropdown-toggle btn-group_1"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ getUser }}
                  </button>
                  <ul v-if="width > 991 && getUser" class="dropdown-menu">
                    <li @click="logOut">
                      <span class="logout_btn">Выход</span>
                    </li>
                  </ul>
                </div>
                <!-- ------------------------ -->
                <!-- <li v-if="width > 991" class="nav-link out_btn user_name">
                  {{ getUser }}
                </li> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!getUser" class="d-flex flex-row ms-auto m-0">
          <router-link to="/login" class="nav-link">Войти</router-link>
          <router-link to="/register" class="nav-link">Регистрация</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: "NavComponent",
  components: {},
  data() {
    return {
      visibleLeft: false,
      scrolled: false,
      isShowDropdown: false,
      width: 0,
    };
  },
  methods: {
    updateWidth() {
      this.width = window.innerWidth;
    },
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
  async created() {
    //Получаем ширину экрана
    window.addEventListener("resize", this.updateWidth);
    this.width = window.innerWidth;

    axios.defaults.withCredentials = true;
    await axios
      .get("user/me")
      .then((res) => {
        this.$store.dispatch("user", res.data.username);
        if (this.$store.getters.getUser) {
          this.$router.push("/devices");
        }
      })
      .catch((err) => {
        console.log(err);
        this.errorMessage = err.response.data.detail;
      });
  },
  unmount() {
    window.removeEventListener("resize", this.updateWidth);
  },
};
</script>

<style scoped>

.header {
  position: fixed;
  right: 0;
  left: 0;
  background-color: #2a2b30;
  z-index: 1;
}
.navbar_component {
  background-color: rgba(39, 161, 243, 0.87);
  /* backdrop-filter: blur(10px); */
  box-shadow: 1px 1px 6px rgba(20, 20, 20, 0.664);
  /* z-index: 1; */
}

.btn-group_1 {
  margin: auto;
}
.dropdown-menu{
  background-color: rgb(53, 53, 53);
}
.dropdown-menu:hover{
  background-color: rgb(65, 65, 65);
}

.logout_btn {
  color: rgb(255, 255, 255);
  display: block;
  display: flex;
  flex: row;
  justify-content: center;
  cursor: pointer;
}
.logout_btn:hover {
  color: rgb(255, 255, 255);
}

.avatar {
  width: 50px;
  height: 50px;
  padding: 12px;
  background-color: rgb(191, 199, 224);
  border-radius: 25px;
  margin: 4px;
  box-shadow: 3px 1px 10px rgba(0, 0, 0, 0.548);
}
.nav-link {
  margin-right: 10px;
  padding-right: 5px;
  color: rgb(255, 255, 255);
}
.nav-link:hover {
  color: rgb(177, 177, 177);
}

.out_btn {
  color: rgb(255, 255, 255);
}


.nav-item {
  align-items: center;
  border-radius: 30px;
  /* box-shadow: 3px 4px 8px rgb(174, 197, 240); */
  background: linear-gradient(
    to right,
    rgba(116, 165, 255, 0.986),
    rgba(27, 46, 211, 0.445)
  );
}

a {
  color: black;
  /* padding: 12px 16px; */
  text-decoration: none;
  display: block;
}
.navbar-brand {
  padding: 0;
  font-size: 30px;
  font-weight: 900;
  color: rgb(255, 255, 255);
  opacity: 0.9;
}
span {
  color: rgb(255, 115, 0);
}
.user_name {
  font-size: 16px;
  color: rgb(206, 169, 121);
  margin-right: 10px;
  padding-left: 17px;
  padding-top: 12px;
  cursor: pointer;
  text-decoration: underline;
}
.nav_wrapper {
  margin-left: auto;
}

</style>
