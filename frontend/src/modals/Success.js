import React from "react";

const Success = ({ message, setOpen }) => {
  return (
    <div className="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-[rgb(0,0,0,0.5)] z-20">
      <div className="flex flex-col items-center bg-white p-2 rounded-md w-[20rem] py-10">
        <p className="text-xl">{message}</p>

        <button
          onClick={() => setOpen(false)}
          className="bg-cyan-600 px-5 py-2 font-bold text-white hover:bg-cyan-700 mt-10"
        >
          Continiue
        </button>
      </div>
    </div>
  );
};

export default Success;
