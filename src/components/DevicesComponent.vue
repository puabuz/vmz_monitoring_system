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
    <div v class="d-flex justify-content-between">
      <!-- --------------------DEVICE------------ -->
      <div class="col-12 col-sm- ava_box">
        {{ device.u_device_name }}
        <hr />
        <!-- --------------------BOX_1------------ -->
        <DeviceComponentMetricsBox :device_id="device.id"/>
      </div>
    </div>
  </div>
  <!--------------------------------POPUP ADD DEVICES--------------------------------->
  <PopupAdd_Devices />
</template>

<script>
import axios from "axios";
import PopupAdd_Devices from "./popups/PopupAdd_Devices.vue";
import DeviceComponentMetricsBox from "./DeviceComponentMetricsBox.vue";

export default {
  name: "DeviceComponent",
  components: {
    PopupAdd_Devices,
    DeviceComponentMetricsBox
  },
  data() {
    return {
      devices: null,
      metrics: null,
    };
  },
  async mounted() {
    // ----------------------------GET ALL DEVICES-------------------------
    const res = await axios.get("devices/all");
    this.devices = res.data;
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
