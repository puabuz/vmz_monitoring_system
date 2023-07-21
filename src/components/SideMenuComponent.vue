<template>
  <div class="menu">
    <div class="title">
      <span>Меню</span>
    </div>
    <div class="list_menu">
      <div class="item__menu">Item 1</div>
      <div class="item__menu">Item 2</div>
      <div class="item__menu">Item 3</div>
      <div class="item__menu">Item 4</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "SideMenuComponent",
  methods: {
  },
};
</script>

<style scoped>

span{
  padding-left: 5px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
}
.menu{
  border: 1px solid;
  padding: 1vh 0;
  position: fixed;
  left: -235px;
  z-index: 1;
  height: 100vh;
  width: 250px;
  backdrop-filter: blur(10px);
  border-right: 20px solid rgba(75, 235, 235, 0.164);
}
.menu:hover{
  left: 0;
  transition: all 0.2s ease;
}

.title{
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 20px;
}
.list_menu{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
}
.item__menu{
  height: 40px;
  padding: 5px 15px 5px 15px;
  cursor: pointer;
 
}
.item__menu:hover{
  background-color: rgba(200, 240, 240, 0.76);
}
button{
  width: 98%;
  margin: 2px;
  border: 1px solid;
  background-color: #fff;
}

</style>
