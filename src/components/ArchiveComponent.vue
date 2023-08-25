<template>
  <div class="container mb-2 mt-3">
    <div class="title">Архив новостей</div>
  </div>
  <hr />
  <div>{{ errorMessage }}</div>
  <!-- Error message -->
  <template v-if="!errorMessage">
    <div v-for="item in archiveList" :key="item.id" class="news_item p-3 mb-2">
      <span class="date">{{ new Date(item.added_at).toLocaleDateString("ru-US", { day: 'numeric', month: 'numeric', year: 'numeric' }) }}</span>
      <div>{{ item.text }}</div>
      <div class="d-flex justify-content-end">
        <button
          @click="sendToArchive(item.id)"
          class="button_ok btn btn-outline-success btn-sm m-1"
        >
          Кнопка
        </button>
      </div>
    </div>
  </template>
</template>

<script>
import { getArchiveNews } from "../api";

export default {
  name: "ArchiveComponent",
  data() {
    return {
      archiveList: null,
      errorMessage: null,
    };
  },
  methods: {},
  async mounted() {
    try {
      const response = await getArchiveNews();
      this.archiveList = response;
    } catch (error) {
      if (error) this.errorMessage = "Ошибка получения архива новостей";
    }
  },
};
</script>

<style scoped>
.title {
  color: rgb(255, 255, 255);
}
.news_item {
  background-color: rgb(195, 231, 248);
  border-radius: 10px;
}
.date {
  color: rgb(116, 115, 115);
  font-size: 14px;
}
</style>
