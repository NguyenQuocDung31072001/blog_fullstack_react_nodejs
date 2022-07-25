import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./ErrorComponent";
import {
  getAllComment,
  createNewComment,
  updateComment,
  deleteComment,
} from "../api/comment.apiRequest";
import { useParams } from "react-router-dom";

const CommentComponent = ({author}) => {
  const currentUser = useSelector((state) => state.account);
  const { id } = useParams();
  const [menu, setMenu] = useState("write"); //write/preview
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);

  useEffect(() => {
    (async function () {
      const result = await getAllComment(id);
      console.log(result);
      setAllComment(result.data);
    })();
  }, []);

  const handleCreateNewComment = () => {
    //id_account: currentUser.id, id_story:id
    (async function () {
      const result = await createNewComment(id, currentUser.id, comment);
      console.log("result is ::: ", result);
    })();
  };
  const handleUpdateComment = (id_comment) => {
    (async function () {
      const result = await updateComment(id_comment, comment);
      console.log("result is ::: ", result);
    })();
  };
  const handleDeleteComment = (id_comment) => {
    (async function () {
      const result = await deleteComment(id_comment);
      console.log("result is ::: ", result);
    })();
  };
  return (
    <div className="w-full">
      <p className="text-xl text-gray-600 font-medium">Comment</p>
      {!currentUser?.id && (
        <div className="w-full h-[60px] flex items-center justify-center border-2 border-solid border-gray-500">
          Please login to comment!
        </div>
      )}
      {currentUser?.id && (
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
            {menu === "write" && (
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
                  ></textarea>
                </div>
              </div>
            )}
            {menu === "preview" && (
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
                    disabled={true}
                  ></textarea>
                </div>
              </div>
            )}
            <div className="w-full flex justify-end ">
              <button
                className="bg-sky-500 rounded-[2px] px-4 py-2 m-4 mr-14 text-white"
                onClick={handleCreateNewComment}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {allComment?.length > 0 && (
        <div>
          <p>All comment</p>
        </div>
      )}
      {allComment?.length > 0 &&
        allComment.map((v, i) => {
          return (
            <div key={v._id} className="w-full flex justify-between">
              <div className="w-[100px]">
              {author===currentUser.username && <p>Tac gia</p>}
                <img
                  src={v.id_account.avatar}
                  alt=""
                  className="w-[50px] h-[50px] object-cover rounded-[50%]"
                />
                <p>{v.updatedAt.split(["T"])[0]}</p>
                
              </div>
              <div className="w-full ">
                <p>{v.comment}</p>
              </div>
              <div className="w-[300px]">
                {v.id_account._id === currentUser.id && (
                  <div>
                    <button className="bg-green-500 px-4 py-2 rounded-[5px] text-white mx-8">
                      update
                    </button>
                    <button className="bg-red-500 px-4 py-2 rounded-[5px] text-white">
                      delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default withErrorBoundary(CommentComponent, {
  FallbackComponent: ErrorComponent,
});
