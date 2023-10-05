import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

export { api };

export { login, register, logOut } from "./auth/auth";
export { generatorFormPost } from "./generatorFormPost/generatorFormPost";
