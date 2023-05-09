import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import logo from "../images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectIsLoggedIn, selectUserInfo, setLogin } from "../redux/authSlice";
import { selectCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { SlLogout } from "react-icons/sl";

const Navbar = ({ home }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const userInfo = useSelector(selectUserInfo);
  const [scroll, setScroll] = useState(false);

  console.log("userinfo", userInfo);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = async () => {
    try {
      await axios.get(`http://localhost:5000/api/user/logout`);
      dispatch(setLogin(false));
      dispatch(clearCart());
      navigate("/");
      localStorage.removeItem("cart");
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToPage = (id) => {
    const page = document.getElementById(id);
    page.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="">
      <div className="bg-cyan-600 text-center text-white py-1">
        <span className="">Shipping discount on everything!</span>
      </div>
      <nav
        style={
          scroll
            ? {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                transition: "0.5s ease-in",
                zIndex: 20,
              }
            : { position: "" }
        }
        className="mx-auto flex justify-between items-center py-3 bg-white shadow-lg px-5"
      >
        <div className="flex items-center space-x-6">
          <Link className="font-bold text-3xl text-cyan-500" to="/">
            FF
          </Link>

          {home && (
            <div className="flex space-x-4 font-medium hidden md:block">
              <span
                onClick={() => scrollToPage("home")}
                className="text-lg font-medium hover:text-cyan-500 cursor-pointer"
              >
                HOME
              </span>
              <span
                onClick={() => scrollToPage("categories")}
                className="text-lg font-medium hover:text-cyan-500 cursor-pointer"
              >
                CATEGORIES
              </span>
              <span
                onClick={() => scrollToPage("featured")}
                className="text-lg font-medium hover:text-cyan-500 cursor-pointer"
              >
                FEATURED
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-5">
          {isLoggedIn && (
            <span
              onClick={logout}
              className="text-lg font-medium hover:text-cyan-500 cursor-pointer hidden md:block"
            >
              LOGOUT
            </span>
          )}
          {!isLoggedIn && (
            <Link to="/register" className="hidden md:block">
              <span className="text-lg font-medium hover:text-cyan-500 cursor-pointer">
                REGISTER
              </span>
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/login">
              <span className="text-lg font-medium hover:text-cyan-500 cursor-pointer hidden md:block">
                SIGN IN
              </span>
            </Link>
          )}

          <Link to="/cart">
            <span className="relative">
              <AiOutlineShoppingCart
                className="text-lg font-medium hover:text-cyan-500 cursor-pointer"
                size={30}
              />
              {cart.length !== 0 && (
                <span className="absolute top-[-0.7rem] left-5 bg-cyan-600 text-white font-bold rounded-[100%] py-[1px] px-[10px] text-[15px]">
                  {cart.length}
                </span>
              )}
            </span>
          </Link>

          {isLoggedIn && (
            <Link to="/user">
              <img
                src={userInfo?.profilePic || logo}
                alt=""
                className="w-[3rem] h-[2.5rem] rounded-[100%] border-2"
              />
            </Link>
          )}

          <GiHamburgerMenu
            onClick={() => setOpen(true)}
            size={30}
            className="cursor-pointer text-gray-600 hover:text-cyan-500 md:hidden"
          />
        </div>
      </nav>

      {open && (
        <MobileNav
          setOpen={setOpen}
          open={open}
          isLoggedIn={isLoggedIn}
          logout={logout}
          userInfo={userInfo}
          cart={cart}
          logo={logo}
          home={home}
          scrollToPage={scrollToPage}
        />
      )}
    </header>
  );
};

export default Navbar;
