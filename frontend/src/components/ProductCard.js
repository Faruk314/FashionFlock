import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, image }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleMouseOver = () => {
    setIsHovering(true);
    setShow(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    setShow(false);
  };

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="relative flex flex-col items-center border h-[25rem] cursor-pointer"
    >
      <img
        src={`http://localhost:5000/images/${image}`}
        alt=""
        className="w-full h-full"
      ></img>

      {show && (
        <div className="absolute top-0 flex items-end justify-center w-full h-full py-2 bg-cyan-500 bg-opacity-10"></div>
      )}
    </div>
  );
};

export default ProductCard;
