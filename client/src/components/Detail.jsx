import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { MdInsertComment } from "react-icons/md";
import Content from "./Content";

const Detail = () => {
  const [detailData, setDetailData] = useState([]);
  const [likes1, setLikes1] = useState();
  const { _id } = useParams();
  const [commentState, setCommentState] = useState(false);
  const [isComment, setIsComment] = useState(false);
  useEffect(() => {
    const getDetails = async () => {
      try {
        const respo = await axios.get(`${import.meta.env.VITE_BACK}/detail`, {
          params: { id: _id },
        });
        setDetailData(respo.data);

        if (
          (respo?.data[0]?.likes).includes(
            JSON.parse(localStorage.getItem("email"))
          )
        ) {
          setLikes1(() => true);
        } else {
          setLikes1(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getDetails();
  }, [likes1, isComment]);

  const handleLike = async (id) => {
    const ourId = JSON.parse(localStorage.getItem("email"));
    try {
      const respo = await axios.put(`${import.meta.env.VITE_BACK}/likes`, {
        id,
        ourId,
      });
      setLikes1(respo.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full p-2 md:p-3 ">
      <h1 className="text-orange-500 text-xl sm:text-3xl font-bold whitespace-nowrap mb-4 sm:mb-15 ">
        Project Details
      </h1>
      {detailData?.length >= 1 ? (
        <div className="w-full p-2 ">
          <p className="w-full sm:w-[80%] mb-1 text-end mx-auto px-2 ">
            {detailData[0]?.dataType}
          </p>
          <div className="w-full sm:w-[80%] flex justify-center items-center mb-3 h-[300px] mx-auto border rounded-2xl border-gray-400">
            {detailData[0]?.dataType == "image" ? (
              <img
                className=" h-full object-contain rounded-2xl shadow-[2px_2px_5px_black] shadow-black"
                src={detailData[0]?.fileUrl}
                alt=""
              />
            ) : (
              <video
                controls
                className="w-full h-full rounded-2xl"
                src={detailData[0]?.fileUrl}
              ></video>
            )}
          </div>
          <div className="w-full sm:w-[80%] mx-auto flex gap-5 px-4 items-center ">
            <div className="flex gap-1 items-center">
              <div className="tooltip tooltip-bottom  " data-tip="Like">
                {" "}
                <AiFillLike
                  className={`cursor-pointer ${
                    likes1 ? "text-red-500" : "text-gray-500"
                  } text-xl `}
                  onClick={() => handleLike(detailData[0]?._id)}
                />
              </div>
              <span className="flex items-center">
                {(detailData[0]?.likes).length} likes
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <div
                onClick={() => setCommentState(!commentState)}
                className="tooltip tooltip-bottom cursor-pointer"
                data-tip="comment"
              >
                <MdInsertComment className=" text-xl cursor-pointer" />
              </div>
              <span className="flex items-center">
                {(detailData[0]?.comment).length} comments
              </span>
            </div>
          </div>
          {commentState && (
            <Content
              id={_id}
              setIsComment={setIsComment}
              comment={detailData[0]?.comment}
            />
          )}
          <div className="mt-3 w-full sm:w-[80%] mx-auto flex flex-col gap-3">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border px-2 sm:px-4 w-full">
              <legend className="fieldset-legend text-xl ">Title</legend>
              <h2 className="font-bold text-2xl sm:text-3xl">
                {detailData[0]?.title}
              </h2>
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border px-2 sm:px-4 w-full">
              <legend className="fieldset-legend text-xl ">Creater</legend>
              <h2 className="font-bold text-xl sm:text-2xl">
                {detailData[0]?.uName}
              </h2>
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border px-2 sm:px-4 w-full">
              <legend className="fieldset-legend text-xl ">Upload Time</legend>
              <h2 className="font-bold text-lg sm:text-xl">
                {detailData[0]?.time}
              </h2>
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border px-2 sm:px-4 w-full flex gap-2 flex-wrap ">
              <legend className="fieldset-legend text-xl ">Used Tech</legend>
              {detailData[0]?.tech.map((val, ind) => (
                <button key={ind} className="btn btn-active btn-info">
                  {val}
                </button>
              ))}
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border px-2 sm:px-4 w-full ">
              <legend className="fieldset-legend text-xl ">Discription</legend>
              <p className="text-lg text-justify md:text-xl ">
                {detailData[0]?.discription}
              </p>
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border px-2 sm:px-4 w-full ">
              <legend className="fieldset-legend text-xl ">Live URL</legend>
              <a
                className="text-xl text-blue-500 cursor-pointer"
                href={detailData[0]?.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                {detailData[0]?.live}
              </a>
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border px-2 sm:px-4 w-full ">
              <legend className="fieldset-legend text-xl ">GitHub URL</legend>
              {
                detailData[0]?.git ?    <a
                className="text-xl text-blue-500 cursor-pointer"
                href={detailData[0]?.git}
                target="_blank"
                rel="noopener noreferrer"
              >
                {detailData[0]?.git}
              </a> : <p>link not available</p>
              }
           
            </fieldset>
          </div>
        </div>
      ) : (
        <div className="skeleton h-[350px] w-full sm:w-[80%] mx-auto "></div>
      )}
    </div>
  );
};

export default Detail;
