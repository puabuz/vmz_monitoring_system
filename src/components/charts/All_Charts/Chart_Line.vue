<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <!-- --------------------------------->
      <div class="form-group row">
        <label for="example-datetime-local-input" class="col-form-label"
          >Начало</label
        >
        <div class="col-12">
          <input
            @change="getDataTime($event)"
            v-model="setInterval.dateStart"
            class="form-control"
            type="datetime-local"
            id="example-datetime-local-input"
          />
        </div>
      </div>
      <!-- --------------------------------->
      <div class="form-group row">
        <label for="example-datetime-local-input" class="col-form-label"
          >Конец</label
        >
        <div class="col-12">
          <input
            :disabled="!setInterval.dateStart"
            v-model="setInterval.dateEnd"
            @change="getDataTime($event)"
            class="form-control"
            type="datetime-local"
            id="example-datetime-local-input"
          />
        </div>
      </div>
      <!-- --------------------------------->
    </div>
  </div>

  <div class="d-flex justify-content-end">
    <div class="col-3 d-flex justify-content-end mb-3">
      <div @click="selectIntervalEnabled" class="selectBox">
        <select
          :disabled="setInterval.dateEnd"
          @change="getDataTime($event)"
          class="form-select form-select-sm mt-1 mb-1"
          aria-label=".form-select-sm example"
        >
          <option selected>Диапазон</option>
          <option value="60">1 час</option>
          <option selected value="180">3 часа</option>
          <option value="360">6 часов</option>
          <option value="480">8 часов</option>
          <option value="720">12 часов</option>
          <option value="1440">24 часа</option>
        </select>
      </div>
    </div>
  </div>

  <Line class="border" :data="chartData" :options="chartOptions" />

</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "Chart_Line",
  components: {
    Line,
  },
  props: {
    label: {
      type: String,
    },
  },
  data() {
    return {
      setInterval: {
        dateStart: null,
        dateEnd: null,
        interval: null,
        disabledMode: true,
      },
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 25, 43, 30, 44, 25, 18],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
      },
    };
  },
  methods: {
    getDataTime(event) {
      console.log(event.target.value);
    },
    selectIntervalEnabled(){
      this.setInterval.dateStart = null
      this.setInterval.dateEnd= null
    }
  },
  created() {
    this.chartData.datasets[0].label = this.label;
    console.log();
    // console.log(this.chartData.datasets[0].label)
  },
  // methods:{
  //   test(){
  //     console.log(this.chartData.datasets[0].label);
  //   }
  // }
};
</script>

<style scoped>

select {
  margin: 20px auto;
  height: 28px;
  cursor: pointer;
}
button {
  background-color: rgba(200, 240, 240, 0.76);
  border: 0 solid;
  width: 5em;
}
</style>
