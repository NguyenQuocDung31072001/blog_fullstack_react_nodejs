import React from "react";
import { Button, Input, Row, Col } from "antd";
import { pathName } from "../router/pathName";
import { Link } from "react-router-dom";
const LoginPages = () => {

  return (
    <div className="w-full mt-[100px]">
      <div className="w-[445px] h-[475px] flex flex-col items-center m-auto bg-white shadow-2xl p-8">
        <p className="text-[50px] font-medium m-0">BLOG</p>
        <p className="text-[20px] font-medium">Login To Post New Story</p>
        <div className="w-full">
          <Row>
            <div className="w-full h-full flex rounded-[10px] overflow-hidden">
              <Col span={4}>
                <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                  <i className="fa-solid fa-user-large text-[20px] text-stone-500"></i>
                </div>
              </Col>
              <Col span={20}>
                <Input
                  placeholder="Email"
                  style={{
                    height: 45,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                />
              </Col>
            </div>
          </Row>
          <div className="w-full h-[15px]" />
          <Row>
            <div className="w-full h-full flex rounded-[10px] overflow-hidden">
              <Col span={4}>
                <div className="w-full h-full bg-stone-100 flex items-center justify-center ">
                  <i className="fa-solid fa-lock text-[20px] text-stone-500"></i>
                </div>
              </Col>
              <Col span={20}>
                <Input
                  placeholder="Password"
                  style={{
                    height: 45,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                />
              </Col>
            </div>
          </Row>
          <div className="w-full h-[15px]" />
          <Row>
            <Col span={24}>
              <button className="bg-blue-500 w-full h-[45px] text-white rounded-[10px]">
                Login
              </button>
            </Col>
          </Row>
          <div className="w-full h-[15px]" />
          <Row>
            <Col span={24}>
              <div className="w-full flex justify-between">
                <Link to={pathName.reretPassword}>Forgot Password?</Link>
                <Link to={pathName.register}>Create Account</Link>
              </div>
            </Col>
          </Row>
          <div className="w-full h-[15px]" />
          <Row>
            <Col span={24}>
              <div className="w-full h-[1px] p-0 bg-gray-200 relative">
                <p className="absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] px-2 bg-white">
                  Login by
                </p>
              </div>
            </Col>
          </Row>
          <div className="w-full h-[25px]" />
          <Row>
            <Col span={8}>
              <Button style={{ width: "90%" }}>
                <i className="fa-brands fa-facebook-f text-blue-500"></i>
                <span className="px-2">Facebook</span>
              </Button>
            </Col>
            <Col span={8}>
              <Button style={{ width: "90%" }}>
                <i className="fa-brands fa-google text-red-500"></i>
                <span className="px-2">Google</span>
              </Button>
            </Col>
            <Col span={8}>
              <Button style={{ width: "90%" }}>
                <i className="fa-brands fa-github"></i>
                <span className="px-2">Githup</span>
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default LoginPages;
