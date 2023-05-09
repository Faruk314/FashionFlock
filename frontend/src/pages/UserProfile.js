import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Success from "../modals/Success";

const UserProfile = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const [profilePic, setProfilePic] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");
  const [succesModalOpen, setSuccesModalOpen] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);

      if (userInfo.profilePic) {
        setImagePreview(userInfo.profilePic);
      }
    }
  }, [userInfo]);

  const handleImage = (e) => {
    setProfilePic(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const editProfile = async (e) => {
    e.preventDefault();

    if (username.length === 0) {
      setMsg("Please enter your username");
      return;
    }

    const formData = new FormData();

    formData.append("username", username);
    formData.append("profilePic", profilePic);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/updateuser`,
        formData
      );

      console.log(response.data);
      setSuccesModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex justify-center my-10">
      <form
        onSubmit={editProfile}
        className="flex flex-col shadow-2xl h-max px-5 py-5"
      >
        <h2 className="text-3xl my-5 text-center">Update Your Profile</h2>
        <div className="flex flex-col space-y-2 justify-center">
          <img
            src={imagePreview}
            alt=""
            className="w-[10rem] h-[10rem] border-2"
          />

          <input
            name="profilePic"
            type="file"
            className="file:bg-cyan-600 file:text-white file:border-0 file:hover:cursor-pointer file:px-3 file:py-1"
            onChange={handleImage}
          />
        </div>
        <label className="mt-10">Username</label>
        <input
          name="username"
          type="text"
          className="border-2 px-2 py-1"
          defaultValue={username}
        />

        <span className="mt-10">{userInfo?.email}</span>

        <button
          type="submit"
          className="bg-cyan-600 px-5 py-2 font-bold text-white hover:bg-cyan-700 mt-10"
        >
          Edit profile
        </button>

        {msg && <span className="text-cyan-500 text-center py-2">{msg}</span>}
      </form>
      {succesModalOpen && (
        <Success
          setOpen={setSuccesModalOpen}
          message={"User profile successfully edited"}
        />
      )}
    </section>
  );
};

export default UserProfile;
