import React, { useEffect } from "react";
import { logout } from "../redux/accountSlices";
import { useDispatch } from "react-redux";

const LogoutPages = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(logout());
  },[])
  
  return (
    <div className="w-full h-[500px]  flex items-center justify-center">
      <p className="m-auto text-2xl font-medium">You was logout!</p>
    </div>
  );
};

export default LogoutPages;
