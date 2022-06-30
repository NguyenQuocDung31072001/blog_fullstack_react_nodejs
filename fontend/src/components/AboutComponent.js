import React from "react";

const Categories = ["Life", "Music", "Sport", "Style", "Tech", "Cinema"];
const AboutComponent = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[298px] h-[1px] bg-gray-500"></div>
      <div>
        <h1>ABOUT ME</h1>
      </div>
      <div className="w-[298px] h-[1px] bg-gray-500"></div>
      <div className="my-[25px] w-[250px] h-[250px]">
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
      </div>
      <div className="w-[298px] mb-[20px]">
        <p className="font-serif">
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>

      <div className="w-[214px] h-[1px] bg-gray-500"></div>
      <div>
        <p className="my-1 font-medium">CATEGORIES</p>
      </div>
      <div className="w-[214px] h-[1px] bg-gray-500"></div>

      <div className="w-[255px] h-[100px]">
        <ul className="pl-[40px] my-2 w-full h-full flex flex-wrap">
          {Categories.map((c, index) => {
            return (
              <li key={index} className="w-[107px] h-[18px] font-serif">
                {c}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-[214px] h-[0.5px] bg-gray-500"></div>
      <p className="my-1 font-medium">FOLLOW US</p>

      <div className="w-[214px] h-[0.5px] bg-gray-500"></div>
      <div className="w-[250px] flex justify-center mt-4">
        <div className="mx-1 text-[16px]">
          <i className="fa-brands fa-facebook-square cursor-pointer"></i>
        </div>
        <div className="mx-1 text-[16px]">
          <i className="fa-brands fa-instagram-square cursor-pointer"></i>
        </div>
        <div className="mx-1 text-[16px]">
          <i className="fa-brands fa-pinterest-square cursor-pointer"></i>
        </div>
        <div className="mx-1 text-[16px]">
          <i className="fa-brands fa-twitter-square cursor-pointer"></i>{" "}
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
