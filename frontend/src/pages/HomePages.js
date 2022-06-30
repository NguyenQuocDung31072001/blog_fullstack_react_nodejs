import React, { useState } from "react";
import { Row, Col } from "antd";
import dataPost from "../data/postData.json";
import PostComponent from "../components/PostComponent";
import AboutComponent from "../components/AboutComponent";

const HomePages = () => {
  const [data, setData] = useState(dataPost);
  return (
    <div>
      <header className="mt-[60px] mb-[15px] w-full h-[539px]  flex flex-col justify-end items-center relative">
        <span className="text-[20px] font-serif absolute top-9">
          React & Node
        </span>
        <span className="text-[100px] text-stone-600 font-serif absolute top-7">
          BLOG
        </span>
        <div className="w-full h-[450px] ">
          <img
            className="w-full h-full object-cover"
            src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt=""
          />
        </div>
      </header>
      <div className="mx-8">
        <Row>
          <Col className="" span={16}>
            <div className="flex flex-wrap">
              {data.map((d, index) => {
                return (
                  <PostComponent
                    key={index}
                    image={d.image}
                    title={d.title}
                    time={d.time}
                    description={d.description}
                  />
                );
              })}
            </div>
          </Col>
          <Col className="mt-8" span={8}>
            <AboutComponent />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePages;
