import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { pathName } from "../router/pathName";
import { useParams } from "react-router-dom";
import AboutComponent from "../components/AboutComponent";
import { deleteStory, getOneStory, updateStory } from "../api/story.apiRequest";
import { useSelector } from "react-redux";
import ComfirmUpdateComponent from "../components/ComfirmUpdateComponent";
import ConfirmDeleteStoryComponent from "../components/ConfirmDeleteStoryComponent";
import { useNavigate } from "react-router-dom";
import {withErrorBoundary} from "react-error-boundary"
import ErrorComponent from "../components/ErrorComponent";

const DetailPostPages = () => {
  const currentUser = useSelector((state) => state.account);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUpload, setFileUpload] = useState();
  const [data, setData] = useState();
  const [edit, setEdit] = useState(false);
  const [openModalConfirmUpdate, setOpenModalConfirmUpdate] = useState(false);
  const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    (async function () {
      const result = await getOneStory(id, currentUser.id);
      setData(result.data);
      setTitle(result.data.title);
      setDescription(result.data.detailDescription);
    })();
  }, [id]);

  const dontSaveUpdate = () => {
    setOpenModalConfirmUpdate(false);
    setEdit(false);
    setTitle(data.title);
    setDescription(data.detailDescription);
  };
  const handleSaveUpdate = () => {
    setOpenModalConfirmUpdate(false);
    setEdit(false);
    const uploadData = new FormData();
    if (fileUpload) {
      uploadData.append("file", fileUpload, "file");
    }
    if (title) {
      uploadData.append("title", title);
    }
    if (description) {
      uploadData.append("description", description);
      uploadData.append("detailDescription", description);
    }
    (async function () {
      const dataUpdate = await updateStory(id, uploadData);
      console.log("dataUpdate : ", dataUpdate);
    })();
  };
  const handleFormUpdate = () => {
    setEdit(true);
  };
  const handleOpenModal = () => {
    if (edit === true) {
      setOpenModalConfirmUpdate(true);
    } else {
      navigate(pathName.storyAccountName + "/" + id);
    }
  };
  const handleDeleteStory = () => {
    setOpenModalConfirmDelete(false)
    ;(async function () {
      const result = await deleteStory(id, currentUser.id);
      console.log("result ", result);
      navigate(pathName.home);
    })();
  };
  return (
    <div className="mx-4 mt-[70px] ">
      <Row className="">
        <Col className="" span={17}>
          <div className="w-full h-[300px]">
            <label htmlFor="uploadImg">
              <img
                className="w-full h-[300px] object-cover"
                src={fileUpload ? URL.createObjectURL(fileUpload) : data?.image}
                alt=""
              />
              <input
                id="uploadImg"
                onChange={(e) => setFileUpload(e.target.files[0])}
                className="hidden"
                type="file"
                disabled={!edit}
              />
            </label>
          </div>
          <div className="text-center text-[28px] relative">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={!edit}
            />
            {data?.author?._id === currentUser.id && (
              <div className="absolute top-0 right-0 text-[20px]">
                <i
                  className="fa-solid fa-pen-to-square mx-2 text-green-400 cursor-pointer"
                  onClick={handleFormUpdate}
                ></i>
                <i
                  className="fa-solid fa-trash-can mx-2 text-red-400 cursor-pointer"
                  onClick={() => setOpenModalConfirmDelete(true)}
                ></i>
              </div>
            )}
          </div>
          <div className="flex justify-between text-[18px]">
            <div onClick={handleOpenModal} className="cursor-pointer">
              <p className="text-orange-400">
                Author: {data?.author?.username}
              </p>
            </div>
            <p className="text-orange-400">{data?.createdAt?.split("T")[0]}</p>
          </div>
          {openModalConfirmUpdate && (
            <ComfirmUpdateComponent
              handleCancel={dontSaveUpdate}
              handleUpdate={handleSaveUpdate}
            />
          )}
          {openModalConfirmDelete && (
            <ConfirmDeleteStoryComponent
              handleCancel={() => setOpenModalConfirmDelete(false)}
              handleUpdate={handleDeleteStory}
            />
          )}
          <div>
            <textarea
              className="ml-6 mt-[50px] text-[18px] focus:outline-none "
              name="description"
              rows="15"
              cols="120"
              placeholder="Tell your story ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!edit}
            ></textarea>
          </div>
        </Col>
        <Col className="" span={7}>
          <AboutComponent />
        </Col>
      </Row>
      {data?.author?._id === currentUser.id && edit && (
        <Row className="">
          <Col span={17}>
            <div className="h-[50px] mt-[15px] mb-[50px] flex justify-end">
              <button
                className="px-4 py-2 w-[100px] mx-2 bg-gray-600 rounded-[10px] cursor-pointer text-white hover:bg-gray-500 hover:duration-200"
                onClick={dontSaveUpdate}
              >
                Don't save
              </button>
              <button
                className="px-4 py-2 w-[100px] mx-2 bg-green-500 rounded-[10px] cursor-pointer text-white hover:bg-green-400 hover:duration-200"
                onClick={handleSaveUpdate}
              >
                Save
              </button>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default withErrorBoundary(DetailPostPages,{
  FallbackComponent:ErrorComponent
});
