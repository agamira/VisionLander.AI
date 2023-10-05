import axios from "axios";

const api = axios.create({
  baseURL: "http://5.196.122.130:3000/",
});

export { api };

export { login, register } from "./auth/auth";
export { generatorFormPost } from "./generatorFormPost/generatorFormPost";
