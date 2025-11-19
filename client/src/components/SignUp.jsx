import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "./FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/login");
      }
    });
  }, []);

  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Enter the name")
      .min(3, "minimum 3 letters")
      .matches(/^[A-Za-z ]+$/, "only alphabets allowed"),
    mail: yup
      .string()
      .email()
      .matches(/^[a-z0-9]+@gmail.com$/, "Enter the vaild Email")
      .required("Enter the Email"),
    pass: yup
      .string()
      .required("Enter the password")
      .matches(
        /^[0-9a-zA-Z.@]+$/,
        "Alphabets,numbers,and . @ symbols only allowed "
      )
      .min(6, "minimun 6 letters required")
      .max(10, "maximum 10 letters required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const color = () => {
    const arr = [
      "#eb321e",
      "#eb8f1e",
      "#b5eb1e",
      "#66eb1e",
      "#1eeb4e",
      "#1eeba7",
      "#1eb5eb",
      "#1e58eb",
      "#661eeb",
      "#d31eeb",
      "#eb1ea0",
      "#eb1e32",
    ];
    const random = Math.floor(Math.random() * 7);
    const finalColor = arr[random];
    return finalColor;
  };

  const handleSignUp = async (data) => {
    try {
      setLoading(true);
      const picColor = color();
      const user = { ...data, picColor };
      const respo = await createUserWithEmailAndPassword(
        auth,
        data.mail,
        data.pass
      );
      const userReq = await axios.post(`${import.meta.env.VITE_BACK}/user`, {
        user,
      });
      await Swal.fire({
        position: "top-end",
        theme: "bootstrap-5",
        icon: "success",
        title: "SignUp Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      reset();
      navigate("/login");
    } catch (error) {
      await Swal.fire({
        position: "top-end",
        theme: "bootstrap-5",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen   bg-white/90 flex gap-3 ">
      <div className="w-full h-full relative hidden md:inline-block">
        <img
          src="./signup_bg.jpg"
          className=" absolute w-full h-full object-coverinset-0 "
          alt=""
        />
        <div className="relative w-full h-full p-2 flex flex-col justify-between bg_change">
          <div className="flex gap-2 justify-between items-center pr-3">
            <h2 className="font-bold text-3xl text-orange-500">
              Peer Project Hub
            </h2>
            <h3 className="border-white border-2 px-3 py-1 -skew-10 text-white border-y-transparent rotate-11 whitespace-nowrap">
              SignUp Page
            </h3>
          </div>

          <div className="w-full flex flex-col gap-2 items-center">
            <h1 className="font-bold text-3xl text-white">
              Create Your Account
            </h1>
            <p className="w-[95%] text-white text-lg text-justify">
              Peer Project Hub is a collaborative platform where developers
              share, explore, and learn from real-world projects. Discover
              ideas, upload your work, and grow with a community of creators.
            </p>
          </div>
          <div className="h-[30px]"></div>
        </div>
      </div>
      <div className="w-full h-full  relative text-black flex justify-center items-center ">
        <img
          src="./signup_bg.jpg"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover md:hidden "
        />
        <div className="w-[95%] sm:[90%] md:w-[90%] h-fit relative p-2  flex flex-col gap-4 md:gap-3  border-2 text-white md:text-black border-white md:border-0 backdrop-blur-[5px] bg-black/40 md:bg-white rounded-lg ">
          <div className='font-bold text-5xl  text-center  text-white md:bg-[url("/signup_bg.jpg")] md:text-transparent md:bg-clip-text '>
            SIGNUP
          </div>

          <form
            onSubmit={handleSubmit(handleSignUp)}
            className=" flex flex-col gap-2 gap-y-3 md:gap-1.5 py-2 "
          >
            <div className="flex flex-col gap-0.5">
              <label htmlFor="name" className="text-xl font-bold ">
                Name :
              </label>
              <input
                {...register("name")}
                id="name"
                type="text"
                className="border-2 border-white md:border-black outline-0 p-1 px-2 text-2xl rounded-xl"
                placeholder="Enter your name..."
              />
              {errors?.name && (
                <p className="text-[12px] text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <label htmlFor="mail" className="text-xl font-bold ">
                E-mail :
              </label>
              <input
                {...register("mail")}
                id="mail"
                type="email"
                className="border-2 border-white md:border-black outline-0 p-1 px-2 text-2xl rounded-xl"
                placeholder="Enter your Email"
              />
              {errors?.mail && (
                <p className="text-[12px] text-red-500">
                  {errors.mail.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <label htmlFor="pass" className="text-xl font-bold ">
                Password :
              </label>
              <input
                {...register("pass")}
                id="pass"
                type="password"
                className="border-2 border-white md:border-black outline-0 p-1 px-2 text-2xl rounded-xl"
                placeholder="Enter Password"
              />
              {errors?.pass && (
                <p className="text-[12px] text-red-500">
                  {errors.pass.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <label
                htmlFor="role"
                className="text-xl font-bold whitespace-nowrap "
              >
                Current Role:
              </label>
              <select
                id="role"
                {...register("role")}
                defaultValue="student"
                className="select text-black w-full border-2 border-white md:border-black rounded-xl outline-0"
              >
                <option disabled={true}>Choose your role</option>
                <option>Student</option>
                <option>Frontend developer</option>
                <option>Backend Developer</option>
                <option>Fullstack Developer</option>
              </select>
            </div>
            <button
              disabled={loading}
              type="submit"
              className={`bg-orange-500 ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              } self-center px-10 py-1 mt-3 rounded-2xl text-white font-bold text-xl`}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "SignUp"
              )}
            </button>
            <div className="">
              Already have an Account?{" "}
              <span
                className="text-blue-500 cursor-pointer font-bold"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
