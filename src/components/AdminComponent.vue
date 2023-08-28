<template>
  <div class="container mb-2 mt-3">
    <div class="title">Админ-панель</div>
  </div>
  <hr />
</template>

<script>

export default {
  name: "AdminComponent",
  components: {},
  data() {
    return {
    };
  },
  created(){
    if(!this.$store.getters.getUserIsAdmin){
      this.$router.push("/error");
    }
  }
};
</script>

<style scoped>
.title{
  color: rgb(255, 255, 255);
}
</style>
