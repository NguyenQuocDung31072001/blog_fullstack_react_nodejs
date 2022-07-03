import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { pathName } from "../router/pathName";
import { useSelector } from "react-redux";
const NavigateRouter = [
  {
    path: pathName.home,
    name: "HOME",
  },
  {
    path: "",
    name: "ABOUT",
  },
  {
    path: "",
    name: "CONTACT",
  },
  {
    path: pathName.createBlog,
    name: "WRITE",
  },
  {
    path: pathName.logout,
    name: "LOGOUT",
  },
];

const NavbarComponent = () => {
  const currentUser=useSelector(state=>state.account)
  const navigate=useNavigate()
  const [avatar,setAvatar]=useState()
  useEffect(()=>{
    if(currentUser.id){
      setAvatar(currentUser.avatar_url)
    }
  },[currentUser])
  return (
    <div className="bg-white">
    <Row className="h-[50px]">
      <Col span={6}>
        <div className="w-full h-full flex justify-center items-center">
          <div className="mx-1 text-[20px]">
            <i className="fa-brands fa-facebook-square cursor-pointer"></i>
          </div>
          <div className="mx-1 text-[20px]">
            <i className="fa-brands fa-instagram-square cursor-pointer"></i>
          </div>
          <div className="mx-1 text-[20px]">
            <i className="fa-brands fa-pinterest-square cursor-pointer"></i>
          </div>
          <div className="mx-1 text-[20px]">
            <i className="fa-brands fa-twitter-square cursor-pointer"></i>{" "}
          </div>
        </div>
      </Col>
      <Col span={12}>
        <nav className="w-full h-full">
          <ul className="flex justify-center items-center text-[18px] w-full h-full">
            {NavigateRouter.map((e, index) => {
              return (
                <li key={index} className="mx-2">
                  <Link
                    to={e.path}
                    className="text-stone-500 hover:text-stone-400"
                  >
                    {e.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Col>
      <Col  span={6}>
        <div className="w-full h-full flex items-center justify-center">
          {!currentUser.id && (
            <Link to={pathName.login}>
              Login
            </Link>

          )}
          {currentUser.id && (
          <Link to={pathName.setting}>
            <img
              className="w-[40px] h-[40px] object-cover rounded-full"
              src={avatar}
              alt=""
            />
          </Link>
          )}
          <div className="mx-2 text-[20px]">
            <i className="fa-solid fa-magnifying-glass cursor-pointer"></i>
          </div>
        </div>
      </Col>
    </Row>

    </div>
  );
};

export default NavbarComponent;
