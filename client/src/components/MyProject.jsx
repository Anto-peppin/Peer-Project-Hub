import { useEffect } from "react";
import { useContext } from "react";
import { Context } from "./Main";
import axios from "axios";
import { useState } from "react";
import Card from "./Card";
import Pagination from "./pagination";

const MyProject = () => {
  const { userData } = useContext(Context);
  const [allPro, setAllPro] = useState([]);
  const[loading,setLoading] = useState(true)
  const [reUpdateDel,setReUpdateDel] = useState(false)
  useEffect(() => {
    const getMyProject = async () => {
  try {
    setLoading(true)
        if (userData.mail) {
        const respo = await axios.get(
          `${import.meta.env.VITE_BACK}/total/myproject`,
          { params: { mail: userData?.mail } }
        );
        setAllPro(respo.data);
      }
  } catch (error) {
    console.log(error.message);
    
  }
  finally{
    setLoading(false)
  }
    };
    getMyProject();
  }, [userData,reUpdateDel]);

  const PAGE_SIZE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleData = allPro.slice(startIndex, startIndex + PAGE_SIZE);
  return (
    <>
      <div className="border p-1 py-3 relative flex justify-evenly min-h-[calc(100vh-80px)] flex-wrap gap-3 bg-[#141a27] ">
        {visibleData?.length > 0 
          ? visibleData.map((val, ind) => <Card key={ind} data={val} editState={true} setReUpdateDel={setReUpdateDel} />)
          :visibleData?.length <= 0 && loading ? new Array(10).fill(0).map((_, ind) => (
              <div
                key={ind}
                className="flex  w-[85%] sm:w-[250px] flex-col gap-4 rounded-2xl"
              >
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            )): <div className="absolute text-white font-bold text-xl sm:text-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">No Projects, add the project</div>
          }
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={allPro.length}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default MyProject;
