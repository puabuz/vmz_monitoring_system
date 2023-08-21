<template>
  <div
    class="modal fade modal-xl"
    id="errorBox"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">История</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <ul class="error_list">
            <li>Ошибка 10 - <span class="error_item">Описание ошибки 10</span></li>
            <li>Ошибка 9 - <span class="error_item">Описание ошибки 9</span></li>
            <li>Ошибка 8 - <span class="error_item">Описание ошибки 8</span></li>
            <li>Ошибка 7 - <span class="error_item">Описание ошибки 7</span></li>
            <li>Ошибка 6 - <span class="error_item">Описание ошибки 6</span></li>
            <li>Ошибка 5 - <span class="error_item">Описание ошибки 5</span></li>
            <li>Ошибка 4 - <span class="error_item">Описание ошибки 4</span></li>
            <li>Ошибка 3 - <span class="error_item">Описание ошибки 3</span></li>
            <li>Ошибка 2 - <span class="error_item">Описание ошибки 2</span></li>
            <li>Ошибка 1 - <span class="error_item">Описание ошибки 1</span></li>
          </ul>
        </div>
        <div class="modal-footer">
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
export default {
  name: "PopupErrors",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.error_list{
  color: rgb(247, 145, 145);
}
.error_item{
  color: rgb(134, 134, 134);
}
</style>
