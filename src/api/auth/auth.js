import { api } from "..";

async function login(values) {
  try {
    const res = await api.post("/login", values, { withCredentials: true });
    const data = await res.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function register(values) {
  try {
    const res = await api.post("/register", values, { withCredentials: true });
    const data = await res.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function logOut() {
  try {
    const res = await api.get("/logout", { withCredentials: true });
    const data = await res.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function auth() {
  try {
    const res = await api.get("/auth", { withCredentials: true });
    const data = await res.data;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export { login, register, logOut, auth };
