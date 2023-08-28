<template>
  <div class="container">
    <div class="d-flex justify-content-between">
      <div class="m-2 dash_title">
        <h5>{{ device }}</h5>
      </div>
      <div class="m-2 dash_title">
        <h6>{{ dashName }}</h6>
      </div>
    </div>
    <div
      class="card flex flex-row gap-1 p-fluid data_picker justify-content-center"
    >
      <div
        @click="disabledModeEnabled"
        class="d-flex flex-column justify-content-end col-4"
      >
        <label for="calendar-24h" class="font-bold block mb-2">
          Диапазон
        </label>
        <TreeSelect
          @change="selectInterval($event)"
          id="dropdownInterval"
          v-model="selectedValue"
          :options="nodes"
          placeholder="3 часа"
          class="md:w-20rem w-full select_option"
          :disabled="inputStartEnabled"
        />
      </div>
      <div @click="inputStartEnabled = true" class="col-4">
        <label for="example-datetime-local-input" class="font-bold block mb-2"
          >Начало диапазона</label
        >
        <input
          :class="{ border_2: inputStartEnabled === false }"
          @change="getTimeStart($event)"
          v-model="setInterval.dateStart"
          class="form-control border_2"
          type="datetime-local"
          id="example-datetime-local-input"
          :disabled="!inputStartEnabled"
        />
      </div>
      <div class="col-4">
        <label for="example-datetime-local-input" class="font-bold block mb-2"
          >Конец диапазона</label
        >
        <input
          @change="getTimeEnd($event)"
          v-model="setInterval.dateEnd"
          class="form-control"
          type="datetime-local"
          id="example-datetime-local-input"
          :disabled="!setInterval.timeStart || !inputEndEnabled"
        />
      </div>
    </div>
  </div>
  <div v-if="errorMessage" class="text-danger text-end px-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill mx-1" viewBox="0 0 20 20">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg>{{ errorMessage }}</div>
  <!-- ***Chart-Component*** -->
  <highcharts :constructor-type="'stockChart'" :options="chartOptions" />
  <!-- ***Chart-Component*** -->

  <div
    @click="showInfo = !showInfo"
    type="button"
    class="m-2 px-3 btn btn-info btn-sm button_info"
    value="i"
  >
    i
  </div>
  <transition name="fade">
    <div v-if="showInfo" class="mx-1">
      <span class="info"
        >Текущая программа - <span class="marker">Быстрая стирка</span>
      </span>
      <span class="info"
        >Текущий шаг - <span class="marker">Полоскание</span>
      </span>
      <span class="info"
        >Работа текущего цикла(мин) - <span class="marker">34 мин.</span></span
      >
      <span class="info"
        >Текущая температура - <span class="marker"></span>43°</span
      >
      <span class="info"
        >Часов работы за текущие сутки - <span class="marker">18 ч</span></span
      >
      <span class="info"
        >Часов работы за текущую неделю - <span class="marker">86 ч</span></span
      >
      <span class="info"
        >Часов работы за текущий месяц - <span class="marker">386 ч</span></span
      >
      <span class="info"
        >Часов работы за всё время - <span class="marker">1123 ч</span></span
      >
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import Highcharts from "highcharts";
import { TreeSelect } from "primevue/usetoast";
import { conversionData, getMetricsForDash } from "../../api";

Highcharts.setOptions({});

