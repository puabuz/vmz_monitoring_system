<template>
  <!------------------------ ORGANIZATION DROPDOWN ---------------------------->
  <div>
    <div>
      <h6>Организации</h6>
    </div>

    <select
      @change="sendEmit($event)"
      class="form-select"
    >
      <option selected value=0>Все организации</option>
      <option v-for="org in organizations" :key="org.id" :value="org.id">
        {{ org.org_name }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Organization_List",
  data() {
    return {
      organizations: {},
      owner: null,
    };
  },
  methods: {
    //-------- при помощи event получаем ID организации из select
    //-------- при помощи $emit отправляем id организации в родительский компонент
    sendEmit(event) {
      this.owner = +event.target.value;
      this.$emit("getOrgId", +event.target.value);
    },
  },
  async mounted() {
    // При монтировании компонента получаем все ОРГАНИЗАЦИИ пользователя
    axios.defaults.withCredentials = true;
    // -----------------------------------GET ALL ORGANIZATIONS
    await axios
      .get("/organisations/my_list")
      .then((res) => {
        this.organizations = res.data;
      })
      .catch(() => {
        console.log("Ошибка получения организаций");
      });
  },
};
</script>
<style scoped>
.form-select {
  cursor: pointer;
}
.form-select:hover {
  background: rgb(241, 241, 241);
}
</style>
