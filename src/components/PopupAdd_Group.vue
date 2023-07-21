<template>
  <!-- -----------------------------------POPUP 1------------------------------ -->
  <div
    class="modal fade"
    id="exampleModal_addGroup"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Новая группа...
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Закрыть"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="group_name" class="col-form-label"
                >Название группы:</label
              >
              <!--------------- ORGANIZATION NAME INPUT ------------------->
              <input
                type="text"
                class="form-control"
                id="group_name"
                v-model="form.name_group"
              />
            </div>
            <div class="mb-3">
              <label for="descr_group" class="col-form-label"
                >Описание группы:</label
              >
              <!------------ ORGANIZATION DESCRIPTION INPUT ------------------->
              <input
                type="text"
                class="form-control"
                id="descr_group"
                v-model="form.descr_group"
              />
            </div>
          </form>
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
            @click="addDashGroup"
            type="button"
            :disabled="!form.name_group"
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- -----------------------------------POPUP------------------------------ -->
</template>

<script>
import axios from "axios";

export default {
  name: "PopupAdd_Group",
  data() {
    return {
      form: {
        name_group: "",
        descr_group: "",
      },
    };
  },
  methods: {
    //------------------------------ДОБАВЛЕНИЕ НОВОЙ ГРУППЫ
    async addDashGroup() {
      axios.defaults.withCredentials = true;
      await axios
        .post("dashboards/add/dash_group", {
          name: this.form.name_group,
          description: this.form.descr_group,
        })
        .then(() => {
          this.$router.go(0);
        })
        .catch((err) => {
          alert(err.response.data.detail);
        });
    },
  },
};
</script>

<style scoped>
</style>
