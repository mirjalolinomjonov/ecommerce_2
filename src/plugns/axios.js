import axios from "axios";

const $axios = axios.create({
  baseURL: "http://94.158.54.194:9092/api",
  headers: {
    'Content-Type': 'application/json'
  },
});

export default $axios;
