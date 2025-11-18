import { useNavigate } from "react-router-dom";
import Hero from "./Typewritter";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { useState } from "react";
import Swal from "sweetalert2";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const handlelogin = async (user) => {
    try {
      setLoading(true);
      const respo = await signInWithEmailAndPassword(
        auth,
        user.mail,
        user.pass
      );
      await Swal.fire({
        position: "top-end",
        theme: "bootstrap-5",
        icon: "success",
        title: "Login Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      reset();
      navigate("/main");
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
    <div className="w-full h-screen bg-black/50 relative flex justify-center gap-4 overflow-hidden  p-2">
      <img
        className="w-full h-full object-cover md:object-fill absolute inset-0 -z-10"
        src="./login_bg.gif"
        alt=""
      />
      <div className=" relative left_box hidden md:flex w-1/2 shadow-[inset_-2px_-2px_5px_white,inset_2px_2px_5px_white] backdrop-blur-[2px] h-full  flex-col rounded-[10px_10px_30%_10px] p-3 py-3  gap-3 justify-between border-2 border-white">
        <div className="flex gap-2 justify-between items-center pr-3">
          <h2 className="font-bold text-3xl text-orange-500">
            Peer Project Hub
          </h2>
          <h3 className="border-white border-2 px-3 py-1 -skew-10 text-white border-y-transparent rotate-11">
            Login Page
          </h3>
        </div>
        <div className="flex gap-1 items-center">
          <img
            className="w-[50px] h-[50px] rounded-full "
            src="./sharingan.gif"
            alt=""
          />
          <div className="flex flex-col gap-1 ">
            <p className="text-white">Anto peppin</p>
            <p className="text-white">Full Stack Developer</p>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 w-full h-full right_box md:rounded-[10px_10px_10px_30%] rounded-2xl shadow-[inset_-2px_2px_5px_white,inset_2px_-2px_5px_white] backdrop-blur-[2px] relative  border-white border-2 p-3 flex flex-col gap-2 justify-between">
        <div className=" mb-2 text-white text-4xl font-bold flex gap-1 items-center">
          Hi! <Hero />
        </div>

        <div className="w-[90%] md:w-[80%] h-fit mx-auto flex flex-col items-center gap-3 py-2">
          <h2 className="font-bold text-3xl mb-2 text-white text-center md:hidden">
            Login Page
          </h2>
          <h3 className="text-center mb-2 text-orange-500 text-xl font-bold ">
            Welcome to Peer Project Hub
          </h3>

          <form
            className="w-full p-2 text-white flex flex-col gap-2"
            onSubmit={handleSubmit(handlelogin)}
          >
            <div className="flex flex-col gap-1 font-bold">
              <label htmlFor="mail">Email</label>
              <input
                {...register("mail")}
                className="border-2 outline-0 focus:border-orange-500 border-white p-1 rounded-xl "
                placeholder="Enter the Email"
                type="mail"
              />
              <p className="text-red-500 text-[11px]"></p>
            </div>
            <div className="flex flex-col gap-1 font-bold ">
              <label htmlFor="password">Password</label>
              <input
                {...register("pass")}
                className="border-2 outline-none focus:border-orange-500 border-white p-1 rounded-xl "
                placeholder="Enter the Password"
                type="mail"
              />
              <p className="text-red-500 text-[11px]"></p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-orange-500 ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              } text-white text-lg rounded-2xl mt-3 hover:font-bold `}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>
            <p>
              Don't have an Account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:font-bold"
                onClick={() => navigate("/signup")}
              >
                SignUp
              </span>
            </p>
            <p className="mt-2 text-[12px] text-justify">
              Peer Project Hub is a collaborative platform where developers
              share, explore, and learn from real-world projects. Discover
              ideas, upload your work, and grow with a community of creators.
            </p>
          </form>
        </div>

        <div className="h-[30px]"></div>
      </div>
    </div>
  );
};

export default SignUp;
