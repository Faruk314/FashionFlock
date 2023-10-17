import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNav from "./MobileNav";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectIsLoggedIn, selectUserInfo, setLogin } from "../redux/authSlice";
import { selectCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";

const Navbar = ({ home }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const userInfo = useSelector(selectUserInfo);
  const [scroll, setScroll] = useState(false);
  const location = useLocation();
  const hideNav = location.pathname !== "/";

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
      await axios.get(`${process.env.REACT_APP_API_URL}/user/logout`);
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
    <header className="border-b shadow-sm">
      <div className="py-1 text-center text-white bg-cyan-600">
        <span className="">Shipping discount on everything!</span>
      </div>
      <nav className="flex items-center justify-between px-6 py-5 bg-white lg:mx-auto lg:px-0 max-w-7xl">
        <div className="flex items-center space-x-6">
          <Link className="text-3xl font-bold text-cyan-500" to="/">
            FF
          </Link>

          {!hideNav && (
            <div className="flex hidden space-x-4 font-medium md:block">
              <span
                onClick={() => scrollToPage("home")}
                className="text-lg font-medium cursor-pointer hover:text-cyan-500"
              >
                HOME
              </span>
              <span
                onClick={() => scrollToPage("categories")}
                className="text-lg font-medium cursor-pointer hover:text-cyan-500"
              >
                CATEGORIES
              </span>
              <span
                onClick={() => scrollToPage("featured")}
                className="text-lg font-medium cursor-pointer hover:text-cyan-500"
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
              className="hidden text-lg font-medium cursor-pointer hover:text-cyan-500 md:block"
            >
              LOGOUT
            </span>
          )}
          {!isLoggedIn && (
            <Link to="/register" className="hidden md:block">
              <span className="text-lg font-medium cursor-pointer hover:text-cyan-500">
                REGISTER
              </span>
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/login">
              <span className="hidden text-lg font-medium cursor-pointer hover:text-cyan-500 md:block">
                SIGN IN
              </span>
            </Link>
          )}

          <Link to="/cart">
            <span className="relative">
              <AiOutlineShoppingCart
                className="text-lg font-medium cursor-pointer hover:text-cyan-500"
                size={30}
              />
              {cart.length !== 0 && (
                <span className="absolute top-[-0.7rem] left-5 bg-cyan-600 text-white font-bold rounded-[100%] py-[1px] px-[10px] text-[15px]">
                  {cart.length}
                </span>
              )}
            </span>
          </Link>

          <GiHamburgerMenu
            onClick={() => setOpen(true)}
            size={30}
            className="text-gray-600 cursor-pointer hover:text-cyan-500 md:hidden"
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
          logo={"/images/logo.png"}
          home={home}
          scrollToPage={scrollToPage}
        />
      )}
    </header>
  );
};

export default Navbar;
