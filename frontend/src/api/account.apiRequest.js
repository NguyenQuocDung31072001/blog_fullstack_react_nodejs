import axiosConfig from "../config/axiosConfig"

export const updateAccount=async({id,username,email,password})=>{
    console.log("id ", id)
    try {
        const res=await axiosConfig.put(`/account/update/${id}`,{
            username:username,
            email:email,
            password:password
        })
        console.log(res.data)
        return res.data.data

    } catch (error) {
        console.log(error.message)
    }
}
export const uploadAvatar=async({id,fileUpload})=>{
    console.log("id ", id)
    try {
        const res=await axiosConfig.post(`/account/upload_avatar/${id}`,fileUpload)
        console.log(res.data)
        return res.data
;
    } catch (error) {
        console.log(error.message)
    }
}