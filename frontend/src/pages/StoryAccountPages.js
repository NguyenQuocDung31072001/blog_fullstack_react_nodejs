import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStoryAccount } from "../api/story.apiRequest";
import PostComponent from "../components/PostComponent";

const StoryAccountPages = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    ;(async function () {
      const result = await getStoryAccount(id);
      setData(result.storyAccount.stories);
      setUsername(result.storyAccount.username);
    })();
  }, []);

  return (
    <div className="">
      <div className="h-[50px] mb-[20px] w-full border-solid border-gray-500 border-b-[1px] flex items-center">
        <p className="text-xl text-gray-700 ml-[50px]">All story of Author: {username}</p>
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

export default StoryAccountPages;
