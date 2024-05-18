import { useTranslation } from "react-i18next";
import { MobileLegendsHero } from "../../../types/MobileLegendsHero";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import CachedImage from "../../../components/CachedImage";

interface ClassicHeroBox {
  character: MobileLegendsHero;
  answer: MobileLegendsHero | undefined;
  showBooleans?: boolean[]
}

interface TraitBoxProps {
  trait: string,
  state: number,
  isYear?: boolean,
  answerYear?: string
}

function TraitBox({trait, state, isYear = false, answerYear='0'}: TraitBoxProps){


  const wrongColor = "bg-red-900"
  const partialColor = "bg-orange-700"
  const correctColor = "bg-green-700"


  return <div
  className={`break-normal text-shadow shadow-gray-700 
  w-[8vw] h-[8vw] lg:w-[4.5vw] lg:h-[4.5vw] aspect-square 
  text-[0.3rem] xs:text-[0.4rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-[0.7rem] 2xl:text-[1rem] 
  border-neutral-300 border-2 overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight animate__delay-1s bg-[url('/images/agelta.jpg')] bg-blend-darken ${
      state == 0 ? correctColor
        : state == 1 ? partialColor
        : wrongColor 
    } `}
  >

  {(!isYear)? trait.replace('/', '/ ') : 
  
    <div className="flex flex-row align-middle">
      {trait}
      {answerYear > trait ? 
      <FaAngleUp className="my-auto" />
      :
      answerYear < trait ?
      <FaAngleDown className={`my-auto` } />
      :
      ''
      }
    
      </div>
  
  }



</div>

}


const compareTrait = (trait: string, trait2: string): number => {

  const traits = trait.split('/')
  const traits2 = trait2.split('/')

  const check = traits.every((data) => traits2.includes(data))
  const check2 = traits2.every((data) => traits.includes(data))
  
  if(check && check2){
    return 0
  } else if(check || check2){
    return 1
  }



  return 2


}

export default function ClassicHeroBox({
  character,
  answer,
  showBooleans
}: ClassicHeroBox) {
  const { t } = useTranslation();


  if(!answer) return

  

  return (
    <div className="flex gap-[2px] lg:gap-2 z-0 font-nova-bold text-shadow-lg relative">
      
      <div className="w-[8vw] h-[8vw] lg:w-[4.5vw] lg:h-[4.5vw] text-[0.6rem] xs:text-xs md:text-lg relative">

        <div className="absolute w-full h-full overflow-hidden animate__animated animate__zoomInRight">
        <CachedImage className="absolute z-0 w-[200%] h-[200%] object-fill opacity-80 top-0 -translate-y-1/4 blur-[9px]" imgKey={character.imageKeys.icons[0]} />
        </div>

        
        <div className="w-[8vw] h-[8vw] lg:w-[4.5vw] lg:h-[4.5vw] border lg:border-2 border-white overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight">
        
          <CachedImage className="z-10" imgKey={character.imageKeys.icons[0]} />
        </div>
      </div>
      <TraitBox trait={character.gender === "Male" ? t("Male") : t("Female")} state={character.gender === answer.gender ? 0 : 2} />
      
      <TraitBox trait={character.role?.replace("/", " , ")} state={compareTrait(character.role, answer.role)} />
      <TraitBox trait={character.lane?.replace("/", " , ")} state={compareTrait(character.lane, answer.lane)} />
      
      <TraitBox trait={t(`${character.region}`)} state={compareTrait(character.region, answer.region)} />
      
      <TraitBox trait={character.year.toString()} state={compareTrait(character.year.toString(), answer.year.toString())} isYear={true} answerYear={answer.year.toString()} />
      <TraitBox trait={character.rangeType.toString()} state={compareTrait(character.rangeType, answer.rangeType)} />
      <TraitBox trait={character.resource.toString()} state={compareTrait(character.resource, answer.resource)} />
      <TraitBox trait={character.species.toString()} state={compareTrait(character.species, answer.species)} />
      <TraitBox trait={character.specialty.toString()} state={compareTrait(character.specialty, answer.specialty)} />
      <TraitBox trait={character.damageType.toString()} state={compareTrait(character.damageType, answer.damageType)} />

    </div>
  );
}