export default {
  name: "Chart_Line",
  components: {
    TreeSelect,
  },
  props: {
    label: {
      type: String,
    },
    Dash_Id: {
      type: Number,
    },
    Device_name: {
      type: String
    }
  },
  data() {
    return {
      inter: null,
      dashName: null,
      device: null,

      showInfo: false,
      datetime24h: "",
      selectedValue: null,

      inputStartEnabled: false,
      inputEndEnabled: false,

      errorMessage: null,

      nodes: [
        {
          key: 5,
          label: "5 мин",
        },
        {
          key: 10,
          label: "10 мин",
        },
        {
          key: 15,
          label: "15 мин",
        },
        {
          key: 30,
          label: "30 мин",
        },
        {
          key: 60,
          label: "1 час",
        },
        {
          key: 180,
          label: "3 часа",
          checked: true
        },
        {
          key: 360,
          label: "6 часов",
        },
        {
          key: 480,
          label: "8 часов",
        },
        {
          key: 720,
          label: "12 часов",
        },
        {
          key: 1440,
          label: "24 часа",
        },
      ],

      hcInstance: Highcharts,
      chartOptions: {
        series: [
          {
            data: [],
          },
        ],
      },
      setInterval: {
        timeStart: null,
        timeEnd: null,
        interval: 180,
        dateStart: null,
        dateEnd: null,

        unixStart: null,
        unixEnd: null,
        updateInterval: 15000,
      },
    };
  },
  methods: {
    disabledModeEnabled() {
      this.setInterval.dateStart = null;
      this.setInterval.dateEnd = null;
      this.inputStartEnabled = false;
      this.inputEndEnabled = false;
    },

    getTimeStart(event) {
      //unixStart - переводим дату в unix для нахождения разности минут
      this.setInterval.unixStart = Math.floor(
        new Date(event.target.value).getTime() / 1000
      );
      //Определяем часовой пояс для корректного отображения данных
      // this.setInterval.timeStart = new Date(event.target.value);
      this.setInterval.timeStart = new Date(event.target.value).toISOString();
      this.inputStartEnabled = true;
      this.inputEndEnabled = true;
    },

    async getTimeEnd(event) {
      //unixEnd - переводим дату в unix для нахождения разности минут
      this.setInterval.unixEnd = Math.floor(
        new Date(event.target.value).getTime() / 1000
      );
      let difference = this.setInterval.unixEnd - this.setInterval.unixStart;
      this.setInterval.interval = difference / 6 / 10;

      //Определяем часовой пояс для корректного отображения данных
      this.setInterval.timeEnd = new Date(event.target.value).toISOString();

      // ---Отправляем данные с диапазоном времени на сервер и задаем их в график.
      // console.log(this.setInterval.timeStart)
      // console.log(this.setInterval.timeEnd)

      this.chartOptions.series[0].data = await getMetricsForDash(
        this.Dash_Id,
        this.setInterval.timeStart,
        this.setInterval.timeEnd
      );
    },

    async selectInterval(event) {
      const selectValue = +Object.keys(event);
      let interval = selectValue;
      this.setInterval.interval = interval;
      this.setInterval.timeStart = Date.now() - 1000 * 60 * interval; // получаем начало интервала в UNIX
      this.setInterval.timeEnd = Date.now(); // получаем конец интервала в UNIX
      this.chartOptions.series[0].data = await getMetricsForDash(
        this.Dash_Id,
        this.setInterval.timeStart,
        this.setInterval.timeEnd
      );
    },
  },

  async mounted() {
 
    this.device = this.Device_name
    this.dashName = this.label

    this.setInterval.timeStart =
      Date.now() - 1000 * 60 * this.setInterval.interval; // получаем начало интервала в UNIX
    this.setInterval.timeEnd = Date.now(); // получаем конец интервала в UNIX


    await axios
      .post(`dashboard/graphs/${this.Dash_Id}`, {
        start_dt: this.setInterval.timeStart,
        end_dt: this.setInterval.timeEnd,
      })
      .then((res) => {
        this.chartOptions.series[0].data = conversionData(
          res.data.timestamps,
          res.data.values
        );
      })
      .catch((err) => {
        this.errorMessage = err.response.data.detail 
        console.log(err.response.data.detail);
      });
  },
  created() {
    this.inter = setInterval(async () => {
      this.setInterval.timeStart =
        Date.now() - 1000 * 60 * this.setInterval.interval; // получаем начало интервала в UNIX
      this.setInterval.timeEnd = Date.now(); // получаем конец интервала в UNIX
      this.chartOptions.series[0].data = await getMetricsForDash(
        this.Dash_Id,
        this.setInterval.timeStart,
        this.setInterval.timeEnd
      );
    }, 15000);
  },
  beforeUnmount() {
     clearInterval(this.inter);
   }
};
</script>

<style scoped>
.form-control {
  height: 50px;
}
.border_2:hover {
  border: 1px solid rgb(155, 132, 255);
  cursor: pointer;
  /* background-color: rgb(255, 255, 255); */
}
.select_option:hover {
  border: 1px solid rgb(155, 132, 255);
  cursor: pointer;
  /* background-color: rgb(255, 255, 255); */
}
.data_picker {
  border: none;
}

select {
  margin: 20px auto;
  height: 28px;
  cursor: pointer;
}
.dash_title {
  color: rgb(100, 100, 100);
}
.marker {
  color: rgb(252, 228, 162);
}
.button_info {
  color: rgb(255, 255, 255);
  font-size: 16px;
}
.info {
  display: inline-block;
  font-size: 14px;
  margin: 0 3px;
  padding: 0 8px;
  background-color: rgb(148, 154, 209);
  border-radius: 9px;
  cursor: pointer;
  color: white;
}
.info:hover {
  background-color: rgb(165, 168, 207);
}
/* ANIMATIONS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
