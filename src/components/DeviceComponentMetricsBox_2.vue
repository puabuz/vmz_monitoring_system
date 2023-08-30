<template>
  <!-- --------------------BOX_1------------ -->
  <div class="container">
    <div class="row d-flex">
      <div class="col-12 col-sm-12 col-md-12 info_box_1">
        <div v-if="!noData">
          <div class="mx-1">
            <span class="info"
              >Текущая программа - <span class="marker">Быстрая стирка</span>
            </span>
          </div>
          <div><button class="btn btn-outline-secondary btn-sm">+</button></div>
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
  name: "DeviceComponentMetricsBox_2",
  components: {},
  props: {
    device_id: {
      type: Number,
    },
  },
  data() {
    return {
      metrics: null,
      noData: false,
      result: null,
      movement: null,
    };
  },
  methods:{
    test(event){
      console.log(event.target.value)
    }
  },
  async mounted() {
    // ----------------------------GET ALL DEVICES-------------------------
    // console.log(this.device_id);
    try {
      const res = await axios.get(`/queries/last_over_time/${this.device_id}`);
      this.metrics = res.data.metrics;

      if (this.metrics.length == 0) {
        this.noData = true;
      }
    } catch (error) {
      // alert("ОШИБКА " + error);
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
.form-check-label{
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
.marker{
  font-size: 14px;
  color: rgb(252, 228, 162);
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
</style>
