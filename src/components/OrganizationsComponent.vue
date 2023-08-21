<template>
  <div class="container mb-2 mt-3">
    <div class="title">Организации</div>
  </div>
  <hr />
  <button
    class="btn btn-secondary drop_down_btn mx-3"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Добавить организацию
  </button>
  <hr />
  <div v-for="org in organizations" :key="org.id" class="container">
    <ul>
      <li>
        <span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-buildings-fill icon_factory"
            viewBox="0 0 16 16"
          >
            <path
              d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V.5ZM2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-1 2v1H2v-1h1Zm1 0h1v1H4v-1Zm9-10v1h-1V3h1ZM8 5h1v1H8V5Zm1 2v1H8V7h1ZM8 9h1v1H8V9Zm2 0h1v1h-1V9Zm-1 2v1H8v-1h1Zm1 0h1v1h-1v-1Zm3-2v1h-1V9h1Zm-1 2h1v1h-1v-1Zm-2-4h1v1h-1V7Zm3 0v1h-1V7h1Zm-2-2v1h-1V5h1Zm1 0h1v1h-1V5Z"
            /></svg></span
        >{{ org.org_name }}
      </li>
    </ul>
  </div>
  <!--------------------------------POPUP ADD ORGANIZATION--------------------------------->
  <PopupAdd_Organizations />
</template>

<script>
import axios from "axios";
import PopupAdd_Organizations from "./popups/PopupAdd_Organizations.vue";

export default {
  name: "OrganizationsComponent",
  components: {
    PopupAdd_Organizations,
  },
  data() {
    return {
      organizations: null,
    };
  },

  async mounted() {
    // При монтировании компонента получаем все ОРГАНИЗАЦИИ пользователя
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
li{
  list-style-type: none;
}
button {
  margin: 20px 12px;
}
.title {
  color: rgb(255, 255, 255);
}
.icon_factory{
  margin-right: 10px;
}
</style>
