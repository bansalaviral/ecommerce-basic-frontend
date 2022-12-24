import axios from "axios";

const instance = axios.create({
  // baseURL: "www.google.com/",
  headers: {
    "Content-Type": "application/json",
    "Acess-Control-Allow-Origin": "*",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    Accept: "application/json",
  },
});

export default instance;
