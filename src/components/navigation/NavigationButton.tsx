import { BsFillQuestionSquareFill } from "react-icons/bs";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AiFillAlert } from "react-icons/ai";
import { TbBuildingCircus } from "react-icons/tb";
import { GiFog, GiMirrorMirror } from "react-icons/gi";
import { useState } from "react";
import { IoDiscOutline, IoIdCardOutline } from "react-icons/io5";

interface NavigationButtonProps {
    link: string
}

export default function NavigationButton({link}: NavigationButtonProps) {
  const { t } = useTranslation();

  const linkMetadata = {
    classic: ['CLASSIC', t`Get Clues On Every Try`, '#9c6323', '#e8dca4'],
    survival: ['SURVIVAL', t`How Long Will You Last?`, '#744092', '#ecc3ff'],
    arcade: ['ARCADE', t`Prove Yourself against Others`, '#85191b', '#ff9292'],
    mirror: ['MIRROR', t`What Hero Would You Be?`, '#5aaabf', '#b1d6ff'],
    blur: ['BLUR', t`Who is that Hero?`, '#193d85', '#131a2b'],
    disco: ['DISCO', t`Whose Skill is That?`, '#173908', '#c2ffa8']

  } 

  const baseStyle = {
    backgroundColor: '#101010',
    borderColor: linkMetadata[link][2],
  };

  const hoverStyle = {
    backgroundColor: linkMetadata[link][2],
    borderColor: linkMetadata[link][3],
  };


  const iconCss =  "text-4xl md:text-5xl text-["+ linkMetadata[link][3]+"] left-[10%] absolute"

  return (
    
    <Link
      to={'/'+link}
      className={`w-full py-4 md:h-full md:py-7 border-2 group rounded-lg cursor-pointer transition duration-500 shadow-lg shadow-black`}
      style={baseStyle}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = baseStyle.backgroundColor}
    >
      <div className="flex relative justify-center items-center">
        
        {(link == 'classic') ? <BsFillQuestionSquareFill className={iconCss} />
        : (link == 'survival') ? <AiFillAlert className={iconCss} /> 
        : (link == 'arcade') ? <TbBuildingCircus className={iconCss} />
        : (link == 'mirror') ? <GiMirrorMirror className={iconCss + ' text-cyan-200'}/>
        : (link == 'blur') ? <IoIdCardOutline className={iconCss + ' text-blue-300'} />
        : (link == 'disco') ? <IoDiscOutline className={iconCss + ' text-lime-200'} />
        : 'no link found'
      }
        
        
        
        <div className="text-center text-white md:text-xl flex flex-col">
          
          <div className="flex justify-center">
              {linkMetadata[link][0]} 
              {(link == 'mirror') ? <div className="text-cyan-100 font-modesto animate-pulse ms-1">[BETA]</div> :'' }


          </div>
          {(link == 'arcade') ? <div className="text-orange-300 font-modesto animate-pulse">[MULTIPLAYER]</div> :'' }
          <span className="text-sm md:text-lg text-[#e8dca4] group-hover:text-white">{linkMetadata[link][1]}</span>
        </div>
      </div>
    </Link>
    
  );
}
