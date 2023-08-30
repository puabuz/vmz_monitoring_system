<template>
  <div class="container mb-2 mt-3">
    <div class="title">Устройства</div>
  </div>
  <hr />
  <button
    class="btn btn-secondary drop_down_btn mx-3"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal_2"
  >
    Добавить устройство
  </button>
  <hr />
  <div v-for="device in devices" :key="device.id" class="container mb-3">
    <!-- --------------------DEVICE------------ -->
    <div class="col-12 ava_box">
      {{ device.u_device_name }}
      <hr />

      <div class="d-flex justify-content-around">
        <div class="col-6 m-1">
          <div>
            <span class="title_drop">За период</span>
            <span class="title_drop">
              <select
                @change="test2"
                v-model="selectedValue"
                class="select_int"
              >
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
          <DeviceComponentMetricsBox_2 :device_id="device.id" />
        </div>
        <div class="col-6 m-1">
          <span class="title_drop">Текущие</span>
          
          <DeviceComponentMetricsBox :device_id="device.id" />
        </div>
      </div>
    </div>
    <!-- --------------------BOX_1------------ -->
  </div>
  <!--------------------------------POPUP ADD DEVICES--------------------------------->
  <PopupAdd_Devices />
</template>

<script>
import axios from "axios";
import PopupAdd_Devices from "./popups/PopupAdd_Devices.vue";
import DeviceComponentMetricsBox from "./DeviceComponentMetricsBox.vue";
import DeviceComponentMetricsBox_2 from "./DeviceComponentMetricsBox_2.vue";

export default {
  name: "DeviceComponent",
  components: {
    PopupAdd_Devices,
    DeviceComponentMetricsBox,
    DeviceComponentMetricsBox_2,
  },
  data() {
    return {
      selectedValue: "",
      devices: null,
      metrics: null,
    };
  },
  methods: {
    test2() {
      if (this.selectedValue === "С начала суток")
        console.log(`${String(new Date().getHours())}h`);
      else console.log(this.selectedValue);
    },
  },
  async mounted() {
    const hoursLastDay = new Date().getHours(); //получаем количество полных часов за текущие сутки
    this.selectedValue = `${String(hoursLastDay)}h`; // добавляем "h" в конце для корректности запроса

    
  
    // ----------------------------GET ALL DEVICES-------------------------
    const res = await axios.get("devices/all");
    this.devices = res.data;

    // -----------------------------------------------------
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
.select_int {
  padding: 0 5px;
  border-radius: 5px;
  margin: 0;
}
</style>
