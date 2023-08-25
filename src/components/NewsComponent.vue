<template>
  <!----------------------------- NEWS BOX -------------------------------->
  <div
    class="card news_box col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5 mb-5"
  >
    <div class="card-body pb-0 d-flex flex-column">
      <h5 class="card-title">Новости</h5>
      <!-- -----------ВЫВОД------------- -->
      
        <ul>
          <template v-for="news in newsList" :key="news.id">
          <li>{{ news.text }}</li>
          </template>
        </ul>
      div
      <!-- -----------ВЫВОД------------- -->
      <div
        class="mt-auto d-flex flex-row-reverse"
        data-toggle="modal"
        data-target=".bd-example-modal-lg"
      >
        <button
          type="button"
          class="drop_down_btn btn btn-outline-secondary"
          data-bs-toggle="modal"
          data-bs-target="#historyBox"
        >
          Показать все новости
        </button>
      </div>
    </div>
  </div>
  <!------------------------------ POPUP HISTORY ------------------------------>
  <PopupAllNews />
  <!------------------------------ POPUP HISTORY ------------------------------>
</template>

<script>
import PopupAllNews from "./popups/PopupAllNews.vue";
import { getAllNews } from "../api";

export default {
  name: "UserComponent",
  components: {
    PopupAllNews,
  },
  data() {
    return {
      newsList: null,
      errorMessage: null,
    };
  },
  async mounted() {
    try {
      const response = await getAllNews();
      this.newsList = response;
    } catch (error) {
      this.errorMessage = "Ошибка";
    }
  },
};
</script>

<style scoped>
.news_box {
  border: none;
  padding: 15px;
  border-radius: 15px;
  overflow: hidden;
  /* ------------BG-HISTORY------------ */
  background: linear-gradient(
    to right,
    rgba(197, 197, 248, 0.658),
    rgba(142, 142, 243, 0.699)
  );
}

.news_box:hover {
  background: linear-gradient(
    to right,
    rgba(212, 212, 247, 0.849),
    rgba(146, 146, 238, 0.829)
  );
}

.drop_down_btn:hover {
  box-shadow: 3px 4px 8px rgb(122, 122, 122);
}
</style>
