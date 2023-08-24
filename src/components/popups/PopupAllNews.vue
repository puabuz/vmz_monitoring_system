<template>
  <div
    class="modal fade modal-xl"
    id="historyBox"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Все новости</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Error message -->
          <div v-if="errorMessage" class="text-danger px-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill mx-1" viewBox="0 0 20 20">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
          </svg>{{ errorMessage }}</div>
          <!-- Error message -->
          <template v-if="!errorMessage">
            <div v-for="news in newsList" :key="news.id" class="news_item p-3 mb-2">
              <span class="date">24.08.2023</span>
              <div>{{ news.text }}</div>
              <div class="d-flex justify-content-end">
                <button @click="sendToArchive(news.id)" class="button_ok btn btn-outline-success btn-sm m-1">
                  Ok
                </button>
              </div>
            </div>
          </template>
          
        </div>
        <div class="modal-footer">
          <!-- ----------router -->
          <router-link to="/archive" class="nav-link"
                  ><span data-bs-dismiss="modal">Архив</span></router-link>
          <!-- ----------router -->
          
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllNews, userNewsRead } from "../../api";

export default {
  name: "PopupAllNews",
  data() {
    return {
      newsList: null,
      errorMessage: null,
    };
  },
  methods: {
    async sendToArchive(news_id) {
      try {
        await userNewsRead(news_id);
        try {
          const response = await getAllNews();
          this.newsList = response;
        } catch (error) {
          if (error) this.errorMessage = "Ошибка получения списка новостей";
        }
      } catch (error) {
        if (error) this.errorMessage = "Ошибка отправки сообщения в архив";
      }
    },
  },
  async mounted() {
    try {
      const response = await getAllNews();
      this.newsList = response;
    } catch (error) {
      if(error) this.errorMessage = "Ошибка получения истории новостей"
    }
  },
};
</script>

<style scoped>
.news_item {
  background-color: rgb(195, 231, 248);
  border-radius: 10px;
}
.date {
  color: rgb(116, 115, 115);
  font-size: 14px;
}
.btn_archive{
  border: none;
  background-color: #fff;
}
</style>
