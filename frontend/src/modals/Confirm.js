import React from "react";

const Confirm = ({ message, product, deleteProduct, setOpenModal }) => {
  return (
    <div className="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-[rgb(0,0,0,0.5)] z-20">
      <div className="flex flex-col items-center p-2 px-5 py-5 bg-white rounded-md">
        <p className="text-center">{message}</p>

        <div className="flex space-x-2">
          <button
            onClick={() => deleteProduct(product.id || product._id)}
            className="px-5 py-2 mt-10 font-bold text-white bg-cyan-600 hover:bg-cyan-700"
          >
            Yes
          </button>

          <button
            onClick={() => setOpenModal(false)}
            className="px-5 py-2 mt-10 font-bold text-white bg-cyan-600 hover:bg-cyan-700"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
