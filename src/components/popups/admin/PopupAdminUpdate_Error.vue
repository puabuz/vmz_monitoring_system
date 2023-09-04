<template>
  <!-- -----------------------------------POPUP------------------------------ -->
  <!-- -----------------------------------POPUP------------------------------ -->
  <div
    class="modal fade"
    id="updateError"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Редактировать ошибку
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <form>
              <div>
                <label for="errorName">Выберите ошибку из списка...</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Выберите ошибку</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div>
                <label for="codeErr" class="form-label">Код ошибки</label>
                <input type="number" class="form-control" id="codeErr" />
              </div>
              <div>
                <label for="errorDescription" class="form-label"
                  >Описание ошибки</label
                >
                <textarea
                  v-model="areaValue"
                  class="form-control"
                  id="errorDescription"
                  rows="3"
                ></textarea>
              </div>
            </form>
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
            @click="addError"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            :disabled="!areaValue"
          >
            Добавить ошибку
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "PopupAdminUpdate_Error",
  components: {},
  data() {
    return {};
  },
  methods: {},
  async mounted() {},
};
</script>

<style scoped></style>
