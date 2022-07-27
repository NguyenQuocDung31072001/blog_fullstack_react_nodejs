import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStoryAccount } from "../api/story.apiRequest";
import PostComponent from "../components/PostComponent";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../components/ErrorComponent";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";

const StoryAccountPages = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.account);
  const [data, setData] = useState([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    (async function () {
      const result = await getStoryAccount(id);
      setData(result.data.stories);
    })();
  }, []);

  return (
    <div className="">
      <div className=" mb-[20px] w-full border-solid border-gray-500 border-b-[1px] flex items-center">
        <Row className="w-full ">
          <Col span={7} className="">
            <div className="w-full flex justify-end items-center">
              <img
                src={currentUser.avatar_url}
                alt=""
                className="w-[70px] h-[70px] m-8 object-cover rounded-[50%]"
              />
              <div>
                <p className="text-[30px] font-normal p-0 m-0">
                  {currentUser.username}
                </p>
                <p className="text-gray-500">{currentUser.email}</p>
              </div>
            </div>
          </Col>
          <Col span={9}></Col>
          <Col span={8}>
            <div className="w-full h-full flex items-center">
              <button className="border-2 border-sky-500 text-sky-500  px-4 py-2 rounded-[10px]">
                <i className="fa-solid fa-plus mr-2"></i>
                Follow
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="flex flex-wrap justify-center">
        {data?.length > 0 &&
          data.map((v, index) => {
            return (
              <PostComponent
                key={index}
                id={v._id}
                image={v.image}
                title={v.title}
                time={v.updatedAt}
                description={v.description}
              />
            );
          })}
      </div>
    </div>
  );
};

export default withErrorBoundary(StoryAccountPages, {
  FallbackComponent: ErrorComponent,
});
