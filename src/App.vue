<template>
  <div id="app">
    <SideMenuComponent />
    <NavComponent />
    <hr>
    <div class="container">
      <div class="auth-wrapper">
        
        <div class="auth-inner">
          <!-- Home Login Register Components -->
          <router-view />
        </div>
        
        <div class="res_block">{{ errorMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import NavComponent from "./components/NavComponent.vue";
import SideMenuComponent from "./components/SideMenuComponent.vue"
import store from "./vuex"

export default {
  name: "App",
  store,
  components: {
    NavComponent,
    SideMenuComponent
  },
  data() {
    return {
      errorMessage: "",
    };
  },

  computed:{
    getUser(){
      return store.getters.getUser
    }
  }

};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.auth-wrapper {
  padding: 40px;
}
.res_block {
  /* border: 1px solid black; */
  height: auto;
  margin-top: 10px;
  text-align: center;
  word-wrap: break-word;
}
hr{
  margin: 0;
}
</style>
