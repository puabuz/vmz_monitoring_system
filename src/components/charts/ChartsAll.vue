<template>
    <Group_1_Component />
    <!-- <Group_2_Component /> ---ИЗБРАННОЕ --> 
</template>

<script>
import Group_1_Component from "./Group_1_Component.vue"
// import Group_2_Component from "./Group_2_Component.vue"

export default {
  name: "ChartsAll",
  components: {
    Group_1_Component,
    // Group_2_Component, //избранное
  },
  data() {
    return {
      
    };
  },
};
</script>
<style scoped></style>
