import React, { useState } from "react";
import { Row, Col } from "antd";
import AboutComponent from "../components/AboutComponent";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { openNotification } from "../util/Notification.util";
import { updateAccountApi, changePasswordApi } from "../api/account.apiRequest";
import { update } from "../redux/accountSlices";
import {withErrorBoundary} from "react-error-boundary"
import ErrorComponent from "../components/ErrorComponent";

const schema1 = yup
  .object({
    username: yup.string().required(),
    email: yup.string().required(),
  })
  .required();

const schema2 = yup
  .object({
    old_password: yup.string().required(),
    new_password: yup.string().required(),
    confirm_new_password: yup.string().required(),
  })
  .required();

const SettingPages = () => {
  const currentAccount = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [avatarUrl, setAvatarUrl] = useState(currentAccount.avatar_url);
  const [fileUpload, setFileUpload] = useState();
  const id = currentAccount.id;

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm({
    resolver: yupResolver(schema1),
    defaultValues:{
      username:currentAccount.username,
      email:currentAccount.email
    }
  });
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setError:setError2,
    setValue:setValue2,
    formState: { errors: errors2 },
  } = useForm({
    resolver: yupResolver(schema2),
  });

  const handleUpdateAccount = (data) => {
    const uploadData = new FormData();
    if (fileUpload) {
      uploadData.append("file", fileUpload, "file");
    }
    uploadData.append("username", data.username);
    uploadData.append("email", data.email);

    (async function () {
      const dataUpdate = await updateAccountApi({ id, uploadData });
      console.log("data update ", dataUpdate);

      const dataUpdateRedux = {
        id: dataUpdate.data._id,
        avatar_url: dataUpdate.data.avatar,
        username: dataUpdate.data.username,
        email: dataUpdate.data.email,
      };
      dispatch(update(dataUpdateRedux));
    })();
  };
  const handleChangePassword = (data) => {
    if(data.new_password.length<6){
      setError2('new_password',{
        type:'custom',
        message:'password at least 6 character'
      })
      return
    }
    if(data.new_password!==data.confirm_new_password){
      setError2('confirm_new_password',{
        type:'custom',
        message:'password not match'
      })
      return
    }
    console.log("data is ", data);
    let old_password = data.old_password;
    let new_password = data.new_password;

    (async function () {
      const result = await changePasswordApi({
        id,
        old_password,
        new_password,
      });
      if (result.code === 404) {
        let message=result.msg
        setError2('old_password',{
          type:"custom",
          message:message
        })
        return
      }
      if(result.code===200){
        openNotification('success','Notification message!','You change password successfully!')
      }
      setValue2('old_password','')
      setValue2('new_password','')
      setValue2('confirm_new_password','')
    })();
  };

  return (
    <div className="mx-4 mt-[60px]">
      <Row>
        <Col span={17}>
          <div className="flex justify-between items-center">
            <p className="text-[30px] text-rose-500 ">Update Your Account</p>
            <p className="text-[12px] text-rose-500 cursor-pointer">
              Delete Account
            </p>
          </div>
          <div>
            <p className="text-[20px] font-serif">Profile Picture</p>
            <div className="flex items-center">
              <img
                className="w-[70px] h-[70px] object-cover rounded-[20px]"
                src={fileUpload ? URL.createObjectURL(fileUpload) : avatarUrl}
                alt=""
              />
              <label htmlFor="inputImg">
                <i className="fa-solid fa-circle-user text-[30px] text-rose-500 mx-4"></i>
                <input
                  id="inputImg"
                  className="hidden"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(e) => setFileUpload(e.target.files[0])}
                />
              </label>
            </div>
            <form onSubmit={handleSubmit1(handleUpdateAccount)}>
              <div className="w-full my-4">
                <p className="text-[20px] font-serif m-0">Username</p>
                <input
                  className="w-full h-[33px] text-gray-500"
                  {...register1("username")}
                  placeholder="Username"
                />
                <p className="p-0 m-0 ml-2 text-red-500">
                  {errors1.username?.message}
                </p>
              </div>
              <div className="w-full">
                <p className="text-[20px] font-serif m-0">Email</p>
                <input
                  className="w-full h-[33px] text-gray-500"
                  {...register1("email")}
                  placeholder="Email"
                />
                <p className="p-0 m-0 ml-2 text-red-500">
                  {errors1.email?.message}
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-800 text-white px-8 py-2 rounded-[10px]"
                >
                  Update
                </button>
              </div>
            </form>
            <form onSubmit={handleSubmit2(handleChangePassword)}>
              <div className="">
                <p className="text-[20px] font-serif m-0">Old Password</p>
                <input
                  className="w-full h-[33px] text-gray-500"
                  type="password"
                  placeholder="old password"
                  {...register2("old_password")}
                />
                <p className="p-0 m-0 ml-2 text-red-500">
                  {errors2.old_password?.message}
                </p>
              </div>
              <div>
                <p className="text-[20px] font-serif m-0">New password</p>
                <input
                  className="w-full h-[33px] text-gray-500"
                  type="password"
                  placeholder="New password "
                  {...register2("new_password")}
                />
                <p className="p-0 m-0 ml-2 text-red-500">
                  {errors2.new_password?.message}
                </p>
              </div>
              <div>
                <p className="text-[20px] font-serif m-0">
                  Confirm new password
                </p>
                <input
                  className="w-full h-[33px] mt-4 text-gray-500"
                  type="password"
                  placeholder="Confirm password"
                  {...register2("confirm_new_password")}
                />
                <p className="p-0 m-0 ml-2 text-red-500">
                  {errors2.confirm_new_password?.message}
                </p>
              </div>
              <div className="w-full flex justify-center mb-8">
                <button className="px-6 py-2 rounded-[10px] bg-green-800 text-white">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </Col>
        <Col span={7}>
          <AboutComponent />
        </Col>
      </Row>
    </div>
  );
};

export default withErrorBoundary(SettingPages,{
  FallbackComponent:ErrorComponent
});
