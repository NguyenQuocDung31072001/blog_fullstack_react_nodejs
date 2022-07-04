import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import dataPost from "../data/postData.json";
import { pathName } from "../router/pathName";
import {Link, useParams} from "react-router-dom"
import AboutComponent from "../components/AboutComponent";
import { getOneStory } from "../api/story.apiRequest";
import {useSelector} from "react-redux"
const DetailPostPages = () => {
  const currentUser=useSelector(state=>state.account)
  const [data, setData] = useState();
  const {id}=useParams()
  useEffect(()=>{
    (async function(){
      const story=await getOneStory(id)
      console.log("story is ", story)
      setData(story)
    })()
  },[])
  return (
    <div className="mx-4 mt-[70px] ">
      <Row className="">
        <Col className="" span={17}>
          <div className="w-full h-[300px]">
            <img
              className="w-full h-[300px] object-cover"
              src={data?.image}
              alt=""
            />
          </div>
          <div className="text-center text-[28px] relative">
            <h1>{data?.title}</h1>
            <div className="absolute top-0 right-0 text-[20px]">
              <i className="fa-solid fa-pen-to-square mx-2 text-green-400 cursor-pointer"></i>
              <i className="fa-solid fa-trash-can mx-2 text-red-400 cursor-pointer"></i>
            </div>
          </div>
          <div className="flex justify-between text-[18px]">
            <Link to={pathName.home}>
                <p className="text-orange-400">Author: {currentUser.username}</p>
            </Link>
            <p className="text-orange-400">{data?.createdAt?.split('T')[0]}</p>
          </div>
          <div>
            <p className="text-[18px] text-gray-600 ">{data?.detailDescription}</p>
          </div>
        </Col>
        <Col className="" span={7}>
            <AboutComponent/>
        </Col>
      </Row>
    </div>
  );
};

export default DetailPostPages;
