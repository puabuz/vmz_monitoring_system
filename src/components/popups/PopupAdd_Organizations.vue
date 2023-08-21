<template>
  <!-- -----------------------------------POPUP 1------------------------------ -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Новая организация...
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
              <label for="org_name" class="col-form-label"
                >Название организации:</label
              >
              <!--------------- ORGANIZATION NAME INPUT ------------------->
              <input
                type="text"
                class="form-control"
                id="org_name"
                v-model="form.org_name"
              />
            </div>
            <div class="mb-3">
              <label for="descr_org" class="col-form-label"
                >Описание организации:</label
              >
              <!------------ ORGANIZATION DESCRIPTION INPUT ------------------->
              <input
                type="text"
                class="form-control"
                id="descr_org"
                v-model="form.org_descr"
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
            @click="addOrganization"
            type="button"
            :disabled="!form.org_name"
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
  name: "PopupAddOrganizations",
  data() {
    return {
      form: {
        org_name: "",
        org_descr: "",
      },
    };
  },
  methods: {
    //------------------------------ДОБАВЛЕНИЕ ОРГАНИЗАЦИИ
    async addOrganization() {
      axios.defaults.withCredentials = true;
      await axios
        .post("organisations/add", {
          name: this.form.org_name,
          description: this.form.org_descr,
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
