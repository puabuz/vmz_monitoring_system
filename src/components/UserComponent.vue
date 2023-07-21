<template>
  <div class="row drop_down_container">
    <!----------------------------- ERROR LIST BOX -------------------------------->
    <div class="errors_box col-12 col-md-6">
      <h6>Ошибки</h6>
      <div>
        <select class="form-select" size="6" @click="getErrorDesc($event)">
          <option selected>Просмотреть ошибки</option>
          <option style="color: tomato" value="Подробное описание ошибки 1">
            <span>&#x2022; Ошибка 1</span>
          </option>
          <option style="color: tomato" value="Подробное описание ошибки 2">
            <span>&#x2022; Ошибка 2</span>
          </option>
          <option style="color: tomato" value="Подробное описание ошибки 3">
            <span>&#x2022; Ошибка 3</span>
          </option>
        </select>
      </div>
    </div>
    <!----------------------------- HISTORY BOX ---------------------------------->
    <div class="history_box col-12 col-md-6">
      <h6>История</h6>
      <div>
        <select class="form-select" size="6">
          <option selected>Просмотреть шаги</option>
          <option value="3">&#x2022; Шаг 3</option>
          <option value="2">&#x2022; Шаг 2</option>
          <option value="1">&#x2022; Шаг 1</option>
        </select>
      </div>
    </div>
    <div v-if="errorDesc" class="errorDesc">
      <p>{{ errorDesc }}</p>
    </div>
    <hr />
    <!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FILTER %%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
    <div>
      <h6>Фильтры</h6>
    </div>

    <div class="row filter_wrapper mx-auto">
      <!------------------------ ORGANIZATION DROPDOWN ------------------------->
      <div class="col-12 col-sm-12 col-md-6 mb-10px mb-3">
        <Organization_List />
      </div>
      <!--------------------------- DEVICE DROPDOWN ---------------------------->
      <div class="col-12 col-sm-12 col-md-6 mb-10px mb-3">
        <Device_List />
      </div>
      <!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
    </div>
  </div>
  <!----------------------------------- CHARTS --------------------------------->
  <div class="container"><ChartsAll /></div>
</template>

<script>
import Organization_List from "./Organization_List.vue";
import Device_List from "./Devices_List.vue";
import ChartsAll from "./charts/ChartsAll.vue";

export default {
  name: "UserComponent",
  components: {
    Organization_List,
    Device_List,
    ChartsAll,
  },
  data() {
    return {
      errorDesc: "",
    };
  },
  methods: {
    getErrorDesc(event) {
      this.errorDesc = event.target.value;
    },
  },
};
</script>
<style scoped>
h6 {
  margin-bottom: 20px;
}
p {
  margin: auto;
}
.errorDesc {
  border: 2px solid tomato;
  border-radius: 6px;
  margin-bottom: 10px;
}
.errors_box {
  margin-bottom: 40px;
}
.history_box {
  margin-bottom: 40px;
}
.drop_down_container {
  margin-bottom: 40px;
}
.inform {
  border: 1px solid black;
  margin-bottom: 40px;
  margin-top: 40px;
}
</style>
