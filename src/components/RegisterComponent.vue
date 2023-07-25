<template>
  <div class="container">
    <div class="form_size">
      <form method="POST" @submit.prevent="onSubmit">
        <h4>Регистрация</h4>
        <div class="form-group">
          <!-- User Name -->
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            class="form-control"
            v-model="form.username"
            required
          />
        </div>
        <!-- Email -->
        <div class="form-group">
          <label for="user_email">Email</label>
          <input
            id="user_email"
            type="email"
            class="form-control"
            v-model="form.email"
            required
          />
        </div>
        <!-- Password -->
        <div class="form-group">
          <label for="user_pass">Password</label>
          <input
            id="user_pass"
            type="password"
            class="form-control"
            v-model="form.password"
            required
          />
        </div>
        <!-- Confirm Password -->
        <div class="form-group">
          <label for="user_pass_confirm">Confirm Password</label>
          <input
            id="user_pass_confirm"
            type="password"
            class="form-control"
            v-model="form.confirm_pass"
            required
          />
        </div>
        <div class="d-flex justify-content-center text-danger">{{ resData }}</div>
        <div>
          <button class="btn btn-primary btn-block">Зарегестрироваться</button>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterComponent",
  data() {
    return {
      resData: "",
      form: {
        email: null,
        password: null,
        is_active: true,
        is_superuser: false,
        is_verified: false,
        username: null,
        confirm_pass: null,
      },
    };
  },
  methods: {
    async onSubmit() {
      if (this.form.password === this.form.confirm_pass) {
        await axios
          .post("auth/register", {
            email: this.form.email,
            password: this.form.password,
            is_active: this.form.is_active,
            is_superuser: this.form.is_superuser,
            is_verified: this.form.is_verified,
            username: this.form.username,
          })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            console.log("Ошибка получения устройств");
          });
      } else {
        this.resData = "Пароли в полях не совпадают"
      }
    },
  },
};
</script>
<style scoped>
h4 {
  text-align: center;
}

button {
  margin: 20px;
}

.form_size {
  max-width: 500px;
  margin: 0 auto;
}
</style>
