<template>
  <!-- --------------------BOX_1------------ -->
  <div class="container">
    <div class="row d-flex">
      <div class="col-12 col-sm-12 col-md-12 info_box_1">
        <div v-if="!noData" class="info">
          <div>Текущая температура - <span class="marker">60</span></div>
        </div>

        <div v-if="noData" class="info">
          <span class="marker">Данные отсутствуют</span>
        </div>
      </div>

      <div class="d-flex justify-content-end p-0">
        <!-- Modal_Button -->
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          data-bs-toggle="modal"
          :data-bs-target="`#exampleModal${devices_id}`"
        >
          +
        </button>

        <!-- Modal -->
        <div
          class="modal fade"
          :id="`exampleModal${devices_id}`"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header ">
                <h5 class="modal-title" id="exampleModalLabel">Выбрать метрики для отображения</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <!-- -----------v-for--------------- -->
              <template v-for="string in metrics" :key="string.name">
              <div class="modal-body py-0">
                <div class="form-check">
                  <input @change="test($event)"
                    class="form-check-input"
                    type="checkbox"
                    :value="string.name"
                    :id="string.name"
                  />
                  <label class="form-check-label" :for="string.name">
                    {{ string.name }} - {{ string.value }}
                  </label>
                </div>
              </div>
            </template>
              <!-- -----------v-for--------------- -->
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Закрыть
                </button>
                <button type="button" class="btn btn-primary">Сохранить</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal -->
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
      // console.log(res.data.metrics)
      this.metrics = res.data.metrics;
      console.log(this.metrics);

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
.modal-body {
  color: black;
}
.modal-header {
  color: black;
}
</style>
