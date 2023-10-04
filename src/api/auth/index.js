import axios from "axios";

const auth = axios.create({
  baseURL: "http://localhost:3000/",
});

export { auth };

export { login, register } from "./auth";
