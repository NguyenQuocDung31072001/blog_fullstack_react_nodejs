import axiosConfig from "../config/axiosConfig";

export const registerApi = async (username, email, password) => {
  try {
    const res = await axiosConfig.post("/auth/register", {
      username:username,
      email: email,
      password: password,
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const loginApi = async ({ email, password }) => {
  try {
    const res = await axiosConfig.post("/auth/login", {
      email: email,
      password: password,
    });
    console.log("res : ", res);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const refreshTokenApi = async () => {
  try {
    const res = await axiosConfig.post("/auth/refresh_token");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
