<template>
  <!-- -----------------------------------POPUP ADD DEVICES------------------------------ -->
  <div
    class="modal fade"
    id="exampleModal_2"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Новое устройство...
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
            <!----------------- SELECTED ORGANIZATIONS ----------------------->
            <div class="mb-3">
              <label for="org_name" class="col-form-label"
                >Выберите организацию:</label
              >
              <!----------- ORGANIZATION DROPDOWN COMPONENT ----------------->
              <Organization_List @getOrganizationsId="getOrgId" />
            </div>
            <!-------------------- DEVICE NAME FIELD----------------------->
            <div class="mb-3">
              <label for="org_name" class="col-form-label"
                >Название устройства:</label
              >
              <input
                type="text"
                class="form-control"
                id="org_name"
                v-model="form.u_device_name"
              />
            </div>
            <!------------------------ DEVICES ID FIELD-------------------------->
            <div class="mb-3">
              <label for="org_name" class="col-form-label"
                >ID устройства:</label
              >
              <input
                type="text"
                class="form-control"
                id="org_name"
                v-model="form.unique_id"
              />
            </div>
            <!----------------- DEVICE CODE FIELD----------------------->
            <div class="mb-3">
              <label for="org_name" class="col-form-label"
                >Код устройства:</label
              >
              <input
                type="text"
                class="form-control"
                id="org_name"
                v-model="form.code"
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
            @click="addDevices"
            type="button"
            :disabled="!form.org_id || !form.u_device_name || !form.unique_id || !form.code"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            >
            Добавить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Organization_List from "../Organization_List.vue";

export default {
  name: "PopupAdd_Devices",
  components: {
    Organization_List,
  },
  data() {
    return {
      resMessage: "",
      form: {
        org_id: null, // id организации (Получаем через $emit из дочернего компонента <Organization_List />)
        u_device_name: null, // название устройства (Задает пользователь)
        unique_id: null, // уникальный id устройства (есть у пользователя (Пользователь вводит сам))
        code: null, // код (есть у пользователя (вводит сам))
      },
    };
  },
  methods: {
    //-----------------ловим id организации из дочернего компонента
    getOrgId(data) {
      this.form.org_id = data.org_id;
    },
    //------------------------------ДОБАВЛЕНИЕ УСТРОЙСТВА
    async addDevices() {
      axios.defaults.withCredentials = true;
      // ДОБАВЛЯЕМ УСТРОЙСТВО
      // unique_id - 777777777788
      // code - "1231"
      await axios
        .post("devices/add", {
          org_id: this.form.org_id,
          u_device_name: this.form.u_device_name,
          unique_id: this.form.unique_id,
          code: this.form.code,
        })
        .then((res) => {
          console.log(res);
          this.$router.go(0);
        })
        .catch((err) => {
          alert(err.response.data.detail); //вывод сообщения об ошибке при добавлении устройства
        });
    },
  },
};
</script>

<style scoped>
.wrapper{

}
</style>
