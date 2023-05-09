import React, { useEffect } from "react";
import OrderCard from "../components/OrderCard";
import OrderSummary from "../components/OrderSummary";
import { useSelector } from "react-redux";
import { selectCart, selectMessage } from "../redux/cartSlice";

const Cart = () => {
  const cart = useSelector(selectCart);

  return (
    <section className="flex flex-col px-10 py-10 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-center">YOUR CART</h2>

      <div className="flex flex-col space-x-5 my-20 lg:flex-row">
        <div className="overflow-y-auto max-h-[35rem]">
          {cart.length === 0 && <p className="text-2xl">Your cart is empty</p>}
          {cart.map((product) => (
            <OrderCard key={product.id || product._id} product={product} />
          ))}
        </div>
        {cart.length > 0 && <OrderSummary />}
      </div>
    </section>
  );
};

export default Cart;
