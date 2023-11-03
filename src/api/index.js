import axios from "axios";

const api = axios.create({
  baseURL: "https://visionlander.ai/",
  withCredentials: true,
});

export { api };

export { login, loginGoogle, register, logout, auth } from "./auth/auth";
export { generatorFormPost } from "./generatorFormPost/generatorFormPost";
