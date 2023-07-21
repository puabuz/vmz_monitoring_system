<template>
  <!------------------------ ORGANIZATION DROPDOWN ---------------------------->
  <div class="col-12">
    <select @change="getValueOptions($event)" @click="sendEmit" class="form-select">
      <option selected>Все организации</option>
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
      org_id: null
    };
  },
  methods: {
    //-------- при помощи $emit отправляем id организации в родительский компонент
    sendEmit() {
      this.$emit("getOrganizationsId", {
        org_id: this.org_id
      });
    },
    //-------------------------------GET OPTIONS VALUE (ALL ORGANIZATIONS)
    getValueOptions(event) {
      this.org_id = event.target.value;
      // console.log();
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
<style scoped></style>
