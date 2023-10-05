import { api } from "..";

async function login(values) {
  try {
    const res = await api.post("/login", values, { withCredentials: true });
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function register(values) {
  try {
    const res = await api.post("/register", values, { withCredentials: true });
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function logOut() {
  try {
    const res = await api.post("/logout", { withCredentials: true });
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { login, register, logOut };
