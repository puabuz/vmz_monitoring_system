<template>
    <div
      class="tab-pane fade show active"
      id="home"
      role="tabpanel"
      aria-labelledby="home-tab"
    >
      <button
        type="button"
        class="btn btn-secondary btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#addNews"
      >
        Добавить новость
      </button>

      <hr class="line" />
    </div>
  
</template>

<script>
export default {
  name: "AdminNews_Component",
  components: {},
  data() {
    return {};
  },
};
</script>

<style scoped></style>
