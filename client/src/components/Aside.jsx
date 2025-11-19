import { FaProjectDiagram } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { IoCloudUploadSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { GoProjectSymlink } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Main";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { RiLogoutCircleLine } from "react-icons/ri";
import { auth } from "./FirebaseConfig";
import { signOut } from "firebase/auth";

const Aside = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({});
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const { userData } = useContext(Context);

  useEffect(() => {
    setUserDetail(userData);
  }, [userData]);

  useEffect(() => {
    const getAllDataAside = async () => {
      try {
        const respo = await axios.get(
          `${import.meta.env.VITE_BACK}/allprojects`
        );
        const arr = [];
        for (let total of respo.data) {
          arr.push(total.mail);
        }
        const remainder = new Set(arr);
        setTotalUser([...remainder].length);

        setTotalDataLength(respo.data.length);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllDataAside();
  }, []);

  const handleLogOut = async () => {
    localStorage.removeItem("email");
    await signOut(auth);
    navigate("/signup");
  };

  return (
    <div
      className={`${
        data == "show" ? "w-[250px]" : "w-[300px]"
      } h-screen p-2 flex-col gap-3 bg-[#141a27] border-r-2 text-white  sticky left-0 top-0 md:flex ${
        data == "show" ? "flex " : "hidden"
      } `}
    >
      <div className="flex gap-1 items-center mb-5">
        <img src="/logo.png" className="w-6 " loading="lazy" alt="logo" />
        <h2 className="font-bold text-xl text-orange-500 whitespace-nowrap ">
          Peer Project Hub
        </h2>
      </div>
      <h2 className="mt-2 border p-1 rounded-xl text-center w-full font-bold text-xl mb-5 ">
        My profile
      </h2>
      {userDetail?.name ? (
        <div className="flex gap-1  mb-3">
          <div
            className={`font-bold text-2xl p-1 w-[50px] h-[50px] flex justify-center items-center rounded-full  text-white`}
            style={{ backgroundColor: userDetail?.picColor }}
          >
            {userDetail?.name?.[0].toUpperCase()}
          </div>
          <div className="flex flex-col items-start">
            <p className="text-xl font-bold whitespace-nowrap ">
              {userDetail?.name}
            </p>

            <p className="md:text-[10px] lg:text-[16px]">{userDetail?.role}</p>
          </div>
        </div>
      ) : (
        <div className="flex w-52 flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
        </div>
      )}

      <div
        onClick={() => navigate("myproject")}
        className={`flex ${
          location.pathname == "/main/myproject"
            ? "animate-bounce border-orange-500 "
            : "summa"
        } cursor-pointer gap-1 items-center w-full px-2 py-1 rounded-xl border justify-between`}
      >
        <div className="flex gap-1 items-center">
          <FaProjectDiagram />
          My Projects
        </div>
        <FaRegArrowAltCircleRight />
      </div>
      <div
        onClick={() => navigate("/upload")}
        className="flex cursor-pointer gap-1 items-center w-full px-2 py-1  text-white bg-orange-500  rounded-xl border justify-center"
      >
        <IoCloudUploadSharp />
        Upload Project
      </div>
      <div className="flex w-full flex-col gap-3 mt-8">
        <div className="flex gap-1 items-center w-full px-2 py-1 rounded-xl border justify-between">
          <div className="flex gap-1 items-center">
            <GoProjectSymlink />
            Total Projects
          </div>
          {totalDataLength}
        </div>
        <div className="flex gap-1 items-center w-full px-2 py-1 rounded-xl border justify-between">
          <div className="flex gap-1 items-center">
            <FaUsers />
            Total Users
          </div>
          {totalUser}
        </div>
        <div
          onClick={handleLogOut}
          className="flex gap-1 items-center w-full px-2 py-1 mt-6 mb-3 rounded-xl cursor-pointer border bg-red-400 justify-between"
        >
          Log out
          <RiLogoutCircleLine />
        </div>
      </div>
    </div>
  );
};

export default Aside;
