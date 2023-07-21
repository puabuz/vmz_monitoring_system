import axios from "axios";

//каждый URL адрес, который мы запрашиваем, будет добавлять этот префикс
// обязательно проимпортировать в main.js
axios.defaults.baseURL = "http://localhost:5000/"; 
// axios.defaults.baseURL = "http://192.168.105.12:8000/";
