import React, { useState } from "react";
import { Row, Col } from "antd";
import AboutComponent from "../components/AboutComponent";
import {
  uploadAvatar,
  updateAccount,
  checkPassword,
} from "../api/account.apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../redux/accountSlices";

const SettingPages = () => {
  const currentAccount = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(currentAccount.username);
  const [email, setEmail] = useState(currentAccount.email);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(currentAccount.avatar_url);
  const [fileUpload, setFileUpload] = useState();
  const [activeChangePassword, setActiveChangePassword] = useState(false);

  const id = currentAccount.id;

  const handleUpdateAccount = () => {
    const uploadData = new FormData();
    if (fileUpload) {
      uploadData.append("file", fileUpload, "file");
    }
    uploadData.append("username", username);
    uploadData.append("email", email);
    if (newPassword) {
      if (newPassword === confirmNewPassword) {
        uploadData.append("password", newPassword);
      }
    }
    (async function () {
      const dataUpdate = await updateAccount({ id, uploadData });
      console.log("data update ", dataUpdate);

      const dataUpdateRedux = {
        id: dataUpdate._id,
        avatar_url: dataUpdate.avatar,
        username: dataUpdate.username,
        email: dataUpdate.email,
      };
      dispatch(update(dataUpdateRedux));
    })();
  };
  const handleCheckPassword = () => {
    (async function () {
      const result = await checkPassword({ id, password });
      console.log("result is ", result);
      setActiveChangePassword(result);
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
              <div className="w-full my-4">
                <p className="text-[20px] font-serif m-0">Username</p>
                <input
                  className="w-full h-[33px] text-gray-500"
                  type="text"
                  placeholder="Safak"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="w-full">
                <p className="text-[20px] font-serif m-0">Email</p>
                <input
                  className="w-full h-[33px] text-gray-500"
                  type="text"
                  placeholder="safak@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {!activeChangePassword && (
                <div className="w-full my-4 border-solid border-gray-400 border-[1px] p-4">
                  <p className="text-[20px] text-red-500">
                    Please check password before you want change password
                  </p>
                  <p className="text-[20px] font-serif m-0">Check password</p>
                  <input
                    className="w-full h-[33px] text-gray-500"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    onClick={handleCheckPassword}
                    className="my-4 px-4 py-2 bg-sky-500 text-white rounded-[10px] cursor-pointer"
                  >
                    Check your password
                  </button>
                </div>
              )}
              {activeChangePassword && (
                <div className="w-full my-4 border-solid border-gray-400 border-[1px] p-4">
                  <p className="text-[20px] font-serif m-0">
                    Input your new password
                  </p>

                  <input
                    className="w-full h-[33px] text-gray-500"
                    type="password"
                    placeholder="New password "
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />

                  <input
                    className="w-full h-[33px] mt-4 text-gray-500"
                    type="password"
                    placeholder="Confirm password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
              )}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-green-800 text-white px-8 py-2 rounded-[10px]"
              onClick={handleUpdateAccount}
            >
              Update
            </button>
          </div>
        </Col>
        <Col span={7}>
          <AboutComponent />
        </Col>
      </Row>
    </div>
  );
};

export default SettingPages;
