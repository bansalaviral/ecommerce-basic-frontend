import axios from "axios";
console.log(process.env.REACT_APP_BASE_URI);
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URI,
  headers: {
    "Content-Type": "application/json",
    "Acess-Control-Allow-Origin": "*",
    Authorization: `Bearer ${
      localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : ""
    }`,
    Accept: "application/json",
  },
});

export default instance;
