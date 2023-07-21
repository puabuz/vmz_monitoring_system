<template>
  <!-- -----------------------------------POPUP------------------------------ -->
  <div
    class="modal fade"
    id="exampleModal_addDash"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Новый график...
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
            <!------------ Device ID INPUT ------------------->
            <div class="mb-3">
              <label for="device_id" class="col-form-label"
                >Выберите устройство:</label
              >
              <Devices_List @click="getDeviceId($event)" />
            </div>
            <!------------ Params INPUT ------------------->
            <div class="mb-3">
              <label for="params" class="col-form-label">Params:</label>
              <div class="col-12 mb-10px mb-3">
                <select @change="getValueOptions($event)" id="params" class="form-select" required>
                  <option selected>Выбранный пункт</option>
                  <option value="1">Пункт 1</option>
                  <option value="2">Пункт 2</option>
                  <option value="3">Пункт 3</option>
                  <option value="4">Пункт 4</option>

                  <!-- ВАРИАНТ КОДА ДЛЯ РЕНДЕРИНГА -->
                  <!-- <option v-for="dev in devices" :key="dev.id" :value="dev.id">
                    {{ dev.u_device_name }}
                  </option> -->
                </select>
              </div>
            </div>
            <!------------ Interval INPUT ------------------->
            <div class="mb-3">
              <label for="interval" class="col-form-label"
                >Интервал обновления:</label
              >
              <select
                v-model="interval"
                class="form-select"
                aria-label="Default select example"
                id="interval"
              >
                <option selected value="10">10 секунд</option>
                <option value="30">30 секунд</option>
                <option value="60">60 секунд</option>
                <option value="300">5 минут</option>
                <option value="900">15 минут</option>
                <option value="1800">30 минут</option>
                <option value="3600">60 минут</option>
              </select>
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
            @click="addDash"
            type="button"
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
import Devices_List from "./Devices_List.vue";
import axios from "axios";

export default {
  name: "PopupAdd_Dash",
  props: {
    groupId: {
      type: Number,
    },
  },
  components: {
    Devices_List,
  },
  data() {
    return {
      group_id: null,
      device_id: null,
      parName: "",
      interval: 10,
    };
  },
  mounted() {
    this.group_id = this.groupId;
  },
  methods: {
    getValueOptions(event){
      console.log(event.target.value)
    },
    getDeviceId(event) {
      this.device_id = event.target.value;
    },
    //------------------------------ДОБАВЛЕНИЕ НОВОГО ГРАФИКА
    async addDash() {
      this.group_id = this.groupId; // присваиваем значение из props
      // console.log("ID группы: " + this.group_id);
      // console.log("ID устройства: " + this.device_id);
      // console.log("Интервал: " + this.interval);
      axios.defaults.withCredentials = true;
      await axios
        .post("dashboards/add/dash", {
          group_id: this.group_id,
          device_id: this.device_id,
          Par_name: this.parName,
          interval: this.interval,
        })
        .then(() => {
          this.$router.go(0);
        })
        .catch((err) => {
          // alert(err.response.data.detail);
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
