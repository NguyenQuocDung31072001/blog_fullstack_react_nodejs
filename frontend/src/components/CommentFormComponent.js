import React, { useState } from "react";
import { useSelector } from "react-redux";

const CommentFormComponent = ({
  id_component,
  id_active,
  menu,
  setMenu,
  prevComment,
  handleCreateNewComment,
  handleUpdateComment,
}) => {
  const currentUser = useSelector((state) => state.account);
  const [comment, setComment] = useState(prevComment);
  
  return (
    <div>
      {!id_component && (
        <div className="w-full my-4 border-2 border-solid border-gray-500">
          <div className="flex border-b-[1px] border-gray-500">
            <p
              className="p-2 ml-4 cursor-pointer"
              onClick={() => setMenu("write")}
            >
              Write
            </p>
            <p
              className="p-2 cursor-pointer"
              onClick={() => setMenu("preview")}
            >
              Preview
            </p>
          </div>

          <div className="mt-4">
            <div className="flex ">
              <img
                src={currentUser.avatar_url}
                alt=""
                className="w-[50px] h-[50px] rounded-[50%] object-cover m-2 ml-4"
              />
              <div className="w-full ">
                <textarea
                  className="border-[1px] border-gray-500 p-2"
                  placeholder="Write your post ..."
                  rows="5"
                  cols="140"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={menu !== "write"}
                ></textarea>
              </div>
            </div>

            <div className="w-full flex justify-end ">
              <button
                className="bg-sky-500 rounded-[2px] px-4 py-2 m-4 mr-14 text-white"
                onClick={() => {
                  setComment("");
                  handleCreateNewComment(comment);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {id_component && id_component === id_active && (
        <div className="w-full my-4 border-2 border-solid border-gray-500">
          <div className="flex border-b-[1px] border-gray-500">
            <p
              className="p-2 ml-4 cursor-pointer"
              onClick={() => setMenu("write")}
            >
              Write
            </p>
            <p
              className="p-2 cursor-pointer"
              onClick={() => setMenu("preview")}
            >
              Preview
            </p>
          </div>

          <div className="mt-4">
            <div className="flex ">
              <img
                src={currentUser.avatar_url}
                alt=""
                className="w-[50px] h-[50px] rounded-[50%] object-cover m-2 ml-4"
              />
              <div className="w-full ">
                <textarea
                  className="border-[1px] border-gray-500 p-2"
                  placeholder="Write your post ..."
                  rows="5"
                  cols="140"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={menu !== "write"}
                ></textarea>
              </div>
            </div>

            <div className="w-full flex justify-end ">
              <button
                className="bg-sky-500 rounded-[2px] px-4 py-2 m-4 mr-14 text-white"
                onClick={() => handleUpdateComment(id_component, comment)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {id_component && id_component !== id_active && <p>{comment}</p>}
    </div>
  );
};

export default CommentFormComponent;
