import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUserInfo, selectIsLoggedIn, setLogin } from "./redux/authSlice";
import { getCart } from "./redux/cartSlice";
import Checkout from "./pages/Checkout";
import Loader from "./components/Loader";
import ProtectedAuthPages from "./protection/ProtectedAuthPages";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLoginStatus = async () => {
      try {
        const status = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/loginstatus`
        );

        dispatch(setLogin(status.data));

        if (status.data === true) {
          dispatch(getUserInfo());
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getLoginStatus();
  }, [dispatch]);

  useEffect(() => {
    if (isLogged) {
      dispatch(getCart());
    }
  }, [dispatch, isLogged]);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories/:name" element={<Category />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route element={<ProtectedAuthPages />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
