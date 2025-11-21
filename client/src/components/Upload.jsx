import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { auth } from "./FirebaseConfig";
import { useNavigate, useParams } from "react-router-dom";

const Upload = () => {
 const {id} = useParams()
 const[editMode,setEditMode] = useState(false)

  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required("Enter the title"),
    discription: yup.string().required("Enter the discription"),
    tech: yup.array().min(1, "At least one technology is required"),
    live: yup.string().required("Enter the link"),
  });
  const [uMail, setUmail] = useState("");
  const [uName, setUname] = useState("");
  const [bgColor, setBgColor] = useState("");

    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { tech: [] }, resolver: yupResolver(schema) });

// lkjhblkjhbjbkbnkb,mnm

   useEffect(()=>{
const updated = async()=>{
try {
    if(id){
    setEditMode(true)
    const respo = await axios.get(`${import.meta.env.VITE_BACK}/detail`,{params:{id}})
    reset(respo?.data[0])

    
  }
} catch (error) {
  console.log(error);
  
}
}
updated()
 },[])

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const getUserData1 = async () => {
          const respo = await axios.get(
            `${import.meta.env.VITE_BACK}/getuser`,
            { params: { email: user.email } }
          );

          const { name, mail, picColor } = respo.data;
          setUmail(mail);
          setUname(name);
          setBgColor(picColor);
        };
        getUserData1();
      } else {
        navigate("/signup");
      }
    });
  }, []);


  const [load1, setLoad1] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [fileName, setFileName] = useState("");
  const [dataType, setDataType] = useState("");
  const [url, setUrl] = useState(null);



  const inp = useRef();

  const realData = async (file) => {
    try {
      setLoad1(true);
      if (!file) return;
      const type = file.type.slice(0, 5).trim();
      if (type === "image" || type === "video") {
        setDataType(type);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", `${import.meta.env.VITE_UPLOAD_PRESET}`);
        data.append("cloud_name", `${import.meta.env.VITE_CLOUD_NAME}`);

        const respo = await axios.post(
          `${import.meta.env.VITE_CLOUD_URL}/${
            import.meta.env.VITE_CLOUD_NAME
          }/${type}/upload`,
          data
        );
        const url = (respo.data.url).replace("http://", "https://");
        setUrl(url);
        setFileName(file.name);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "file get successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error("Invalid file formate");
      }
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 2500,
      });
    } finally {
      setLoad1(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.files[0];
    realData(data);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleRead = (e) => realData(e.target.files[0]);

  const handleUpload = () => {
    inp.current.click();
  };
  const timeDate = () => {
    const date1 = new Date();
    const day = date1.getDate();
    const month = date1.getMonth() + 1;
    const year = date1.getFullYear();
    const date = `${day}/${month}/${year}`;
    return date;
  };
  const uploadForm = async (e) => {
    if(editMode){
     const respo = await axios.post(`${import.meta.env.VITE_BACK}/update`,{e,id})
     console.log(respo.data);
     setEditMode(false)
     Swal.fire({
  title: "Update Successfully",
  showClass: {
    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
  },
  hideClass: {
    popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
  }
});
     navigate('/main/myproject')
     
      

    }
else{
      try {
      if (url) {
        setLoad2(true);
        const time = timeDate();
        const final = {
          ...e,
          fileUrl: url,
          mail: uMail,
          time,
          dataType,
          uName,
          bgColor,
        };

        const respo = await axios.post(
          `${import.meta.env.VITE_BACK}/myproject`,
          { final }
        );
        if (respo.data == true) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Project upload Successfully`,
            showConfirmButton: false,
            timer: 2500,
          });
          reset();
          navigate("/main");
        } else {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: `Project not submited yet`,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      } else {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: `Upload the file`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoad2(false);
    }
}
  };

  const tech = [
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Bootstrap",
    "JavaScript",
    "Redux",
    "React.js",
    "FireBase",
    "Node.js",
    "Express.js",
    "Java",
    "Python",
    "c++",
    "MongoDB",
    "SQL",
  ];
  return (
    <div className="w-full h-full p-3  flex justify-center items-center bg-[#141a27]">
      <div className="w-[95%] sm:w-[90%] md:w-[70%]  lg:w-[60%] h-full py-3 ">
        <h2 className="text-center font-bold text-xl text-orange-500 sm:text-2xl md:text-3xl mb-3">
          Share Your Project
        </h2>
        <div className="w-full p-2 bg-gray-300 flex flex-col gap-3 rounded-2xl ">
          <p className="font-bold text-center ">Fill the forms Correctly</p>

          <div className=" w-full py-10 ">
            <div
              accept="image/*,video/*,.mkv,.mov,.avi,.flv,.m4v"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`flex flex-col items-center gap-2 justify-center border-2 rounded-xl border-dashed p-2 text-center  w-[80%] mx-auto h-[200px] `}
            >
              <h2 className="font-bold text-xl mb-5">
                Upload or Drop a Photo or Video
              </h2>
              <input
                accept="image/*,video/*,.mkv,.mov,.avi,.flv,.m4v"
                className="hidden"
                ref={inp}
                onChange={handleRead}
                type="file"
              />

              <button
                onClick={handleUpload}
                accept="image/*,video/*"
                disabled={load1}
                className={`btn btn-info ${
                  load1 ? "cursor-not-allowed" : "cursor-pointer"
                } outline-0`}
              >
                {load1 ? (
                  <span className="loading loading-spinner loading-lg"></span>
                ) : (
                  "Upload file"
                )}
              </button>

              {fileName && <p className="text-[10px]  ">{fileName}</p>}
            </div>
          </div>

          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(uploadForm)}
          >
            <div className="flex flex-col gap-1">
              <label className="text-lg font-bold " htmlFor="title">
                <span className="text-red-500 text-[10px]">*</span>Title
              </label>
              <input
                {...register("title")}
                className="border-2 rounded-2xl w-full text-lg p-1"
                id="title"
                type="text"
                placeholder="Project title"
              />
              {errors.title && (
                <p className="text-red-500 text-[11px] ">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg font-bold " htmlFor="discription">
                <span className="text-red-500 text-[10px]">*</span>Discription
              </label>
              <textarea
                {...register("discription")}
                className="border-2 rounded-2xl resize-none h-[100px] w-full text-lg p-1"
                id="discription"
                type="text"
                placeholder="project discription"
              />
              {errors.discription && (
                <p className="text-red-500 text-[11px] ">
                  {errors.discription.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg font-bold ">
                <span className="text-red-500 text-[10px]">*</span>Used
                Tecknologys
              </label>
              <div className="flex gap-1 flex-wrap">
                {tech.map((val, ind) => (
                  <label
                    key={ind}
                    className="cursor-pointer flex items-center gap-1 border px-2 py-1 rounded"
                  >
                    <input
                      type="checkbox"
                      value={val}
                      {...register("tech")}
                      className="checkbox"
                    />
                    {val}
                  </label>
                ))}
              </div>
              {errors.tech && (
                <p className="text-red-500 text-[11px] ">
                  {errors.tech.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg font-bold " htmlFor="live">
                <span className="text-red-500 text-[10px]">*</span>Live URL
              </label>
              <input
                {...register("live")}
                className="border-2 rounded-2xl w-full text-lg p-1"
                id="live"
                type="text"
                placeholder="https://"
              />
              {errors.live && (
                <p className="text-red-500 text-[11px] ">
                  {errors.live.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg font-bold " htmlFor="git">
                Github repo Url <span className=" text-[10px]">(optional)</span>
              </label>
              <input
                {...register("git")}
                className="border-2 rounded-2xl w-full text-lg p-1"
                id="git"
                type="text"
                placeholder="https://"
              />
            </div>
            <button
              type="submit"
              disabled={load2}
              className={`${
                load2 ? "cursor-not-allowed" : "cursor-pointer"
              } p-2 bg-orange-500 rounded-2xl text-white font-bold cursor-pointer self-center px-6`}
            >
              {load2 ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
