import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfo, setLogin } from "../redux/authSlice";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../redux/authSlice";
import { getCart, selectCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Login = () => {
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const login = async (e, guest) => {
    e.preventDefault();
    let formData;

    console.log(guest);

    if ((!email || !password) && guest === false) {
      setMessage("All fields must be filled");
      return;
    }

    if (guest === false) {
      formData = {
        email,
        password,
      };
    }

    if (guest === true) {
      formData = {
        email: "guest@gmail.com",
        password: "guestguest",
      };
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        formData
      );

      if (response.status === 200) {
        dispatch(setLogin(true));
        dispatch(getUserInfo());
      }

      if (cart.length === 0) {
        navigate("/");
        return;
      }
    } catch (error) {
      setMessage(error.response.data.message);
      return;
    }

    const userCart = cart.map((product) => {
      return {
        productId: product.productId,
        title: product.title,
        image: product.image,
        size: product.size,
        quantity: product.quantity,
        price: product.price,
      };
    });

    const data = {
      userId: userInfo._id,
      products: userCart,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/cart/createusercart`,
        data
      );

      dispatch(getCart());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <form
        onSubmit={(e) => login(e, false)}
        className="bg-white p-8 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      >
        <h2 className="mb-6 text-3xl font-bold">Login</h2>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 font-bold text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:bg-white focus:border-cyan-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 font-bold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:bg-white focus:border-cyan-500"
            required
          />
        </div>

        {message && <p className="mb-6 text-red-500">{message}</p>}

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start space-y-2">
            <button
              type="submit"
              className="px-6 py-1 text-base font-bold transition-colors border-2 border-cyan-500 md:text-lg hover:bg-cyan-500 hover:text-white"
            >
              Login
            </button>

            <button
              onClick={(e) => login(e, true)}
              className="px-6 py-1 text-base font-bold transition-colors border-2 border-cyan-500 md:text-lg hover:bg-cyan-500 hover:text-white"
            >
              Login as guest
            </button>

            <Link
              to="/register"
              className="font-bold text-gray-700 hover:text-gray-900"
            >
              Create an account
            </Link>
          </div>
        </div>
      </form>
    </section>

    // <section className="flex items-center justify-center h-[100vh]">
    //   <form
    //     onSubmit={login}
    //     className="flex flex-col items-center px-5 py-20 border-2"
    //   >
    //     <h2 className="text-4xl font-bold">Sign in</h2>

    //     <label className="mt-10 text-2xl">Email</label>
    //     <input
    //       type="text"
    //       placeholder="Enter your email"
    //       className="border-2 px-2 py-1 md:w-[30rem]"
    //       name="email"
    //       onChange={(e) => setEmail(e.target.value)}
    //       value={email}
    //     />

    //     <label className="mt-10 text-2xl">Password</label>
    //     <input
    //       type="password"
    //       placeholder="Enter your password"
    //       className="border-2 px-2 py-1 md:w-[30rem]"
    //       name="password"
    //       onChange={(e) => setPassword(e.target.value)}
    //       value={password}
    //     />

    //     {message && <p className="my-5 text-red-500">{message}</p>}

    //     <button className="px-5 py-2 mt-10 font-bold text-white bg-cyan-600 hover:bg-white hover:border-2 hover:border-black hover:text-black">
    //       Sign in
    //     </button>
    //   </form>
    // </section>
  );
};

export default Login;
