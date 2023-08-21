<template>
  <!-- --------------------BOX_1------------ -->
  <div class="container">
    <div class="row d-flex justify-content-around">
      <div class="col-12 col-sm-12 col-md-5 info_box_1 m-1 border">
        <div class="info">
          Текущая программа - <span class="marker">Быстрая стирка</span>
        </div>
      </div>
      <!-- --------------------BOX_2------------ -->
      <div class="col-12 col-sm-12 col-md-5 info_box_1 m-1 border">
        <div class="info">
          Текущая программа - <span class="marker">Быстрая стирка</span>
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
  props:{
    
  },
  data() {
    return {
      metrics: null,
    };
  },
  async mounted() {
    // ----------------------------GET ALL DEVICES-------------------------
    try {
      const res = await axios.get("devices/all");
      this.devices = res.data;
      console.log(this.devices); 
    } catch (error) {
      console.log(error)
    }
    

    // try {
    //   const res = await axios.get(`/queries/last_over_time/2`);
    //   this.metrics = res.data.metrics;
    //   console.log(this.metrics);
    // } catch (error) {
    //   console.log("ОШИБКА " + error);
    // }
  },
};
</script>
<style scoped>
.title {
  color: rgb(255, 255, 255);
}
button {
  margin: 10px 12px;
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
  background: linear-gradient(
    to right,
    rgba(54, 152, 233, 0.959),
    rgba(53, 121, 211, 0.938)
  );
}
.info_box_1:hover {
  background: linear-gradient(
    to right,
    rgba(66, 159, 235, 0.959),
    rgba(65, 133, 221, 0.938)
  );
}
</style>
