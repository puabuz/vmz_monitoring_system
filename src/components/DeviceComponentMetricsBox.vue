<template>
  <!-- ТЕКУЩИЕ ПОКАЗАТЕЛИ -->
  <!-- --------------------BOX_1------------ -->
  <div class="container mt-1">
    <div class="row d-flex">
      <div class="col-12 col-sm-12 col-md-12 info_box_1">
        <div v-if="!noData">
          <div class="mx-1">
            <span v-for="item in resultInterval" :key="item.name" class="info"
              >{{ item.name }} - <span class="marker">{{ item.value }}</span>
              <span class="del_button">{{ "\u2715" }}</span>
            </span>
          </div>
          <button class="btn btn-secondary btn-sm">
              Добавить показатель
            </button>
          <!-- <div class="marker">Текущая температура - 60</div> -->
        </div>

        <div v-if="noData" class="info">
          <span class="marker">Данные отсутствуют</span>
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
      resultInterval: [],
      noData: false,
      params: ["Наработка часы", "Расход воды, л"],
      metrics: null,
      result: null,
      movement: null,
    };
  },

  async mounted() {
    //-------------------Получаем---------------------
    try {
      const res = await axios.get(`/queries/last_over_time/${this.device_id}`);

      this.metrics = res.data.metrics;
      console.log(this.metrics)
    } catch (error) {
      console.log(error);
    }
    //----------------------------------------
    try {
      const lastByInterval = await axios.post(
        `/queries/last_by_interval/${this.device_id}`,
        {
          interval: "3h",
        }
      );
      const firstByInterval = await axios.post(
        `/queries/first_by_interval/${this.device_id}`,
        {
          interval: "3h",
        }
      );

      for (let i = 0; i < this.params.length; i++) {
        const lastParam = lastByInterval.data.metrics.find(
          (l) => l.name === this.params[i]
        );
        const firstParam = firstByInterval.data.metrics.find(
          (f) => f.name === this.params[i]
        );
        let value = lastParam.value - firstParam.value;
        if (value) {
          this.resultInterval.push({ name: this.params[i], value: +value });
        }
      }
      if (this.resultInterval.length == 0) { // если данные отсутствуют...
        this.noData = true;
      }
      // console.log(this.resultInterval);
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
</style>
