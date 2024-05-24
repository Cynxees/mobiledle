import { BsFillQuestionSquareFill } from "react-icons/bs";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AiFillAlert } from "react-icons/ai";
import { TbBuildingCircus } from "react-icons/tb";
import { GiFog, GiMirrorMirror } from "react-icons/gi";

interface NavigationButtonProps {
    link: string
}

export default function NavigationButton({link}: NavigationButtonProps) {
  const { t } = useTranslation();

  const linkMetadata = {
    '/classic': ['CLASSIC', t`Get Clues On Every Try`, '#CB812D', '#e8dca4'],
    '/survival': ['SURVIVAL', t`How Long Will You Last?`, '#CEB4DD', '#ecc3ff'],
    '/arcade': ['ARCADE', t`Prove Yourself against Others`, '#ff9a9c', '#ff9292'],
    '/mirror': ['MIRROR', t`What Hero Would You Be?`, '#befffc', '#2da4cb'],
    '/blur': ['BLUR', t`Hue hue hue hue, TREMBLEEE`, '#2d94cb', '#131a2b'],

    } 

  const iconCss =  "text-4xl md:text-5xl text-["+ linkMetadata[link][3] +"] left-[10%] absolute"

  return (
    
    <Link
      className={`w-full py-4 md:h-full md:py-7 border-2 group rounded-lg cursor-pointer border-[${linkMetadata[link][2]}] 
      bg-[#101010]  hover:bg-[${linkMetadata[link][2]}] hover:border-[${linkMetadata[link][3]}] transition duration-500  shadow-lg shadow-black w-full`}
      to={link}
    >
      <div className="flex relative justify-center items-center">
        
        {(link == '/classic') ? <BsFillQuestionSquareFill className={iconCss} />
        : (link == '/survival') ? <AiFillAlert className={iconCss} /> 
        : (link == '/arcade') ? <TbBuildingCircus className={iconCss} />
        : (link == '/mirror') ? <GiMirrorMirror className={iconCss}/>
        : (link == '/blur') ? <GiFog className={iconCss} />
        : 'no link found'
      }
        
        
        
        <p className="text-center text-white md:text-xl flex flex-col">
          
          {linkMetadata[link][0]} {(link == '/arcade') ? <div className="text-orange-300 font-modesto animate-pulse">[MULTIPLAYER]</div> :'' }
          <span className="text-sm md:text-lg text-[#e8dca4] group-hover:text-white">{linkMetadata[link][1]}</span>
        </p>
      </div>
    </Link>
    
  );
}
