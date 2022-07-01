import React, { useState } from "react";
import { Row, Col } from "antd";
import AboutComponent from "../components/AboutComponent";
import { uploadAvatar, updateAccount } from "../api/apiRequest";
import { useSelector,useDispatch } from "react-redux";
import { update } from "../redux/accountSlices";

const SettingPages = () => {
  const currentAccount = useSelector((state) => state.account);
  console.log("currentAccount ", currentAccount);
  const dispatch=useDispatch()

  const [username, setUsername] = useState(currentAccount.username);
  const [email, setEmail] = useState(currentAccount.email);
  const [password, setPassword] = useState(currentAccount.password);
  const [fileUpload, setFileUpload] = useState();
  // const [avatarUrl, setAvatarUrl] = useState(currentAccount.avatar_url);

  const handleUpdateAccount = () => {
    const id = currentAccount.id;
    if(fileUpload){
      const uploadData = new FormData();
      uploadData.append("file", fileUpload, "file");
      
      const updateAccountApi = updateAccount({ id, username, email, password });
      const updateAvatar = uploadAvatar(uploadData);
  
      Promise.all([updateAccountApi, updateAvatar]).then(([_updateAccountApi,_updateAvatar]) => {
        console.log("_updateAccountApi ",_updateAccountApi)
        console.log("_updateAvatar ",_updateAvatar)
        // dispatch(update())
      });
    }
    else{
      ;(async function(){
        const updateAccountApi = await updateAccount({ id, username, email, password });
        console.log('updateAccountApi',updateAccountApi)
      })()
    }
  };
  const handleFileUpload = () => {
    const uploadData = new FormData();
    uploadData.append("file", fileUpload, "file");
    uploadAvatar(uploadData);
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
                src={currentAccount.avatar_url}
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
            <div className="w-full my-4">
              <p className="text-[20px] font-serif m-0">Password</p>
              <input
                className="w-full h-[33px] text-gray-500"
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
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
