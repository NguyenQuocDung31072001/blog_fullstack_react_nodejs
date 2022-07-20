import axiosConfig from "../config/axiosConfig";

export const getAllstory = async () => {
  try {
    const res = await axiosConfig.get("/story/all_story");
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const getStoryAccount = async (id_account) => {
  try {
    const res = await axiosConfig.get(`/story/story_account/${id_account}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const getOneStory = async (id) => {
  try {
    const res = await axiosConfig.get(`/story/one_story/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const postNewStory = async ({ id_account, uploadData }) => {
  try {
    const res = await axiosConfig.post(
      `/story/add_story/${id_account}`,
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

export const updateStory = async (id, uploadData) => {
  try {
    const res = await axiosConfig.put(`/story/update_story/${id}`, uploadData, {
      headers: {
        authorization: window.localStorage.getItem("accessToken"),
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteStory = async (id, id_account) => {
  try {
    const res = await axiosConfig.delete(
      `/story/delete_story/${id}/${id_account}`,
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
