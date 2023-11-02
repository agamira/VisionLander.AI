import { api } from "..";

async function login(values) {
  try {
    const res = await api.post("/login", values);
    const data = await res.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function register(values) {
  try {
    const res = await api.post("/register", values);
    const data = await res.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function logout() {
  try {
    const res = await api.get("/logout");
    const data = await res.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function auth() {
  try {
    const res = await api.get("/auth");
    const data = await res.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export { login, register, logout, auth };
