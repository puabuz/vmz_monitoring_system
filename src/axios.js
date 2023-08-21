import axios from "axios";

//каждый URL адрес, который мы запрашиваем, будет добавлять этот префикс
// обязательно проимпортировать в main.js
// axios.defaults.baseURL = "http://cloud/";  // http://192.168.105.167:8080/#/login  /
// axios.defaults.baseURL = "https://cloud/"
// axios.defaults.baseURL = "http://localhost:5000/"; 
axios.defaults.baseURL = "http://192.168.105.167:5000/";
// axios.defaults.baseURL = "http://192.168.105.12:8000/";
axios.defaults.withCredentials = true;

