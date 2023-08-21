<template>
  <div class="container mb-2 mt-3">
    <div class="title">Контакты</div>
  </div>
  <hr>
  <div>
    <div class="d-flex justify-content-center m-5">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d36439.18508198659!2d34.2966987!3d55.1929061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1692178906387!5m2!1sru!2sru"
        width="600"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
  <div class="container">
    <p>ул.25 Октября, дом 101</p>
    <p>Телефон: 8-906-654-32-11, 8-906-654-32-12</p>
    <p>email: test@test.su</p>
  </div>
  <!--------------------------------POPUP ADD ORGANIZATION--------------------------------->
 
</template>

<script>
// import axios from "axios";

export default {
  name: "ContactsComponent",
  components: {},
  data() {
    return {};
  },
};
</script>
<style scoped>

.title{
  color:rgb(255, 255, 255);
}
p{
  color:rgb(255, 255, 255);
}
</style>
