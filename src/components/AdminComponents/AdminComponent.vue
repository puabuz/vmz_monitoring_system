<template>
  <div class="container mb-2 mt-3">
    <div class="title">Админ-панель</div>
  </div>
  <hr />
  <div class="container">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          Новости
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile"
          type="button"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          Ошибки
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="contact-tab"
          data-bs-toggle="tab"
          data-bs-target="#contact"
          type="button"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          Параметры
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <!--------------------- НОВОСТИ ------------------->
      <AdminNews_Component />

      <!--------------------- ОШИБКИ ------------------->
      <AdminErrors_Component />

      <!------------------ ПАРАМЕТРЫ ------------------>
      
      <AdminParameters_Component />
    
    </div>
  </div>

  <!-- Modal Add News -->
  <PopupAdminAdd_News />
  <!-- Modal Add Error -->
  <PopupAdminAdd_Error />
  <!-- Modal Update Error -->
  <PopupAdminUpdate_Error />
</template>

<script>
import AdminParameters_Component from "../AdminComponents/AdminParameters_Component.vue";
import AdminErrors_Component from "../AdminComponents/AdminErrors_Component.vue";
import AdminNews_Component from "../AdminComponents/AdminNews_Component.vue";
import PopupAdminAdd_News from "../popups/admin/PopupAdminAdd_News.vue";
import PopupAdminAdd_Error from "../popups/admin/PopupAdminAdd_Error.vue";
import PopupAdminUpdate_Error from "../popups/admin/PopupAdminUpdate_Error.vue";

export default {
  name: "AdminComponent",
  components: {
    AdminParameters_Component,
    AdminErrors_Component,
    AdminNews_Component,
    PopupAdminAdd_News,
    PopupAdminAdd_Error,
    PopupAdminUpdate_Error,
  },
  data() {
    return {};
  },
  created() {
    if (!this.$store.getters.getUserIsAdmin) {
      this.$router.push("/error");
    }
  },
};
</script>

<style scoped>
.nav-link {
  color: rgb(255, 255, 255);
}
.title {
  color: rgb(255, 255, 255);
}

.btn_item {
  margin-right: 15px;
}
</style>
