<template>
  <div id="app" class="d-flex flex-column min-vh-100 ">
    <div class="nav_wrapper"><NavComponent /></div>
    <div class="container auth_wrapper ">
      <router-view />
      <div class="res_block">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import NavComponent from "./components/NavComponent.vue";
import store from "./vuex";

export default {
  name: "App",
  store,
  components: {
    NavComponent,
  },
  data() {
    return {
      visibleLeft: false,
      errorMessage: "",
      scrolled: false,
    };
  },
  methods: {
    test() {
      console.log(this.getUser);
    },
  },
  computed: {
    getUser() {
      return store.getters.getUser;
    },
  },
};
</script>

<style>
body {
  height: 100%;
  background-image: url(assets/6.jpeg);
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
* {
  box-sizing: border-box;
}
.auth_wrapper {
  position: relative;
  top: 80px;
}
.nav_menu {
  background-color: rgb(65, 162, 218);
}
.res_block {
  height: auto;
  margin-top: 10px;
  text-align: center;
  word-wrap: break-word;
}

.line {
  color: white;
  /* border-bottom: 1px solid white; */
}
.sidebar_item {
  margin-bottom: 15px;
  font-size: 20px;
  padding: 5px 0 5px 10px;
  cursor: pointer;
  transition: all 300ms;
}
.sidebar_item:hover {
  padding-left: 20px;
  background-color: rgb(229, 252, 252);
  border-left: 1px solid rgb(146, 250, 172);
}

.footer_title {
  color:rgb(255, 255, 255);
  text-align: center;
}




</style>
