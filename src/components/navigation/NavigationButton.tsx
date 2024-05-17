import { BsFillQuestionSquareFill } from "react-icons/bs";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface NavigationButtonProps {
    link: string
}

export default function NavigationButton({link}: NavigationButtonProps) {
  const { t } = useTranslation();

  const linkMetadata = {
    '/classic': ['CLASSIC', t`Get Clues On Every Try`, '#CB812D', '#e8dca4'],
    '/survival': ['SURVIVAL', t`How Long Will You Last?`, '#d1b4ff', '#ecc3ff'],
    '/arcade': ['ARCADE', t`Prove Yourself against Others`, '#ff9a9c', '#ff9292'],
    '/mirror': ['MIRROR', t`What Hero Would You Be?`, '#befffc', '#2da4cb'],
    '/blur': ['BLUR', t`Hua hua hua hua, TREMBLEEE`, '#2d94cb', '#131a2b'],

    } 

  const iconCss =  "text-5xl text-[#e8dca4] ms-auto absolute left-[5%]"

  return (
    <>
      <Link
        className={`py-7 border-2 group rounded-lg cursor-pointer border-[${linkMetadata[link][2]}]  hover:bg-[${linkMetadata[link][2]}] hover:border-[${linkMetadata[link][3]}] transition duration-500 bg-[#101010] shadow-lg shadow-black w-full`}
        to={link}
      >
        <div className="flex relative w-full justify-center items-center gap-2">
          <BsFillQuestionSquareFill className="text-5xl text-[#e8dca4] left-[10%] absolute" />
          <p className="text-center text-white text-xl">
            {linkMetadata[link][0]} <br />{" "}
            <span className="text-lg text-[#e8dca4] group-hover:text-white">{linkMetadata[link][1]}</span>
          </p>
        </div>
      </Link>
    </>
  );
}
