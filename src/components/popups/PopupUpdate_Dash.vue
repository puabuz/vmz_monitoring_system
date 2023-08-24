<template>
  <!-- -----------------------------------POPUP------------------------------ -->
  <div
    class="modal fade"
    id="exampleModal_updateDash"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Редактировать график...
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
            <!------------ move to ------------------->
            <div class="mb-3">
              <label for="params" class="col-form-label"
                >Переместить в...</label
              >
              <div class="col-12 mb-10px mb-3">
                <!-- <input  type="text" class="form-select" id="params" @change="getValueOptions($event)" required> -->
                <select
                  @change="setGroupId($event)"
                  id="params"
                  class="form-select"
                  required
                >
                  <option selected>Выберите группу</option>
                  <option
                    v-for="item in listGroups"
                    :value="item.id"
                    :key="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>

            <!------------ Params INPUT ------------------->
            <div class="mb-3">
              <label for="params" class="col-form-label">Params:</label>
              <div class="col-12 mb-10px mb-3">
                <!-- <input  type="text" class="form-select" id="params" @change="getValueOptions($event)" required> -->
                <select
                  @change="setParams($event)"
                  id="params"
                  class="form-select"
                  required
                >
                  <option selected>Выберите параметр</option>
                  <option value="Текущая скорость">Текущая скорость</option>
                  <option value="Температура нагрева">
                    Температура нагрева
                  </option>
                  <option value="Текущая температура">
                    Текущая температура
                  </option>
                  <option value="Уровень воды">Уровень воды</option>
                  <option value="Кол-во воды">Кол-во воды</option>
                </select>
              </div>
            </div>
            <!------------ Interval INPUT ------------------->
            <div class="mb-3">
              <label for="interval" class="col-form-label"
                >Интервал обновления:</label
              >
              <select
                @change="setInterval($event)"
                class="form-select"
                aria-label="Default select example"
                id="interval"
              >
                <option selected value="10">10 секунд</option>
                <option selected value="15">15 секунд</option>
                <option value="30">30 секунд</option>
                <option value="60">60 секунд</option>
                <option value="300">5 минут</option>
                <option value="900">15 минут</option>
                <option value="1800">30 минут</option>
                <option value="3600">1 час</option>
                <option value="10800">3 часа</option>
                <option value="21600">6 часов</option>
                <option value="28800">8 часов</option>
                <option value="43200">12 часов</option>
                <option value="86400">24 часа</option>
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
            @click="updateDash"
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
import axios from "axios";

export default {
  name: "PopupUpdate_Dash",
  props: {
    dashId: {
      type: Number,
    },
    groupId: {
      type: Number,
    },
    listGroups: {
      type: Object,
    },
  },
  data() {
    return {
      dash_id: null,
      group_id: null,
      parName: null,
      interval: 10,
    };
  },

  methods: {
    
    setGroupId(event) {
      console.log(event.target.value);
      this.group_id = event.target.value
    },

    setParams(event) {
      console.log(event.target.value);
      this.parName = event.target.value;
    },

    setInterval(event){
      console.log(event.target.value);
      this.interval = event.target.value
    },

    //------------------------------ДОБАВЛЕНИЕ НОВОГО ГРАФИКА
    async updateDash() {
      
      await axios
      .put(`/dashboard/graphs/${this.dashId}`, {

          group_id: this.group_id,
          Par_name: this.parName,
          interval: this.interval,
        })
        .then(() => {
          this.$router.go(0);
        })
        .catch((err) => {
          alert(err.response.data.detail);
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.form-select:hover {
  background: rgb(241, 241, 241);
}
</style>
