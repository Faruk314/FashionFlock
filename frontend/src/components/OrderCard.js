import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  getCart,
  increaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import { selectIsLoggedIn } from "../redux/authSlice";
import axios from "axios";
import { HiMinus, HiOutlinePlusSm } from "react-icons/hi";
import Confirm from "../modals/Confirm";

const OrderCard = ({ product }) => {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLoggedIn);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const deleteProductHandler = async (id) => {
    const data = {
      _id: id,
    };

    if (isLogged) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/cart/removefromcart`,
          data
        );

        console.log(response);

        dispatch(getCart());
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(removeFromCart(product.id));
    }
  };

  const quantityHandler = async (id, sign) => {
    let data = {
      _id: id,
      size: product.size,
    };

    if (!isLogged && sign === "plus") {
      dispatch(increaseQuantity(id));
      return;
    }

    if (!isLogged && sign === "minus") {
      dispatch(decreaseQuantity(id));
      return;
    }

    if (isLogged && sign === "plus") {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/cart/increaseQty`,
          data
        );

        dispatch(getCart());
      } catch (error) {
        console.log(error);
      }
    }

    if (isLogged && sign === "minus") {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/cart/decreaseQty`,
          data
        );

        dispatch(getCart());
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="relative w-full text-[1rem] flex items-center justify-center">
      <div className="flex flex-col items-center w-full space-x-5 space-y-2 md:flex-row">
        <div className="mt-2 md:border-b">
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0">
            <div className="relative">
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}/${product.image}`}
                alt=""
                className="h-[20rem] md:h-[12rem] md:w-[10rem]"
              ></img>

              <button
                className="absolute text-2xl font-bold text-gray-400 top-2 left-2 hover:text-gray-800"
                onClick={() => setConfirmModalOpen(true)}
              >
                X
              </button>
            </div>

            <div className="md:pl-2 md:pr-10">
              <div className="">
                <div>
                  <span className="font-bold">Product:</span>
                  <span className="ml-2">{product.title}</span>
                </div>

                <h3>
                  <span className="font-bold">Size:</span>
                  <span className="ml-2">{product.size}</span>
                </h3>
              </div>

              <div className="flex flex-col space-y-5">
                <div className="flex items-center space-x-1">
                  <button
                    className="text-gray-400 hover:text-gray-800"
                    onClick={() =>
                      quantityHandler(product.id || product._id, "minus")
                    }
                  >
                    <HiMinus size={25} />
                  </button>
                  <span className="text-3xl">{product.quantity}</span>
                  <button
                    className="text-gray-400 hover:text-gray-800"
                    onClick={() =>
                      quantityHandler(product.id || product._id, "plus")
                    }
                  >
                    <HiOutlinePlusSm size={25} />
                  </button>
                </div>

                <div className="text-2xl font-bold">
                  $ {product.quantity * product.price}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {confirmModalOpen && (
        <Confirm
          message={"Are you sure you want to remove this product from cart?"}
          deleteProduct={deleteProductHandler}
          product={product}
          setOpenModal={setConfirmModalOpen}
        />
      )}
    </div>
  );
};

export default OrderCard;
