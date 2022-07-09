import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SearchComponent = () => {
  //   const targetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const classInput =
    "w-full h-[25px] font-serif text-gray-500 border-solid border-0 border-b-2 border-gray-500 focus:outline-none focus:border-solid focus:border-0 focus:border-b-2 focus:border-gray-500";
  const showSearchInput = isHovered || isFocused;
  //   useEffect(() => {
  //     targetRef.current.value = "";
  //   }, [showSearchInput]);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="flex items-center"
    >
      <input
        type="text"
        className={showSearchInput ? `${classInput}` : `hidden ${classInput}`}
      />
      <i className="fa-solid fa-magnifying-glass cursor-pointer"></i>
    </motion.div>
  );
};

export default SearchComponent;
