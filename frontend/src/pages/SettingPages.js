import React from "react";
import { Row, Col } from "antd";
import AboutComponent from "../components/AboutComponent";

const SettingPages = () => {
  return (
    <div className="mx-4 mt-[60px]">
      <Row>
        <Col span={17}>
          <div className="flex justify-between items-center">
            <p className="text-[30px] text-rose-500 ">Update Your Account</p>
            <p className="text-[12px] text-rose-500 cursor-pointer">Delete Account</p>
          </div>
          <div>
            <p className="text-[20px] font-serif">Profile Picture</p>
            <div className="flex items-center">
              <img
              className="w-[70px] h-[70px] object-cover rounded-[20px]"
                src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
              />
              <label htmlFor="inputImg">
                <i className="fa-solid fa-circle-user text-[30px] text-rose-500 mx-4"></i>
                <input
                  id="inputImg"
                  className="hidden"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                />
              </label>
            </div>
            <div className="w-full my-4">
                <p className="text-[20px] font-serif m-0">Username</p>
                <input className="w-full h-[33px] text-gray-500" type="text" placeholder="Safak"/>
            </div>
            <div className="w-full">
                <p className="text-[20px] font-serif m-0">Email</p>
                <input className="w-full h-[33px] text-gray-500" type="text" placeholder="safak@gmail.com"/>
            </div>
            <div className="w-full my-4">
                <p className="text-[20px] font-serif m-0">Password</p>
                <input className="w-full h-[33px] text-gray-500" type="text" placeholder="password"/>
            </div>
          </div>
          <div>
            <button className="bg-green-800 text-white px-8 py-2 rounded-[10px]">Update</button>
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
