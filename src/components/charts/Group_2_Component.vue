<template>
  <!------------------------------ TITLE GROUP ----------------------------------->
  <div class="d-flex justify-content-between align-middle">
    <div class="d-flex align-items-center col-12 col-sm-6">Избранное</div>
    <div class="col-12 col-sm-6">
      <button type="button" class="btn btn-success float-end">
        Добавить в избранное
      </button>
    </div>
  </div>
  <hr />
  <!------------------------------- CHARTS RENDER ---------------------------------->
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-6 mx-auto p-4">
      <Chart_Line />
    </div>
  </div>
</template>

<script>
// import Chart_Bar from "./All_Charts/Chart_Bar.vue";
import Chart_Line from "./All_Charts/Chart_Line.vue";
// import Chat_Doughnut from "./Chart_Doughnut.vue";
// import Chart_Pie from "./Chart_Pie.vue";
// import Chart_PolarArea from "./Chart_PolarArea.vue";

// import axios from "axios";

export default {
  name: "Group_2_Component",
  components: {
    // Chart_Bar,
    Chart_Line,
    // Chat_Doughnut,
    // Chart_Pie,
    // Chart_PolarArea,
  },
  data() {
    return {};
  },

  async created() {
    // axios.defaults.withCredentials = true;
    // await axios
    //   .post("")
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(err);
    //   });
  },
};
</script>
<style scoped>

</style>
