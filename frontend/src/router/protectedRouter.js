import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { pathName } from "./pathName";

const ProtectedRouter = ({ protect, children }) => {
  const currentAccount = useSelector((state) => state.account);
  if (!currentAccount.id && protect) {
    return <Navigate to={pathName.home} replace />;
  }
  return children;
};

export default ProtectedRouter;
