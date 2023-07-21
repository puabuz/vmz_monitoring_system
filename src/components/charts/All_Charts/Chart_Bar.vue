<template>
  <Bar :data="chartData" :options="chartOptions"/>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "Chart_Line",
  components: { Bar },
  data() {
    return {
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
            data: [4,6,8,3,5,7,5],
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
    test(){
      console.log(this.newData);
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },

  watch: {
    chartData: {
     handler(e){
      // console.log(e)
       return this.charData = {e}
     },
     deep: true
  }
},

computed:{
  getDataComp(){
    console.log(this.chartData.datasets)
      return this.chartData.datasets
    }
},
 
  mounted() {
    setInterval(() => {
      // console.log(this.chartData.datasets[0].data);
      this.chartData.datasets[0].data = [
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
      ];
      // this.chartData.datasets[0].data = this.newData
      // console.log(this.chartData.datasets[0].data)
    }, 3000);
  },

};
</script>
<style scoped></style>
