import axios from "axios";

const api = axios.create({
  baseURL: "https://visionlander.ai/",
});

export { api };

export { login, register, logOut, auth } from "./auth/auth";
export { generatorFormPost } from "./generatorFormPost/generatorFormPost";
