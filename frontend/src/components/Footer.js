import React from "react";
import { AiOutlineInstagram, AiOutlineFacebook } from "react-icons/ai";
import { FiTwitter } from "react-icons/fi";
import { ImPinterest2, ImPhone } from "react-icons/im";
import { MdLocationPin } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="justify-between px-10 py-5 mx-2 border-t md:flex">
      <div className="">
        <h2 className="text-3xl font-bold">ECOMMERC</h2>

        <p className="block py-5 sm:hidden md:block">
          There are many variations of passages of Lorem Ipsum available, but
          <br />
          the majority have suffered alteration in some form, by injected
          <br />
          humour, or randomised words which don't look even slightly believable.
          <br />
        </p>

        <div className="flex space-x-2">
          <AiOutlineFacebook
            size={30}
            className="hover:cursor-pointer text-cyan-600"
          />
          <AiOutlineInstagram
            size={30}
            className="hover:cursor-pointer text-cyan-600"
          />
        </div>
      </div>
      <div className="sm:mt-10 md:mt-0">
        <div className="flex items-center mt-5 space-x-2">
          <MdLocationPin className="text-2xl text-cyan-600" />
          <span>Ulica ulice 6, Tuzla, 75000</span>
        </div>

        <div className="flex items-center mt-5 space-x-2">
          <ImPhone className="text-2xl text-cyan-600" />
          <span>+387 56 6799</span>
        </div>

        <div className="flex items-center mt-5 space-x-2">
          <MdMailOutline className="text-2xl text-cyan-600" />
          <span>contact@gmail.com</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
