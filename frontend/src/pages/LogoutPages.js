import React, { useEffect } from "react";
import { logout } from "../redux/accountSlices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const LogoutPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    if (window.confirm("Confirm to logout Blog!")) {
      dispatch(logout());
    } else {
      navigate(-1, { replace: true })
    }
  },[])
  return (
    <div className="w-full h-[500px]  flex items-center justify-center">
      <p className="m-auto text-2xl font-medium">You was logout!</p>
    </div>
  );
};

export default LogoutPages;
