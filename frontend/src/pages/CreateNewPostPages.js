import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { postNewStory } from "../api/story.apiRequest";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pathName } from "../router/pathName";

const CreateNewPostPages = () => {
  const currentUser = useSelector((state) => state.account);
  const navigate=useNavigate()
  // console.log(currentUser.id)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUpload, setFileUpload] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCreateNewPost = () => {
    const uploadData = new FormData();
    uploadData.append("file", fileUpload, "file");
    uploadData.append("title", title);
    uploadData.append("description", description);
    uploadData.append("detailDescription", description);

    (async function () {
      let id_account = currentUser.id;

      const res = await postNewStory({
        id_account,
        uploadData
      });
      navigate(pathName.detailPost_Name+res.newStory._id)
      console.log(res);
    })();
  };
  return (
    <div className="pr-[60px] pl-[150px] pt-[50px]">
      <div className="w-[1075px] h-[250px] mb-4">
        <img
          className="w-full h-full object-cover rounded-[10px]"
          src={
            fileUpload
              ? URL.createObjectURL(fileUpload)
              : "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          }
          alt=""
        />
      </div>
      <div className="">
        <Row className="h-[50px]">
          <Col className=" m-auto text-center" span={1}>
            <label htmlFor="inputImg">
              <i className="fa-solid fa-circle-plus text-[27px] cursor-pointer"></i>
              <input
                id="inputImg"
                className="hidden"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => setFileUpload(e.target.files[0])}
              />
            </label>
          </Col>
          <Col className="" span={19}>
            <input
              className="w-full h-full text-[30px] font-normal  focus:outline-none"
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col className="" span={4}>
            <div className="w-full h-full flex justify-end">
              <button
                className="px-4 py-2 bg-green-700 text-white text-[18px] rounded-[10px]"
                onClick={handleCreateNewPost}
              >
                Publish
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <textarea
          className="ml-6 mt-[50px] text-[18px] focus:outline-none "
          name="description"
          rows="30"
          cols="150"
          placeholder="Tell your story ..."
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default CreateNewPostPages;
