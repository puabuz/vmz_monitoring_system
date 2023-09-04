<template>
  <!-- -----------------------------------POPUP------------------------------ -->
  <div
    class="modal fade"
    id="addNews"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Добавить новость</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"
              >Текст сообщения</label
            >
            <textarea
              v-model="areaValue"
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Закрыть
          </button>
          <button
            @click="addNews"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            :disabled="!areaValue"
          >
            Добавить новость
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import {addNewNews} from "../../../api"

export default {
  name: "PopupAdminAdd_News",
  components: {},
  data() {
    return {
      areaValue: "",
    };
  },
  methods: {
    async addNews() {
      try {
        const response = await addNewNews(this.areaValue)
        this.areaValue = '';
        console.log(response);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
};
</script>

<style scoped></style>
