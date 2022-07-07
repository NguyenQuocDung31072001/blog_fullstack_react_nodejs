import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { pathName } from "../router/pathName";
import { Link, useParams } from "react-router-dom";
import AboutComponent from "../components/AboutComponent";
import { getOneStory, updateStory } from "../api/story.apiRequest";
import { useSelector } from "react-redux";

const DetailPostPages = () => {
  const currentUser = useSelector((state) => state.account);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUpload, setFileUpload] = useState();
  const [data, setData] = useState();
  const [edit, setEdit] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

    (async function () {
      const story = await getOneStory(id);
      console.log("story is ", story);
      setData(story);
      setTitle(story.title);
      setDescription(story.detailDescription);
    })();
  }, []);
  const dontSaveUpdate = () => {
    setEdit(true);
    setTitle(data.title);
    setDescription(data.detailDescription);
  };
  const handleSaveUpdate = () => {
    setEdit(true)
    const uploadData = new FormData();
    uploadData.append("file", fileUpload, "file");
    uploadData.append("title", title);
    uploadData.append("description", description);
    uploadData.append("detailDescription", description);
    (async function () {
      const dataUpdate = await updateStory({ id, uploadData });
      console.log("dataUpdate : ", dataUpdate);
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
                disabled={edit}
              />
            </label>
          </div>
          <div className="text-center text-[28px] relative">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={edit}
            />
            <div className="absolute top-0 right-0 text-[20px]">
              <i
                className="fa-solid fa-pen-to-square mx-2 text-green-400 cursor-pointer"
                onClick={() => setEdit(false)}
              ></i>
              <i className="fa-solid fa-trash-can mx-2 text-red-400 cursor-pointer"></i>
            </div>
          </div>
          <div className="flex justify-between text-[18px]">
            <Link to={pathName.home}>
              <p className="text-orange-400">Author: {currentUser.username}</p>
            </Link>
            <p className="text-orange-400">{data?.createdAt?.split("T")[0]}</p>
          </div>
          <div>
            <textarea
              className="ml-6 mt-[50px] text-[18px] focus:outline-none "
              name="description"
              rows="10"
              cols="120"
              placeholder="Tell your story ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={edit}
            ></textarea>
          </div>
        </Col>
        <Col className="" span={7}>
          <AboutComponent />
        </Col>
      </Row>
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
    </div>
  );
};

export default DetailPostPages;
