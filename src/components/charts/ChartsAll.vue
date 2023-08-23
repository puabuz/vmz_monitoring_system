<template>
  <div class="d-flex justify-content-between">
    <button
      class="btn btn-secondary drop_down_btn mx-3"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal_addGroup"
    >
      Добавить группу
    </button>
  </div>
  <div class="container">
    <button @click="sel = null" :class="sel === null ? 'active' : 'btn_tab'">
      Все группы
    </button>

    <!-- --------------template v-for-->
    <button
      @click="sel = group.id"
      v-for="group in listGroups"
      :key="group.id"
      :class="sel === group.id ? 'active' : 'btn_tab'"
    >
      {{ group.name }}
    </button>
    <!-- --------------template v-for-->
  </div>
  <!-- %%%%%%%%%%%%%%%%%%%%%%%%%%  Цикл 1  %%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
  <div v-for="group in listGroups" :key="group.id">
    <div v-if="group.id === sel || sel === null" class="charts_wrapper mb-3">
      <!------------------------------ TITLE GROUP ----------------------------------->
      <div class="d-flex justify-content-between align-middle">
        <div class="d-flex align-items-center col-12 col-sm-6">
          <h2>{{ group.name }}</h2>
        </div>
      </div>
      <h6 v-if="group.description">{{ group.description }}</h6>
      <!------------------------------ TITLE GROUP ----------------------------------->
      <div class="alert alert-warning p-1" role="alert" v-if="listDashboards == 0">
        Графиков для этого устройства нет
      </div>
      <button
        @click="this.groupId = group.id"
        type="button"
        class="btn btn-secondary drop_down_btn mx-auto"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal_addDash"
      >
        Добавить график
      </button>
      <hr />
      <!----------------------------- CHARTS RENDER ---------------------------------->
      <!-- %%%%%%%%%%%%%%%%%%%%%%%%%%  Цикл 2  %%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
      <div class="container d-flex flex-wrap">
        <template v-for="item in listDashboards" :key="item.Dash_id">
          <div
            v-if="group.id === item.Group_id"
            class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6 p-1"
          >
            <div class="chart_menu d-flex justify-content-end">
              <span
                @click="
                  (this.dashId = item.Dash_id), (this.groupId = item.Group_id)
                "
                class="chart_menu_item mx-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal_updateDash"
                >Редактировать</span
              >
              <span class="chart_menu_item mx-2">Удалить</span>
            </div>
            <div class="chart__wrapper">
              <!----------- Передаем пропсы(название и ID группы) ------------>
              <!----------------- Передаем данные в графики ------------------>
              <Chart_Line :label="item.Dash_name" :Dash_Id="item.Dash_id" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>

  <!--------------------------------POPUP ADD GROUP--------------------------------->
  <PopupAdd_Group />
  <!--------------------------------POPUP ADD DASH---------------------------------->
  <PopupAdd_Dash :groupId="groupId" />
  <!--------------------------------POPUP UPDATE DASH---------------------------------->
  <PopupUpdate_Dash
    :dashId="dashId"
    :groupId="groupId"
    :listGroups="listGroups"
  />
</template>

<script>
import PopupUpdate_Dash from "../popups/PopupUpdate_Dash.vue";
import PopupAdd_Group from "../popups/PopupAdd_Group.vue";
import PopupAdd_Dash from "../popups/PopupAdd_Dash.vue";
import Chart_Line from "./Chart_Line.vue";
import { getDashboardsList, getGroupsList } from "../../api";

export default {
  name: "ChartAll",
  components: {
    PopupAdd_Group,
    PopupAdd_Dash,
    PopupUpdate_Dash,
    Chart_Line,
  },
  props: {
    owner_id: {
      type: Number,
    },
    device_id: {
      type: Number,
    },
  },
  data() {
    return {
      listGroups: null,
      listDashboards: null,
      groupId: null,
      dashId: null,
      sel: null,
    };
  },

  watch: {
    async owner_id(ownerId) {
      //получаем список групп
      const response = await getGroupsList();
      this.listGroups = response.data;
      if (ownerId !== 0) {
        const result = this.listGroups.filter(
          (group) => group.owner === ownerId
        );
        this.listGroups = result;
      }
    },
    async device_id(deviceId) {
      //получаем список графиков
      const response = await getDashboardsList();
      this.listDashboards = response.data;
      if (deviceId !== 0) {
        const result = this.listDashboards.filter(
          (dash) => dash.Dash_device_id === deviceId
        );
        this.listDashboards = result;
      }
    },
  },
  async created() {
    //----------------------Получаем список групп
    try {
      const resGroupsList = await getGroupsList();
    this.listGroups = resGroupsList.data;
    } catch (err) {
      alert("Ошибка получения списка групп")
    }


    // --------------------Получаем список графиков
    try {
      const resDashboardsList = await getDashboardsList();
    this.listDashboards = resDashboardsList.data;  
    } catch (err) {
      alert("Ошибка получения списка групп")
    }
    
  },
};
</script>

<style scoped>
.active {
  padding: 5px 5px;
  margin: 0 5px;
  color: #ffffff;
  background-color: rgba(195, 252, 197, 0.712);
  border-radius: 6px 6px 0 0;
  border: none;
}
.btn_tab {
  padding: 5px 5px;
  margin: 0 5px;
  background-color: rgba(144, 172, 155, 0);
  border-radius: 6px 6px 0 0;
  border: none;
}
.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  background-color: rgba(162, 226, 187, 0.808);
  border: none;
}
.nav-link {
  border-bottom: 1px solid rgb(207, 207, 207);
}
.nav-link:hover {
  border: none;
}
.line_group {
  background-color: rgba(97, 156, 119, 0.507);
}
.line_group__title {
  color: rgb(255, 255, 255);
}
.border-1 {
  border: 2px solid red;
}
.drop_down_btn:hover {
  box-shadow: 3px 4px 8px rgb(122, 122, 122);
}
.charts_wrapper {
  padding: 15px;
  background: linear-gradient(
    to right,
    rgba(195, 252, 197, 0.712),
    rgba(108, 243, 115, 0.623)
  );
  border-radius: 15px;
  /* box-shadow: 3px 4px 8px rgb(122, 122, 122); */
}
.chart__wrapper {
  border-radius: 15px;
  border: 1px solid rgba(161, 215, 247, 0.548);
  background-color: #ffffff;
  /* box-shadow: 3px 4px 5px rgb(165, 165, 167); */
}

.chart_menu_item {
  cursor: pointer;
  color: rgb(22, 114, 131);
}
.chart_menu_item:hover {
  color: rgb(0, 97, 114);
}
</style>
