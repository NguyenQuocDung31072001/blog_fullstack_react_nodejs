import React, { useEffect } from "react";
import {Row,Col} from "antd"

const CreateNewPostPages = () => {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    
  return (
    <div className="pr-[60px] pl-[150px] pt-[50px]">
      <div className="w-[1075px] h-[250px] mb-4">
        <img
          className="w-full h-full object-cover rounded-[10px]"
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
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
                />
            </label>
            </Col>
            <Col className="" span={19}>
                <input className="w-full h-full text-[30px] font-normal  focus:outline-none" type="text" placeholder="Title" />
            </Col>
            <Col className=" " span={4}>
                <div className="w-full h-full flex justify-end">
                    <button className="px-4 py-2 bg-green-700 text-white text-[18px] rounded-[10px]">Publish</button>
                </div>
            </Col>
        </Row>

      </div>
      <div>
        <textarea className="ml-6 mt-[50px] text-[18px] focus:outline-none " name="description" rows="30" cols="150" placeholder="Tell your story ...">
        </textarea>
      </div>
    </div>
  );
};

export default CreateNewPostPages;
