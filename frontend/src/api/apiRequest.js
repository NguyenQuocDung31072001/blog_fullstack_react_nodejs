import axiosConfig from "../config/axiosConfig"

export const updateAccount=async({id,username,email,password})=>{
    try {
        const res=await axiosConfig.put("/account/update/62be7e05072ce76e5d5cde63",{
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
export const uploadAvatar=async(fileUpload)=>{
    try {
        const res=await axiosConfig.post("/account/upload_avatar/62be7e05072ce76e5d5cde63",fileUpload)
        return res.data

    } catch (error) {
        console.log(error.message)
    }
}