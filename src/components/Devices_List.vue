<template>
  <!----------------------------DEVICES DROPDOWN-------------------------------->
  <div class="col-12 mb-10px mb-3">
    <div>
      <h6>Устройства</h6>
    </div>
    <select @change="sendEmit($event)" class="form-select">
      <option selected value=0>Все устройства</option>
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
    //-------- при помощи event получаем ID устройства из select
    //-------- при помощи $emit отправляем id организации в родительский компонент
    sendEmit(event) {
      this.device_id = +event.target.value;
      this.$emit("getDeviceId", +event.target.value);
    },
    retNull(){
      return null
    }
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
<style scoped>
.form-select {
  cursor: pointer;
}
.form-select:hover {
  background: rgb(241, 241, 241);
}
</style>
