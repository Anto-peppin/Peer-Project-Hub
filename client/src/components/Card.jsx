import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="card bg-base-100 w-[85%] sm:w-[250px] h-60 hover:scale-102 transition-all duration-300 shadow-[2px_2px_2px_black]">
      {data.dataType == "image" ? (
        <figure className="w-full h-[150px] border-b border-gray-500 border-dashed">
          <img className='w-full h-full object-cover' src={data.fileUrl} alt={data.title} />
        </figure>
      ) : (
        <video
          className="w-full h-[150px] object-cover rounded-[10px_10px_0_0]  "
          src={data?.fileUrl}
        ></video>
      )}

      <div className="flex gap-1 items-center px-1 my-1 ">
        <div
          className="font-bold text-xl w-[35px] h-[35px] flex justify-center items-center rounded-full text-white"
          style={{ backgroundColor: data?.bgColor }}
        >
          {data?.uName?.[0]?.toUpperCase()}
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm font-bold">{data?.uName}</p>
          <div className="flex gap-1 items-center">
            <div className="text-[12px] ">
              <span className="font-bold">{(data?.likes).length} </span>
              likes
            </div>
          </div>
        </div>
      </div>

      <div className="w-full my-1 flex justify-between items-center px-2 mb-2 ">
        <div>{data?.time}</div>
        <div
          onClick={() => navigate(`/Detail/${data._id}`)}
          className="py-1 px-3 gap-1 bg-orange-500 rounded-2xl text-white cursor-pointer"
        >
          <span>view details</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
