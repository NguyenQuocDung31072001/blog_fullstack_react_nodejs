import axiosConfig from "../config/axiosConfig";

export const updateAccount = async ({ id, uploadData }) => {
  // console.log("id ", id)
  try {
    const res = await axiosConfig.put(
      `/account/update_account/${id}`,
      uploadData
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const checkPassword=async({id,password})=>{
    try {
        const res=await axiosConfig.post(`/account/check_password/${id}`,{password:password})
        console.log(" res is ",res.data)
        return res.data.status
    } catch (error) {
        console.log(error.message)
    }
}