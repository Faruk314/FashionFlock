import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUserInfo, selectIsLoggedIn, setLogin } from "./redux/authSlice";
import { getCart } from "./redux/cartSlice";
import Checkout from "./pages/Checkout";
import UserProfile from "./pages/UserProfile";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const getLoginStatus = async () => {
      try {
        const status = await axios.get(
          `http://localhost:5000/api/user/loginstatus`
        );

        dispatch(setLogin(status.data));

        if (status.data === true) {
          dispatch(getUserInfo());
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLoginStatus();
  }, [dispatch]);

  useEffect(() => {
    if (isLogged) {
      dispatch(getCart());
    }
  }, [dispatch, isLogged]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar home={true} />
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={
            <>
              <Navbar />
              <Product />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <Cart />
            </>
          }
        />
        <Route
          path="/categories/:name"
          element={
            <>
              <Navbar />
              <Category />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Navbar />
              <Checkout />
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <Navbar />
              <UserProfile />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
