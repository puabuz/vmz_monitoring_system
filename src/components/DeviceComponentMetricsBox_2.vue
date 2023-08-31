<template>
  <div>
    <!--------------- ПОКАЗАТЕЛИ ЗА ПЕРИОД ------>
    <!-- --------------------BOX_1------------ -->
    <span class="title_drop">За период</span>
    <span class="title_drop">
      <select @change="getValueOptions($event)" class="select_int">
        <option selected value="С начала суток">С начала суток</option>
        <option value="1h">1 час</option>
        <option value="2h">2 часа</option>
        <option value="3h">3 часа</option>
        <option value="12h">12 часов</option>
        <option value="24h">24 часов</option>
        <option value="48h">48 часов</option>
      </select>
    </span>
  </div>

  <div class="container mt-1">
    <div class="row d-flex">
      <div class="col-12 col-sm-12 col-md-12 info_box_1">
        <div v-if="resultInterval.length !== 0">
          <div class="mx-1">
            <span v-for="item in resultInterval" :key="item.name" class="info"
              >{{ item.name }} - <span class="marker">{{ item.value }}</span>
              <span class="del_button">{{ "\u2715" }}</span>
            </span>
          </div>
          <button class="btn btn-secondary btn-sm">Добавить показатель</button>
        </div>
        <div class="no_data" v-if="resultInterval.length === 0">Данные за этот период отсутствуют</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserParams, getCurrentMetrics, getMetricsStepStart } from "../api";

export default {
  name: "DeviceComponentMetricsBox_2",
  components: {},
  props: {
    device_id: {
      type: Number,
    },
  },
  data() {
    return {
      resultInterval: [],
      params: null,
      metrics: null,
      noData: true,
      result: null,
      movement: null,
      selectedValue: "",
    };
  },
  methods: {
    async getValueOptions(event) {
      if (event.target.value === "С начала суток") {
        this.selectedValue = `${String(new Date().getHours())}h`;// получаем количество полных часов за текущие сутки
      } else {
        this.selectedValue = event.target.value;
      }
      this.resultInterval = [];
      try {
        this.params = await getUserParams();
      } catch (error) {
        alert(error);
      }
      // ---------------------------------------------------------------------
      try {
        // получаем все текущие метрики
        const lastByInterval = await getCurrentMetrics(this.device_id);
        // получаем метрики начала интервала
        const firstByInterval = await getMetricsStepStart(
          this.device_id,
          this.selectedValue
        );

        //---------------------FUNCTION---------------
        //функция для вычисления метрик за определенный промежуток времени
        //принимает: 
        // this.params.length - параметры пользователя(длину массива)
        // lastByInterval - все текущие метрики
        // firstByInterval - метрики начала интервала
        
        const result = []
        for (let i = 0; i < this.params.length; i++) {
          const lastParam = lastByInterval.data.metrics.find(
            (l) => l.name === this.params[i]
          );

          const firstParam = firstByInterval.data.metrics.find(
            (f) => f.name === this.params[i]
          );

          let value = lastParam?.value - firstParam?.value;
          if (value) {
            result.push({ name: this.params[i], value });
          }
        }
        //---------------------FUNCTION---------------
        this.resultInterval = result
      } catch (error) {
        alert(error);
      }
    },
  },
  async mounted() {
    this.selectedValue = `${String(new Date().getHours())}h`;
    // ----------------------------GET USER PARAMERTS-------------------------
    try {
      this.params = await getUserParams();
    } catch (error) {
      alert(error);
    }

    // ---------------------------------------------------------------------
    try {
      // получаем текущие данные
      const lastByInterval = await getCurrentMetrics(this.device_id);
      // получаем данные начала интервала
      const firstByInterval = await getMetricsStepStart(
        this.device_id,
        this.selectedValue
      );

      for (let i = 0; i < this.params.length; i++) {
        const lastParam = lastByInterval.data.metrics.find(
          (l) => l.name === this.params[i]
        );

        const firstParam = firstByInterval.data.metrics.find(
          (f) => f.name === this.params[i]
        );

        let value = lastParam?.value - firstParam?.value;
        if (value) {
          this.resultInterval.push({ name: this.params[i], value: value });
        }
      }
    } catch (error) {
      alert(error);
    }
  },
};
</script>
<style scoped>
.title {
  color: rgb(255, 255, 255);
}
.title_drop {
  margin-right: 10px;
}
.select_int {
  padding: 0 5px;
  border-radius: 5px;
  margin: 0;
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
  color: rgb(255, 255, 255);
  padding: 5px;
  border-radius: 10px;
  background: rgb(255, 255, 255);
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
.no_data{
  color: rgb(211, 117, 11)
}
</style>
