<template>
  <div class="container mb-2 mt-3">
    <div class="title">Дашборды</div>
  </div>
  <hr>
  <div class="container-fluid mt-5">
    <div class="row d-flex justify-content-between">

      <!----------------------------- HISTORY LIST BOX -------------------------------->
      <div
        class="card history_box col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5 mb-5"
      >
        <div class="card-body pb-0 d-flex flex-column">
          <h5 class="card-title">История</h5>
          <ul>
            <li><span>10:00 - </span>Отжим</li>
            <li><span>10:20 - </span>Сушка белья</li>
            <li><span>10:40 - </span>Завершение программы</li>
          </ul>
          <span class="dots">. . .</span>
          <div
            class="mt-auto d-flex flex-row-reverse"
            data-toggle="modal"
            data-target=".bd-example-modal-lg"
          >
            <button
              type="button"
              class="drop_down_btn btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#historyBox"
            >
              Показать историю
            </button>
          </div>
        </div>
      </div>

      <!----------------------------- ERROR LIST BOX ---------------------------------->
      <div
        class="card errors_box col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5 mb-5"
      >
        <div class="card-body pb-0 d-flex flex-column">
          <h5 class="card-title">Ошибки</h5>
          <ul>
            <li>Ошибка 10</li>
            <li>Ошибка 9</li>
            <li>Ошибка 8</li>
          </ul>
          <span class="dots">. . .</span>
          <div class="mt-auto d-flex flex-row-reverse">
            <button
              type="button"
              class="drop_down_btn btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#errorBox"
            >
              Показать ошибки
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FILTER %%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
  
  <div class="filter_wrapper">
    <div>
      <h6>Фильтры</h6>
    </div>
    <div class="row mx-auto dropdown_wrapper">

      <!------------------------ ORGANIZATION DROPDOWN ------------------------>
      <div class="col-12 col-sm-12 col-md-6 mb-3">
        <Organization_List />
      </div>

      <!--------------------------- DEVICE DROPDOWN --------------------------->
      <div class="col-12 col-sm-12 col-md-6 mb-3">
        <Device_List />
      </div>
    </div>
  </div>
  <!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%FILTER%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->

  <!--------------------------------- CHARTS --------------------------------->
  <div class="chart_wrapper"><ChartsAll /></div>

  <!------------------------------ POPUP HISTORY ------------------------------>
  <PopupHistory />

  <!----------------------------- POPUP ERRORS ------------------------------>
  <PopupErrors />
</template>

<script>
import Organization_List from "./Organization_List.vue";
import Device_List from "./Devices_List.vue";
import ChartsAll from "./charts/ChartsAll.vue";
import PopupHistory from "./popups/PopupHistory.vue";
import PopupErrors from "./popups/PopupErrors.vue";

export default {
  name: "UserComponent",
  components: {
    Organization_List,
    Device_List,
    ChartsAll,
    PopupHistory,
    PopupErrors,
  },
  methods: {
    getErrorDesc(event) {
      this.errorDesc = event.target.value;
    },
  },
};
</script>

<style scoped>
.title{
  color:rgb(255, 255, 255);
}
.dots{
  font-weight: bold;
  margin-left: 13px;
}
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
  border: none;
  padding: 15px;
  border-radius: 15px;
  overflow: hidden;
  /* ------------BG-ERRORS------------ */
  background: linear-gradient(to right, rgba(255, 232, 170, 0.788), rgba(250, 203, 73, 0.788));
}
.errors_box:hover {
  background: linear-gradient(to right, rgba(255, 246, 221, 0.856), rgba(252, 214, 110, 0.856));
}
.history_box {
  border: none;
  padding: 15px;
  border-radius: 15px;
  overflow: hidden;
  /* ------------BG-HISTORY------------ */
  background: linear-gradient(to right, rgba(197, 197, 248, 0.658), rgba(142, 142, 243, 0.699));
}

.history_box:hover {
  background: linear-gradient(to right, rgba(212, 212, 247, 0.849), rgba(146, 146, 238, 0.829));
}
.filter_wrapper {
  /* ------------BG-FILTER------------ */
  background: linear-gradient(to right, rgba(191, 217, 247, 0.849), rgba(40, 187, 255, 0.753));
  padding: 15px;
 
  border-radius: 15px;
  /* box-shadow: 2px 2px 2px rgb(122, 122, 122); */
}

.filter_wrapper:hover {
  background: linear-gradient(to right, rgba(177, 209, 245, 0.788), rgba(32, 182, 252, 0.76));
}

.dropdown_wrapper {
  margin: 40px 0;
}

.drop_down_btn:hover {
  box-shadow: 3px 4px 8px rgb(122, 122, 122);
}
</style>
