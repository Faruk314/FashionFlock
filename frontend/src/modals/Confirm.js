import React from "react";

const Confirm = ({ message, product, deleteProduct, setOpenModal }) => {
  return (
    <div className="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-[rgb(0,0,0,0.5)] z-20">
      <div className="bg-white p-2 rounded-md flex flex-col items-center py-5 px-5">
        <p className="">{message}</p>

        <div className="flex space-x-2">
          <button
            onClick={() => deleteProduct(product.id || product._id)}
            className="bg-cyan-600 px-5 py-2 font-bold text-white hover:bg-cyan-700 mt-10"
          >
            Yes
          </button>

          <button
            onClick={() => setOpenModal(false)}
            className="bg-cyan-600 px-5 py-2 font-bold text-white hover:bg-cyan-700 mt-10"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
