<template>
  <div class="col-12">
    <button
      class="btn btn-success drop_down_btn mx-auto"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal_addGroup"
    >
      Добавить группу
    </button>
  </div>
  <!-- %%%%%%%%%%%%%%%%%%%%%%%%%%  Цикл 1  %%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
  <div v-for="group in listGroups" :key="group.id">
    <!------------------------------ TITLE GROUP ----------------------------------->
    <div class="d-flex justify-content-between align-middle">
      <div class="d-flex align-items-center col-12 col-sm-6">
        <h2>{{ group.name }}</h2>
      </div>
    </div>
    <h6 v-if="group.description">{{ group.description }}</h6>
    <hr />
    <!----------------------------- CHARTS RENDER ---------------------------------->
    <div class="w-25">
      <button
        @click="getGroupID(group.id)"
        type="button"
        class="btn btn-light drop_down_btn mx-auto w-25"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal_addDash"
      >
        +
      </button>
    </div>

    
      <div class="row">
      <!-- %%%%%%%%%%%%%%%%%%%%%%%%%%  Цикл 2  %%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
      <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 mx-auto">
        <div class="">
          <div v-for="item in listCharts" :key="item.Group_id" class="mb-5">
            <!----------------- Передаем пропсы ------------------>

            <Chart_Line
              v-if="group.id === item.Group_id"
              :label="item.Dash_name"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--------------------------------POPUP ADD GROUP--------------------------------->
  <PopupAdd_Group />
  <!--------------------------------POPUP ADD DUSH---------------------------------->
  <PopupAdd_Dash :groupId="groupId" />
</template>

<script>
import axios from "axios";
import PopupAdd_Group from "../PopupAdd_Group.vue";
import PopupAdd_Dash from "../PopupAdd_Dash.vue";
import Chart_Line from "./All_Charts/Chart_Line.vue";
// import Chart_Bar from "./All_Charts/Chart_Bar.vue";
// import Chat_Doughnut from "./Chart_Doughnut.vue";
// import Chart_Pie from "./Chart_Pie.vue";
// import Chart_PolarArea from "./Chart_PolarArea.vue";

export default {
  name: "Group_1_Component",
  components: {
    PopupAdd_Group,
    PopupAdd_Dash,
    // Chart_Bar,
    Chart_Line,
    // Chat_Doughnut,
    // Chart_Pie,
    // Chart_PolarArea,
  },
  data() {
    return {
      listGroups: null,
      listCharts: null,
      groupId: null,
    };
  },

  methods: {
    test() {
      // console.log("Массив групп:");
      // console.log(this.listGroups);
      // console.log("Массив графиков:");
      console.log(this.listCharts);
    },
    getGroupID(id) {
      console.log(id);
      this.groupId = id;
    },
  },

  async created() {
    //-------------------Получаем данные для графиков
    axios.defaults.withCredentials = true;

    //----------------------Получаем список групп
    await axios
      .get("dashboards/list_groups")
      .then((res) => {
        this.listGroups = res.data;
      })
      .catch((err) => {
        console.log(`Ошибка получения данных: ${err.response.data.detail}`);
      });

    // ---------------Получаем данные графиков (Группа 1)
    await axios
      .get("/dashboards/list")
      .then((res) => {
        this.listCharts = res.data;
      })
      .catch((err) => {
        console.log(`Ошибка получения данных: ${err.response.data.detail}`);
      });
  },
};
</script>
<style scoped></style>
