import { BsFillQuestionSquareFill } from "react-icons/bs";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { TbBuildingCircus } from "react-icons/tb";

export default function ArcadeBox() {
  const { t } = useTranslation();

  return (
    <>
      <Link
        className="p-8 border-2 group rounded-lg cursor-pointer border-[#ff9a9c]  hover:bg-[#c82031] hover:border-[#ffe1ed] transition duration-500 bg-[#101010] shadow-lg shadow-black w-full"
        to="/arcade"
      >
        <div className="flex justify-center items-center gap-4">
          <TbBuildingCircus className="text-5xl text-[#ff9292] group-hover:text-white" />
          <p className="text-left text-white">
            ARCADE <span className="text-orange-300 font-modesto text-lg animate-pulse">[MULTIPLAYER!]</span> <br />{" "}
            <span className="text-[#ff9292] group-hover:text-white">{t`Prove Yourself against Others`}</span>
          </p>
        </div>
      </Link>
    </>
  );
}
