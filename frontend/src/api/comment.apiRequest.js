import axiosConfig from "../config/axiosConfig";

export const getAllComment = async (id_story) => {
  try {
    const res = await axiosConfig.get(`/comment/all_comment/${id_story}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const createNewComment = async (id_story, id_account, comment) => {
  try {
    const res = await axiosConfig.post(
      `/comment/create_new_comment/${id_story}/${id_account}`,
      {
        comment: comment,
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
export const updateComment = async (id_comment, comment) => {
  try {
    const res = await axiosConfig.put(
      `/comment/update_comment/${id_comment}`,
      {
        comment: comment,
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
export const deleteComment = async (id_comment) => {
  try {
    const res = await axiosConfig.delete(
      `/comment/delete_comment/${id_comment}`,
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
