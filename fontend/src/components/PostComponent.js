import React from "react";
import { pathName } from "../router/pathName";
import {Link} from "react-router-dom"

const PostComponent = ({ image, title, time, description }) => {
  return (
    <div className="w-[385px] mx-6 my-2 flex flex-col items-center">
      <img className="w-full h-[280px] object-cover" src={image} alt="" />
      <Link to={pathName.detailPost}>
      <h1 className="text-[24px] font-bold cursor-pointer">{title}</h1>
      </Link>
      <p className="text-[13px] text-gray-400">{time} hour ago</p>
      <p className="leading-6 font-normal">{description}</p>
    </div>
  );
};

export default PostComponent;
