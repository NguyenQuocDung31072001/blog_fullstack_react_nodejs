import React from "react";

const CommentComponent = () => {
  return (
    <div className="w-full">
      <p>Comment</p>
      <div className="w-full h-[60px] flex items-center justify-center border-2 border-solid border-gray-500">
        Please login to comment!
      </div>
      <div className="w-full my-4 border-2 border-solid border-gray-500">
        <div className="flex border-b-[1px] border-gray-500">
          <p className="p-2 ml-4 cursor-pointer">Write</p>
          <p className="p-2 cursor-pointer">Preview</p>
        </div>
        <div className="mt-4">
          <div className="flex ">
            <img
              src="https://res.cloudinary.com/dcrjho9el/image/upload/v1657265303/lmzzynxdb8mrlugsgbxa.jpg"
              alt=""
              className="w-[50px] h-[50px] rounded-[50%] object-cover m-2 ml-4"
            />
            <div className="w-full h-[100px] border-[1px] border-gray-500">
              <p className="p-2">Write your post ...</p>
            </div>
          </div>
          <div className="w-full flex justify-end ">
            <button className="bg-sky-500 rounded-[2px] px-4 py-2 m-4 text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
