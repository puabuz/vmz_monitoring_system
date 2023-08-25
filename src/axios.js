import axios from "axios";
axios.defaults.withCredentials = true;
const ENV = process.env.NODE_ENV === "production" ? "https://cloud" : "http://192.168.105.167:5000/"

//каждый URL адрес, который мы запрашиваем, будет добавлять этот префикс
// обязательно проимпортировать в main.js
// axios.defaults.baseURL = "http://cloud/";  // http://192.168.105.167:8080/#/login  /
// axios.defaults.baseURL = "https://cloud2/"
axios.defaults.baseURL = ENV;
// axios.defaults.baseURL = "http://localhost:5000/"; 
// axios.defaults.baseURL = "http://192.168.105.12:8000/";


