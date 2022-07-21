import { useEffect, useRef, useState } from "react";
import { motion, useCycle } from "framer-motion";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./ErrorComponent";
import { searchStoryByName } from "../api/story.apiRequest";
import {useNavigate } from "react-router-dom";
import { pathName } from "../router/pathName";

const SearchComponent = () => {
  const [openInput, setOpenInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [listResult, setListResult] = useState([]);
  const navigate = useNavigate();
  const variants = {
    open: {
      width: 240,
    },
    closed: {
      width: 0,
    },
  };
  const variantsListItem = {
    open: {
      width: 240,
      transition: {
        type: "spring",
      },
      opacity: 1,
    },
    closed: {
      width: 0,
      opacity: 0,
    },
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      (async function () {
        if(inputValue){
          const result = await searchStoryByName(inputValue);
          // console.log("result.data ::: ", result.data);
          setListResult(result.data);
        }
        else{
          setListResult([])
        }
      })();
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [inputValue]);

  return (
    <div>
      <div className="flex relative">
        <motion.input
          className="border-b-[1px] border-solid border-gray-600 focus:outline-none"
          initial="closed"
          animate={openInput ? "open" : "closed"}
          variants={variants}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <motion.div className="cursor-pointer">
          <i
            className="fa-solid fa-magnifying-glass "
            onClick={() => setOpenInput((openInput) => !openInput)}
          ></i>
        </motion.div>
      </div>
      <div className="absolute ">
        <motion.ul
          className="overflow-x-hidden  overflow-y-auto max-h-[100px] bg-white drop-shadow-xl rounded-[10px] last:pb-2"
          variants={variantsListItem}
          initial="closed"
          animate={openInput ? "open" : "closed"}
        >
          {listResult.length > 0 &&
            listResult.map((v, i) => {
              return (
                <li
                  key={i}
                  className="w-[208px] flex items-center text-[15px] px-4 py-[1px] cursor-pointer hover:bg-gray-200 "
                  onClick={() => navigate(pathName.detailPost_Name + v._id)}
                >
                  <img className="w-[20px] h-[20px] object-cover rounded-[50%] mr-2" src={v.image} alt=""/>
                  {v.title.substring(0, 20)}
                  {v.title.length > 20 ? " ..." : ""}
                </li>
              );
            })}
        </motion.ul>
      </div>
    </div>

  );
};

export default withErrorBoundary(SearchComponent, {
  FallbackComponent: ErrorComponent,
});
