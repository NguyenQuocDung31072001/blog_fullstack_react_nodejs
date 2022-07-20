import axiosConfig from "../config/axiosConfig";

export const updateAccountApi = async ({ id, uploadData }) => {
  try {
    const res = await axiosConfig.put(
      `/account/update_account/${id}`,
      uploadData,
      {
        headers: {
          authorization: window.localStorage.getItem("accessToken"),
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const changePasswordApi = async ({ id, old_password, new_password }) => {
  try {
    const res = await axiosConfig.put(
      `/account/change_password/${id}`,
      {
        old_password: old_password,
        new_password: new_password,
      },
      {
        headers: {
          authorization: window.localStorage.getItem("accessToken"),
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
