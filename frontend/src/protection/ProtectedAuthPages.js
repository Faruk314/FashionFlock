import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/authSlice";
import { useSelector } from "react-redux";

const ProtectedAuthPages = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedAuthPages;
