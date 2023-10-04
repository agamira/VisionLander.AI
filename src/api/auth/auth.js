import { auth } from ".";

async function login(values) {
  try {
    const res = await auth.post("/login", values, { withCredentials: true });
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function register(values) {
  try {
    const res = await auth.post("/register", values, { withCredentials: true });
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { login, register };
