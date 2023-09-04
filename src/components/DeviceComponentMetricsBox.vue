<template>
  <!-- ТЕКУЩИЕ ПОКАЗАТЕЛИ -->
  <!-- --------------------BOX_1------------ -->
  <div class="container mt-1">
    <div class="row d-flex">
      <div class="col-12 col-sm-12 col-md-12 info_box_1">
        <div v-if="resultListMetrics.length !== 0">
          <div class="mx-1">
            <span
              v-for="item in resultListMetrics"
              :key="item.name"
              class="info"
              >{{ item.name }} - <span class="marker">{{ item.value }}</span>
              <span class="del_button">{{ "\u2715" }}</span>
            </span>

            <span class="info"
              >Текущий шаг - <span class="marker">{{ currentStep }}</span>
              <span class="del_button">{{ "\u2715" }}</span>
            </span>

            <span class="info"
              >Последняя активность -
              <span class="marker">{{ lastActivity }}</span>
              <span class="del_button">{{ "\u2715" }}</span>
            </span>
          </div>
          <button class="btn btn-secondary btn-sm">Добавить показатель</button>
        </div>
        <div class="no_data" v-if="resultListMetrics.length === 0">
          Текущие данные отсутствуют
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DeviceComponentMetricsBox",
  components: {},
  props: {
    device_id: {
      type: Number,
    },
  },
  data() {
    return {
      resultListMetrics: [],
      noData: true,
      params: null,
      metrics: null,
      result: null,
      movement: null,
      currentStep: null,
      lastActivity: null,
    };
  },

  async mounted() {
    try {
      const response = await axios.get(`/devices/id/${this.device_id}`);
      console.log(response.data[0]);
      console.log(response.data[0].last_activity);
      //2023-09-01T16:22:32.749247
      this.currentStep = response.data[0].step_name;

      this.lastActivity = new Date(
        response.data[0].last_activity
      ).toLocaleDateString("ru-US", {
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
      console.log(this.currentStep);
      console.log(this.lastActivity);
    } catch (error) {
      console.log(error);
      alert(error);
    }
    try {
      //получаем все текущие параметры
      const lastByInterval = await axios.get(
        `/queries/last_over_time/${this.device_id}`
      );
      const userParametersAll = await axios.get(`/user/parameters/get`); //получаем параметры пользователя
      const paramsFiltered = userParametersAll.data.filter(
        (p) => p.math_visible
      ); //сравниваем по math_visible
      this.params = paramsFiltered.map((el) => {
        if (el.name) return el.name;
      });
      // console.log(this.params) // "Наработка часы" "Счётчик запусков программ" "Мощность, кВт*ч" "Расход воды всего"

      for (let i = 0; i < this.params.length; i++) {
        const result = lastByInterval.data.metrics.find(
          (el) => el.name === this.params[i]
        );
        if (result) {
          this.resultListMetrics.push(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
.title {
  color: rgb(255, 255, 255);
}
button {
  margin: 5px;
}
.ava_box {
  color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 10px;
  background: linear-gradient(
    to right,
    rgba(197, 197, 248, 0.658),
    rgba(142, 142, 243, 0.699)
  );
}
.form-check-label {
  margin: 0;
}
.ava_box:hover {
  background: linear-gradient(
    to right,
    rgba(177, 177, 247, 0.658),
    rgba(126, 126, 243, 0.699)
  );
}
.info_box_1 {
  padding: 5px;
  border-radius: 10px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.959),
    rgba(255, 255, 255, 0.938)
  );
}

.modal-body {
  color: black;
}
.modal-header {
  color: black;
}
.marker {
  font-size: 14px;
  color: rgb(252, 228, 162);
  padding-right: 7px;
}
.info {
  display: inline-block;
  font-size: 14px;
  margin-left: 3px;
  padding-left: 8px;
  background-color: rgb(148, 154, 209);
  border-radius: 9px;
  cursor: pointer;
  color: white;
}

.del_button {
  border-radius: 10px;
  margin-right: 3px;
  margin-left: 5px;
  padding: 0 3px;
  background-color: rgb(87, 88, 88);
  font-size: 12px;
  align-items: center;
}
.del_button:hover {
  background-color: rgb(11, 127, 156);
}
.no_data {
  color: rgb(211, 117, 11);
}
</style>
