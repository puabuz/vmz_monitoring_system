<template>
  <div
    class="tab-pane fade"
    id="contact"
    role="tabpanel"
    aria-labelledby="contact-tab"
  >
    <!-- ----------------------------------- -->
    <div class="container mt-5">
      <table class="table table-dark table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название параметра</th>
            <th scope="col">Graph</th>
            <th scope="col">Math</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(param, idx) in params" :key="param.id">
            <th scope="row">{{ idx + 1 }}</th>
            <td>{{ param.name }}</td>
            <td>
              <input type="checkbox" :checked="param.graph_visible" disabled />
            </td>
            <td>
              <input type="checkbox" :checked="param.math_visible" disabled />
            </td>
            <td class="text-end">
              <button
                type="button"
                class="btn btn-secondary btn-sm m-0 mx-1 mb-1"
                data-bs-toggle="modal"
                :data-bs-target="`#updateParams${param.id}`"
              >
                Редактировать
              </button>
              <button class="btn btn-secondary btn-sm m-0 mx-1">Удалить</button>
            </td>
            <PopupAdminUpdate_Parameter :param="param" />
          </tr>
          
        </tbody>
      </table>
    </div>
    <!-- ----------------------------------- -->
  </div>
</template>

<script>
import axios from "axios";
import PopupAdminUpdate_Parameter from "../popups/admin/PopupAdminUpdate_Parameter.vue";

export default {
  name: "AdminParameters_Component",
  components: { PopupAdminUpdate_Parameter },
  data() {
    return {
      params: null,
    };
  },
  methods: {
  },
  async mounted() {
    const response = await axios.get(`/info/parameter_list`);
    this.params = response.data;
  },
};
</script>

<style scoped>
</style>
