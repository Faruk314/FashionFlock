import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/authSlice";

const MobileNav = ({ open, setOpen, logout, home, scrollToPage }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div
      className={`flex justify-center py-20 fixed border-b shadow-md w-full top-0 right-0 bg-white z-30 transform transition-transform ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <ul className="flex flex-col space-y-1 text-2xl">
        {home && (
          <li
            onClick={() => scrollToPage("home")}
            className="cursor-pointer hover:text-cyan-500"
          >
            HOME
          </li>
        )}
        {home && (
          <li
            onClick={() => scrollToPage("categories")}
            className="cursor-pointer hover:text-cyan-500"
          >
            CATEGORIES
          </li>
        )}
        {home && (
          <li
            onClick={() => scrollToPage("featured")}
            className="cursor-pointer hover:text-cyan-500"
          >
            FEATURED
          </li>
        )}
        {!isLoggedIn && (
          <Link to="/register">
            <li className="hover:text-cyan-500">REGISTER</li>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/login">
            <li className="hover:text-cyan-500">SIGN IN</li>
          </Link>
        )}
        {isLoggedIn && (
          <li className="cursor-pointer hover:text-cyan-500" onClick={logout}>
            LOGOUT
          </li>
        )}
      </ul>

      <button
        className="absolute top-[10px] left-2 text-2xl font-bold hover:text-cyan-500"
        onClick={() => setOpen(false)}
      >
        X
      </button>
    </div>
  );
};

export default MobileNav;
