import { Button, Col, Input, Row } from "antd";
import React from "react";

const RegisterPages = () => {
  return (
    <div className="w-full mt-[100px]">
      <div className="w-[538px] m-auto shadow-2xl">
        <div className="text-center text-[50px] font-medium">BLOG</div>
        <div className="w-full h-[1px] bg-gray-200" />
        <div className="p-6">
          <p className="m-0 text-[20px] font-normal">Register for Blog</p>
          <div className="w-full h-[10px]" />
          <p className="m-0">
            Welcome to BLOG, please create account to write blog and use easily!{" "}
          </p>
          <div className="w-full h-[10px]" />
          <Row>
            <Col span={24}>
              <Input placeholder="Username" />
            </Col>
          </Row>
          <div className="w-full h-[10px]" />
          <Row>
            <Col span={24}>
              <Input placeholder="Email" />
            </Col>
          </Row>
          <div className="w-full h-[10px]" />
          <Row>
            <Col span={24}>
              <Input.Password placeholder="Password" visibilityToggle={false} />
            </Col>
          </Row>
          <div className="w-full h-[10px]" />
          <Row>
            <Col span={24}>
              <Input.Password
                placeholder="Confirm Password"
                visibilityToggle={false}
              />
            </Col>
          </Row>
          <div className="w-full h-[10px]" />
          <Row>
            <Col span={24}>
              <button className="bg-blue-500 w-full h-[40px] text-white rounded-[10px]">
                Register
              </button>
            </Col>
          </Row>
          <div className="w-full h-[25px]" />
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

export default RegisterPages;
