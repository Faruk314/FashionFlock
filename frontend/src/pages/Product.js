import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart, getCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/authSlice";

const Product = () => {
  const isLogged = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [msg, setMsg] = useState("");
  const [size, setSize] = useState(null);

  const cartHandler = async () => {
    if (!size) {
      setMsg("Please choose your size!");
      return;
    }

    if (isLogged) {
      let prod = {
        productId: product._id,
        size,
        quantity,
        title: product.title,
        price: product.price,
        image: product.image,
      };
      try {
        await axios.put(`http://localhost:5000/api/cart/addtocart`, prod);

        dispatch(getCart());
        navigate("/cart");
      } catch (error) {
        console.log(error);
      }

      return;
    }

    let prod = {
      id: nanoid(),
      productId: product._id,
      title: product.title,
      price: product.price,
      desc: product.desc,
      image: product.image,
      size,
      quantity,
    };

    dispatch(addToCart(prod));

    navigate("/cart");
  };

  const handleQuantity = (sign) => {
    if (sign === "plus") {
      setQuantity((prev) => prev + 1);
    } else if (sign === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const getProd = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/getproduct/${id}`
        );

        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProd();
  }, [id]);

  return (
    <section className="flex justify-center items-center px-5 py-20">
      <div className="grid space-y-2 md:grid-cols-2 items-center space-x-10 justify-center max-w-5xl">
        <div className="mx-auto">
          <img src={product?.image} alt="" className="object-cover" />
        </div>

        <div className="flex flex-col items-center justify-center md:items-start">
          <h2 className="text-3xl md:text-5xl font-bold text-center md:text-left">
            {product?.title}
          </h2>

          <p className="text-center my-8 md:text-left">{product?.desc}</p>

          <span className="text-4xl md:text-5xl mb-8">$ {product?.price}</span>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
            <div className="flex items-center space-x-2">
              <span className="text-lg md:text-3xl">Size</span>
              <select
                className="pr-4 py-1 border border-black text-base md:text-lg outline-none"
                onChange={(e) => setSize(e.target.value)}
              >
                <option>Choose your size</option>
                {product?.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between w-full mb-8">
            <div className="flex items-center space-x-2 text-lg md:text-3xl">
              <span className="hover:cursor-pointer">
                <AiOutlineMinus onClick={() => handleQuantity("minus")} />
              </span>
              <span className="border-2 px-2 rounded-md border-cyan-500">
                {quantity}
              </span>
              <span className="hover:cursor-pointer">
                <AiOutlinePlus onClick={() => handleQuantity("plus")} />
              </span>
            </div>

            <button
              className="border-2 border-cyan-500 px-6 py-2 text-base md:text-lg font-bold transition-colors hover:bg-cyan-500 hover:text-white"
              onClick={cartHandler}
            >
              ADD TO CART
            </button>
          </div>

          {msg && <span className="text-3xl text-cyan-500">{msg}</span>}
        </div>
      </div>
    </section>
  );
};

export default Product;
