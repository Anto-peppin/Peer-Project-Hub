import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import { auth } from "./FirebaseConfig";
import { useState } from "react";
const Content = ({ id, isComment, comment }) => {
  const [userMail, setUserMail] = useState("");
  useEffect(() => {
    const getMail = async () => {
      auth.onAuthStateChanged((user) => {
        if (user) setUserMail(user.email);
      });
    };
    getMail();
  }, []);

  const { register, handleSubmit, reset } = useForm();

  const handleComment = async (data) => {
    try {
      const respo = await axios.post(`${import.meta.env.VITE_BACK}/comment`, {
        id,
        userMail,
        data: data.comment,
      });
      isComment((pre) => !pre);
      reset();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="w-full h-[250px] relative overflow-y-auto transition-all border-2 duration-300 ease-linear my-1 p-2 rounded-2xl ">
        {userMail && comment.length >= 1 ? (
          comment.map((val, ind) =>
            val.mail != userMail ? (
              <div key={ind} className="chat chat-start">
                <div className="chat-bubble">
                  <span className="text-sm font-bold">{val.mail}</span>
                  <br />
                  <span>{val.data}</span>
                </div>
              </div>
            ) : (
              <div key={ind} className="chat chat-end">
                <div className="chat-bubble chat-bubble-primary">
                  <span className="text-sm font-bold">you</span>
                  <br />
                  <span>{val.data}</span>
                </div>
              </div>
            )
          )
        ) : (
          <div className="absolute inline top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            no comments
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(handleComment)}>
        <label className="input w-full mx-auto outline-0 ">
          <input
            {...register("comment")}
            type="search"
            className="grow"
            placeholder="Comment your thoughts"
          />
          <kbd className="kbd kbd-sm">⌘</kbd>
          <button type="submit" className="kbd kbd-sm">
            submit
          </button>
        </label>
      </form>
    </>
  );
};

export default Content;
