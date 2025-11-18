import React, { useEffect } from "react";
import Card from "./Card";
import { useState } from "react";
import axios from "axios";
import Pagination from "./pagination";
import { FcSearch } from "react-icons/fc";

const AllProject = () => {
  const [allPro, setAllPro] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const getAllData = async () => {
      try {
        const respo = await axios.get(
          `${import.meta.env.VITE_BACK}/allprojects`
        );

        setAllPro(respo.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllData();
  }, []);
  const filteredData = allPro.filter((item) =>
    item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleData = filteredData.slice(startIndex, startIndex + PAGE_SIZE);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  return (
    <>
      <label className="input w-[95%] mx-auto">
        <FcSearch />
        <input
          type="search"
          onChange={handleSearch}
          className="grow"
          placeholder="Search"
        />
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>

      <div className="border p-1 py-3 flex justify-evenly min-h-[calc(100vh-80px)] flex-wrap gap-3 bg-[#141a27]  ">
        {visibleData?.length > 0
          ? visibleData.map((val, ind) => <Card key={ind} data={val} />)
          : new Array(10).fill(0).map((_, ind) => (
              <div
                key={ind}
                className="flex  w-[85%] sm:w-[250px] flex-col gap-4 rounded-2xl"
              >
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))}
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

export default AllProject;
