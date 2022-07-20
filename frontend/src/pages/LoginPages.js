import React from "react";
import { Button, Input, Row, Col } from "antd";
import { pathName } from "../router/pathName";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../api/auth.apiRequest";
import { useDispatch } from "react-redux";
import { login } from "../redux/accountSlices";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const LoginPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginSubmit = (data) => {
    (async function () {
      let email = data.email;
      let password = data.password;
      const res = await loginApi({ email, password });
      console.log("res is ",res)
      if(res.msg==='email invalid!'){
        setError('email',{
          type:'custom',
          message:res.message
      })
      }
      else if(res.msg==='wrong password'){
        setError('password',{
          type:'custom',
          message:res.message
        })
      }
      if (res.data) {
        const dataSaveRedux = {
          id: res.data._id,
          username: res.data.username,
          email: res.data.email,
          avatar_url: res.data.avatar        
        };
        window.localStorage.setItem('accessToken',res.data.accessToken)
        dispatch(login(dataSaveRedux));
        navigate("/");
      }
    })();
  };
  return (
    <div className="w-full mt-[100px]">
      <div className="w-[445px] flex flex-col items-center m-auto bg-white shadow-2xl p-8">
        <p className="text-[50px] font-medium m-0">BLOG</p>
        <p className="text-[20px] font-medium">Login To Post New Story</p>
        <div className="w-full">
          <form onSubmit={handleSubmit(loginSubmit)}>
            <Row>
              <div className="w-full h-full flex rounded-[10px] overflow-hidden">
                <Col span={4}>
                  <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                    <i className="fa-solid fa-user-large text-[20px] text-stone-500"></i>
                  </div>
                </Col>
                <Col span={20}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Email"
                        style={{
                          height: 45,
                          borderTopRightRadius: 10,
                          borderBottomRightRadius: 10,
                        }}
                      />
                    )}
                  />
                </Col>
              </div>
            </Row>
            <Row>
              <Col span={4}></Col>
              <Col span={20}>
                <p className="p-0 m-0 ml-2 text-red-500">
                  {errors.email?.message}
                </p>
              </Col>
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
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        placeholder="Password"
                        visibilityToggle={true}
                        style={{
                          height: 45,
                          borderTopRightRadius: 10,
                          borderBottomRightRadius: 10,
                        }}
                      />
                    )}
                  />
                </Col>
              </div>
            </Row>
            <Row>
              <Col span={4}></Col>
              <Col span={20}>
                <p className="m-0 ml-2 text-red-500">
                  {errors.password?.message}
                </p>
              </Col>
            </Row>
            <div className="w-full h-[15px]" />
            <Row>
              <Col span={24}>
                <button
                  type="submit"
                  className="bg-blue-500 w-full h-[45px] text-white rounded-[10px]"
                >
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPages;
