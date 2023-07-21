<template>
  <div class="container">
    <h4 v-if="!getUser">Войдите в систему</h4>
    <h4 v-if="getUser">Пользователь: {{ getUser }}<hr/></h4>
    <UserComponent v-if="getUser"/>
  </div>
</template>

<script>
import axios from "axios";
import store from "../vuex";
import UserComponent from "./UserComponent.vue";

export default {
  name: "HomeComponent",
  components: {
    UserComponent
  },
  store,
  computed: {
    //получаем пользователя из хранилища
    getUser() {
      return this.$store.getters.getUser;
    },
  },
  mounted(){},
  async created() {
    axios.defaults.withCredentials = true;
      await axios
        .get("user/me")
        .then((res) => {
          this.$store.dispatch("user", res.data.username);
          if (this.$store.getters.getUser) {
            this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
          this.errorMessage = err.response.data.detail;
        });
  },
};
</script>
<style scoped>
h4{
  margin-bottom: 40px;
}
</style>
