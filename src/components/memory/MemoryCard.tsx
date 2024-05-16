import { IoMdTime } from "react-icons/io";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { useEffect, useState } from "react";

import { cardEvents } from "../../constant/memory/events";
import CachedImage from "../../components/CachedImage";

const MemoryCard = ({ imageKey, isShow }) => {


  // console.log(index)

  return (
    <div
      className={`flex justify-center px-10 py-6 bg-[#cb8b42] cursor-pointer border-2 border-white transition-all duration-500 max-md:px-5 max-md:py-3 ${
        isShow ? "" : "flip-card"
      }`}
    >
      <div
        className={`flex flex-col gap-2 w-fit items-center ${
          isShow ? "visible" : "invisible"
        } delay-150`}
      >
        <CachedImage imgKey={imageKey} className=" max-md:w-12 max-md:h-12 w-24 h-24"/>

        <span>
          
          <IoMdTime className="inline max-md:text-xl text-4xl mr-3" />
          
          <FaRegCircleQuestion className="inline max-md:text-lg text-3xl" />
        </span>
      </div>
    </div>
  );
};

export default MemoryCard;
