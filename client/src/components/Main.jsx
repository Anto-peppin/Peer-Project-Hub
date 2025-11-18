import React, { createContext, useEffect, useState } from "react";
import { auth } from "./FirebaseConfig";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Aside from "./Aside";
import Inputs from "./Inputs";
export const Context = createContext();

const Main = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const getUserData = async () => {
          const respo = await axios.get(
            `${import.meta.env.VITE_BACK}/getuser`,
            { params: { email: user.email } }
          );

          setUserData(respo?.data);

          const getLocal = JSON.parse(localStorage.getItem("email"));
          if (!getLocal) {
            localStorage.setItem("email", JSON.stringify(respo?.data._id));
          }
        };
        getUserData();
      } else {
        navigate("/signup");
      }
    });
  }, []);

  return (
    <Context.Provider value={{ userData }}>
      <div className="bg-[#0d182c]">
    
        <div className="flex ">
          <Aside />
          <div className="w-full flex flex-col gap-2 pb-2">
            <Inputs />
            <Outlet />
          </div>
        </div>
      </div>
    </Context.Provider>
  );
};

export default Main;
