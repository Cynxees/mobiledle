import { BsFillQuestionSquareFill } from "react-icons/bs";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GiMirrorMirror } from "react-icons/gi";

export default function MirrorBox() {
  const { t } = useTranslation();

  return (
    <>
      <Link
        className="p-8 border-2 group rounded-lg cursor-pointer border-[#befffc]  hover:bg-[#2da4cb] hover:border-[#e8dca4] transition duration-500 bg-[#101010] shadow-lg shadow-black w-full"
        to="/mirror"
      >
        <div className="flex justify-center items-center gap-4">
          <GiMirrorMirror className="text-5xl text-[#b7fffa] group-hover:text-white" />
          <p className="text-left text-white">
            MIRROR <br />{" "}
            <span className="text-[#b7fffa] group-hover:text-white">{t`Get Clues On Every Try`}</span>
          </p>
        </div>
      </Link>
    </>
  );
}
