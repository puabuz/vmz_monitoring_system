<template>
  <div class="container">
    <div class="form_size">
      <form method="POST" @submit.prevent="onSubmit">
        <h3>Вход</h3>
        <!-- Email -->
        <div class="form-group">
          <label for="user_name">Имя пользователя</label>
          <input
            id="user_name"
            type="text"
            class="form-control"
            v-model="form.username"
            required
          />
        </div>
        <!-- Password -->
        <div class="form-group">
          <label for="user_pass">Пароль</label>
          <input
            id="user_pass"
            type="password"
            class="form-control"
            v-model="form.password"
            required
          />
        </div>
        <div class="res_block group">{{ errorMessage }}</div>
        <!-- BUTTON Login -->
        <button class="btn btn-primary btn-block">Войти</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginComponent",
  
  data() {
    return {
      errorMessage: "",
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      const userData = {
        username: this.form.username,
        password: this.form.password,
      };
      // ---------------------------------GET A TOKEN IN COOKIE FILES
      axios.defaults.withCredentials = true;
      await axios
        .post("auth/jwt/login", userData, {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            withCredentials: true,
          },
        })
        .then(() => {
          console.log("Token");
        })
        .catch((err) => {
          console.log(err.response.data.detail);
          this.errorMessage = err.response.data.detail;
        });

      // ----------------------------------------GET USER DATA
      await axios
        .get("user/me")
        .then((res) => {
          this.$store.dispatch("user", res.data.username); //Добавляем юзера в хранилище
          this.$store.dispatch("userId", res.data.user_id); // Добавляем ID юзера в хранилище
          if (this.$store.getters.getUser) {
            this.$router.push("/");
          }
        })
        .catch((err) => {
          this.errorMessage = err.response.data.detail;
        });
    },
  },
};
</script>
<style scope>
h3 {
  text-align: center;
}
label {
  margin: 20px 0;
}
button {
  margin: 20px;
}
.form_size {
  max-width: 500px;
  margin: 0 auto;
}
.form-group {
  margin: 20px;
}
.res_block {
  /* border: 1px solid black; */
  color: red;
  height: auto;
  margin-top: 10px;
  text-align: center;
  word-wrap: break-word;
}
</style>
