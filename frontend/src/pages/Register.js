import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, setLogin } from "../redux/authSlice";
import { getUserInfo } from "../redux/authSlice";
import { selectCart } from "../redux/cartSlice";
import { getCart } from "../redux/cartSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const cart = useSelector(selectCart);
  const userInfo = useSelector(selectUserInfo);

  const register = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage("All fields must be filled");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be 6 characters long");
      return;
    }

    let formData = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/register`,
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
        color: product.color,
        size: product.size,
        quantity: product.quantity,
        price: product.price,
      };
    });

    const data = {
      userId: await userInfo?._id,
      products: userCart,
    };

    try {
      const response = await axios.post(
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
        onSubmit={register}
        className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold mb-8">Register</h2>

        <div className="mb-4 w-full">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            className="appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-500"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </div>

        <div className="mb-4 w-full">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            className="appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-500"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="mb-6 w-full">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            className="appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-500"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {message && <p className="my-5 text-red-500">{message}</p>}

        <button className="border-2 border-cyan-500 px-3 py-1 text-base md:text-lg font-bold transition-colors hover:bg-cyan-500 hover:text-white">
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;
