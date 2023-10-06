import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTotal } from "../redux/cartSlice";
import { selectCart } from "../redux/cartSlice";
import axios from "axios";
import { selectIsLoggedIn, selectUserInfo } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Checkout from "../pages/Checkout";

const OrderSummary = () => {
  const navigate = useNavigate();
  const isLogged = useSelector(selectIsLoggedIn);
  // const subTotal = useSelector(selectTotal);
  const [subtotal, setSubtotal] = useState(0);
  const discount = 6;
  const estimatedShipping = 3;
  const [msg, setMsg] = useState(null);
  const cart = useSelector(selectCart);
  const [openCheckout, setOpenCheckout] = useState(false);

  useEffect(() => {
    const calcSubtotal = () => {
      let total = cart
        .map((product) => product.price * product.quantity)
        .reduce((a, b) => a + b, 0);
      setSubtotal(total);
    };

    calcSubtotal();
  }, [cart]);

  const checkout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      setMsg("You dont have any items in your cart");
      return;
    }

    if (!isLogged) {
      navigate("/login");
      return;
    }

    setOpenCheckout(true);
  };

  return (
    <form
      onSubmit={checkout}
      className="flex flex-col max-w-sm gap-6 p-6 mt-10 bg-white border border-gray-300 rounded-md shadow-lg h-max"
    >
      <h2 className="text-3xl font-bold text-center">Order Summary</h2>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-base font-medium text-gray-700">Subtotal</span>
          <span className="text-base font-medium">${parseInt(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-base font-medium text-gray-700">
            Estimated Shipping
          </span>
          <span className="text-base font-medium">${estimatedShipping}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-base font-medium text-gray-700">
            Shipping Discount
          </span>
          <span className="text-base font-medium">${discount}</span>
        </div>

        <div className="flex justify-between pt-2 border-t border-gray-300">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-lg font-bold">
            ${subtotal > 0 ? subtotal + estimatedShipping - discount : 0}
          </span>
        </div>
      </div>

      <button className="py-2 text-base font-bold text-white rounded-md bg-cyan-600 hover:bg-cyan-700">
        Checkout Now
      </button>

      {msg && <span className="text-sm text-red-500">{msg}</span>}

      {openCheckout && <Checkout />}
    </form>
  );
};

export default OrderSummary;
