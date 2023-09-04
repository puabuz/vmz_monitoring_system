<template>
  <div
        class="tab-pane fade"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <!------------------ ОШИБКИ ------------------>
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#addError"
        >
          Добавить ошибку
        </button>
        <div class="container">
          <table class="table table-dark table-hover table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Код ошибки</th>
                <th scope="col">Описание ошибки</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>M313</td>
                <td>выполнен аварийный стоп</td>
                <td class="text-end">
                  <button
                    type="button"
                    class="btn btn-secondary btn-sm m-0 mx-1 mb-1"
                    data-bs-toggle="modal"
                    data-bs-target="#updateError">
                    Редактировать</button>
                  <button class="btn btn-secondary btn-sm m-0 mx-1">
                    Удалить
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
</template>

<script>


export default {
  name: "AdminErrors_Component",
  components: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
.table-dark {
  opacity: 0.8;
}
</style>
