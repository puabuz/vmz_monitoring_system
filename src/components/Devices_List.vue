<template>
  <!----------------------------DEVICES DROPDOWN-------------------------------->
  <div class="col-12 mb-10px mb-3">
    <select @change="getValueOptions($event)" class="form-select">
      <option selected>Все устройства</option>
      <option v-for="dev in devices" :key="dev.id" :value="dev.id">
        {{ dev.u_device_name }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Device_List",
  data() {
    return {
      devices: null,
      device_id: null,
    };
  },
  methods: {
    getValueOptions(event) {
      // console.log(event.target.value);
      this.device_id = event.target.value;
    },
  },

  //-------- при помощи $emit отправляем id устройства в родительский компонент
  sendEmit() {
    this.$emit("getDeviceId", {
      device_id: this.device_id,
    });
  },

  async mounted() {
    // ----------------------------GET ALL DEVICES-------------------------
    axios.defaults.withCredentials = true;
    await axios
      .get("devices/all")
      .then((res) => {
        this.devices = res.data;
      })
      .catch(() => {
        console.log("Ошибка получения устройств");
      });
  },
};
</script>
<style scoped></style>
