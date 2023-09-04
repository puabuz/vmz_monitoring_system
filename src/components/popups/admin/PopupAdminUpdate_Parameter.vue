<template>
  <!-- -----------------------------------POPUP------------------------------ -->
  <div
    class="modal fade"
    :id="`updateParams${param.id}`"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title modal_body" id="exampleModalLabel">
            Редактировать параметр
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="container">
          <div class="modal-body modal_body">
            Название параметра - {{ param.name }}
          </div>
          <form>
            <label class="modal_body" for="paramDesc">Описание параметра</label>
            <input
              v-model="description"
              id="paramDesc"
              class="form-control modal_body"
              type="text"
              aria-label="default input example"
            />
            <div class="my-3">
              <label
                class="modal_body my-0 mx-3"
                for="math_visible"
                value="math_visible"
                >Math visible</label
              >
              <input
                @change="
                  handlerValue(
                    'math_visible',
                    this.param
                  )
                "
                class="form-check-input"
                id="math_visible"
                type="checkbox"
                :checked="math_visible"
              />
            </div>

            <div class="my-3">
              <label
                class="modal_body my-0 mx-3"
                for="graph_visible"
                value="graph_visible"
                >Graph visible</label
              >
              <input
                @change="
                  handlerValue(
                    'graph_visible',
                    this.param
                  )
                "
                class="form-check-input"
                id="graph_visible"
                type="checkbox"
                :checked="graph_visible"
              />
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Закрыть
          </button>
          <button @click="onSubmit(param.id)" type="button" class="btn btn-primary" data-bs-dismiss="modal">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PopupAdminUpdate_Parameter",
  components: {},
  props: {
    param: {
      type: Object,
    },
  },
  data() {
    return {
      description: null,
      graph_visible: null,
      math_visible: null,
      newParams: null
    };
  },
  mounted() {
    this.description = this.param.description;
    this.graph_visible = this.param.graph_visible;
    this.math_visible = this.param.math_visible;
  },
  methods: {
  async handlerValue(string, param) {
      if (string == "graph_visible") {
        this.graph_visible = !this.graph_visible
      } else {
        this.math_visible = !this.math_visible;
      }
      this.newParams = {
        name: param.name,
        description: this.description,
        graph_visible: this.graph_visible,
        math_visible: this.math_visible,
      }
      console.log(this.newParams)
    },
    async onSubmit(param_id){
      await axios.put(`/adm/default_parameters/upd/${param_id}`, this.newParams)
    }
  },
};
</script>

<style scoped>
.modal_body {
  color: black;
}

</style>
