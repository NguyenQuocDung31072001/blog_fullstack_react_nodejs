import axiosConfig from "../config/axiosConfig";

export const loginApi = async ({ email, password }) => {
  console.log("data is ", email, password);
  try {
    const res = await axiosConfig.post("/account/login", {
      email: email,
      password: password,
    });
    console.log("res : ", res.data);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
