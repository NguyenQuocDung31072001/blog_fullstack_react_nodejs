import { Button, Col, Input, Row } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerApi } from "../api/auth.apiRequest";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../util/Notification.util";
const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    confirm_password: yup.string().required(),
  })
  .required();

const RegisterPages = () => {
  const navigate=useNavigate()
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const registerSubmit = (data) => {
    if(data.username.length<6){
      setError('username',{
        type:'custom',
        message:'username at least 6 character'
      })
    }
    if(data.email.indexOf('@')<0){
      setError('email',{
        type:'custom',
        message:'please input type email'
      })
    }
    if(data.password.length<6){
      setError('password',{
        type:'custom',
        message:'password at least 6 character'
      })
    }
    if(data.password!==data.confirm_password){
      setError('confirm_password',{
        type:'custom',
        message:'password not match'
      })
      return
    }
    ;(async function(){
      const result=await registerApi(data.username,data.email,data.password)
      if(result.code===501){
        setError('email',{
          type:'custom',
          message:result.data.msg
        })
        return
      }
      if(result.code===200){
        navigate('/login')
      }
      if(result.code===500){
        openNotification('error','Notification message','register error!')
      }
    })()
  };
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
          <form onSubmit={handleSubmit(registerSubmit)}>
            <div className="w-full h-[10px]" />
            <Row>
              <Col span={24}>
                {/* <Input placeholder="Username" /> */}
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input placeholder="Username" {...field} />
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p className="p-0 m-0 ml-2 text-red-500">
                  {errors.username?.message}
                </p>
              </Col>
            </Row>
            <div className="w-full h-[10px]" />
            <Row>
              <Col span={24}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input placeholder="Email" {...field} />
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p className="p-0 m-0 ml-2 text-red-500">
                  {errors.email?.message}
                </p>
              </Col>
            </Row>
            <div className="w-full h-[10px]" />
            <Row>
              <Col span={24}>
                {/* <Input.Password
                  placeholder="Password"
                  visibilityToggle={false}
                /> */}
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                    {...field}
                      placeholder="Password"
                      visibilityToggle={true}
                    />
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p className="p-0 m-0 ml-2 text-red-500">
                  {errors.password?.message}
                </p>
              </Col>
            </Row>
            <div className="w-full h-[10px]" />
            <Row>
              <Col span={24}>
                <Controller
                  name="confirm_password"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      placeholder="Confirm Password"
                      visibilityToggle={true}
                    />
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p className="p-0 m-0 ml-2 text-red-500">
                  {errors.confirm_password?.message}
                </p>
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
          </form>
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
                <span className="px-2">Github</span>
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default RegisterPages;
