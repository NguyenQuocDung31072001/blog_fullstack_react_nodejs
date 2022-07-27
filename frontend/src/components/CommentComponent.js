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
import { Row, Col } from "antd";
import { useParams } from "react-router-dom";
import CommentFormComponent from "./CommentFormComponent";

const CommentComponent = ({ author }) => {
  const currentUser = useSelector((state) => state.account);
  const { id } = useParams();
  const [menu, setMenu] = useState("write"); //write/preview
  const [allComment, setAllComment] = useState([]);
  const [idCommentUpdate, setIdCommentUpdate] = useState("");

  useEffect(() => {
    handleGetAllComment();
  }, []);

  const handleGetAllComment = async () => {
    const result = await getAllComment(id);
    // console.log(result);
    setAllComment(result.data);
  };

  const handleCreateNewComment = (comment) => {
    if (comment) {
      (async function () {
        await createNewComment(id, currentUser.id, comment);
        await handleGetAllComment();
      })();
    }
  };
  const handleUpdateComment = (id_comment, newComment) => {
    (async function () {
      await updateComment(id_comment, newComment);
    })();
    setIdCommentUpdate("");
  };
  const handleDeleteComment = (id_comment) => {
    (async function () {
      await deleteComment(id_comment);
      await handleGetAllComment();
    })();
  };
  return (
    <div className="w-full">
      <p className="text-xl text-gray-600 font-bold">Comment</p>
      {!currentUser?.id && (
        <div className="w-full h-[60px] flex items-center justify-center border-2 border-solid border-gray-500">
          Please login to comment!
        </div>
      )}
      {currentUser?.id && (
        <CommentFormComponent
          id_component=""
          id_active=""
          menu={menu}
          setMenu={setMenu}
          prevComment=""
          handleCreateNewComment={handleCreateNewComment}
          handleUpdateComment={handleUpdateComment}
        />
      )}
      {allComment?.length > 0 && (
        <div>
          <p className="text-xl text-gray-600 font-bold">All comment</p>
        </div>
      )}
      <div>
        {allComment?.length > 0 && (
          <div className="border-[1px] border-gray-500 px-4 py-2 ">
            {allComment.map((v, i) => {
              return (
                <div
                  key={v._id}
                  className="border-b-[1px] border-gray-500 last:border-b-0"
                >
                  <Row>
                    <Col span={7} className="">
                      {author === currentUser.username && (
                        <p className="p-0 m-0 ml-4">Tac gia</p>
                      )}
                      <div className="flex items-center">
                        <img
                          src={v.id_account.avatar}
                          alt=""
                          className="w-[50px] h-[50px] object-cover rounded-[50%] ml-4 mr-4"
                        />
                        <div className="">
                          <div className="flex ">
                            <p className="text-blue-400 p-0 m-0">
                              {v.id_account.username}
                            </p>
                            <p className="ml-[1px] p-0 m-0">
                              {v.id_account.email}
                            </p>
                          </div>
                          <span className="p-0 m-0">
                            {v.updatedAt.split(["T"])[0]}
                          </span>
                          {v.id_account._id === currentUser.id && (
                            <span>
                              <i
                                className="fa-solid fa-pen-to-square text-gray-500 mx-2 cursor-pointer"
                                onClick={() => setIdCommentUpdate(v._id)}
                              ></i>
                              <i
                                className="fa-solid fa-trash-can text-gray-500 cursor-pointer"
                                onClick={() => handleDeleteComment(v._id)}
                              ></i>
                            </span>
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <CommentFormComponent
                        id_component={v._id}
                        id_active={idCommentUpdate}
                        setIdCommentUpdate={setIdCommentUpdate}
                        menu={menu}
                        setMenu={setMenu}
                        prevComment={v.comment}
                        handleUpdateComment={handleUpdateComment}
                      />
                    </Col>
                  </Row>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default withErrorBoundary(CommentComponent, {
  FallbackComponent: ErrorComponent,
});
