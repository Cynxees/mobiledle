import { useTranslation } from "react-i18next";
import { MobileLegendsHero } from "../../types/MobileLegendsHero";
import CachedImage from "../../components/CachedImage";

interface HeroShowBar {
  character: MobileLegendsHero;
  answer: MobileLegendsHero;
  showBooleans?: boolean[]
  isClassic?: boolean
}

interface TraitBoxProps {
  trait: string,
  state: number,
}

function TraitBox({trait, state}: TraitBoxProps){


  const wrongColor = "bg-red-900"
  const partialColor = "bg-orange-700"
  const correctColor = "bg-green-700"

  return <div
  className={`text-shadow shadow-gray-700 md:w-28 md:h-28 xs:w-14 xs:h-14 w-12 h-12 text-[0.6rem] xs:text-xs md:text-lg  border-neutral-300 border-2 overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight animate__delay-1s bg-[url('/agelta.jpg')] bg-blend-darken ${
      state == 0 ? correctColor
        : state == 1 ? partialColor
        : wrongColor 
    } `}
  >

  {trait}


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

export default function HeroShowBar({
  character,
  answer,
  showBooleans,
  isClassic=true
}: HeroShowBar) {
  const { t } = useTranslation();


  if(!answer) return

  const elements = 6 
  

  return (
    <div className={`flex ${isClassic? 'flex-row':'flex-col'} gap-1 md:gap-2 z-0 font-nova-bold text-shadow-lg w-full`}>
      
      <div>

        <div className="absolute md:w-28 md:h-28 xs:w-14 xs:h-14 w-12 h-12 overflow-hidden animate__animated animate__zoomInRight">
        <CachedImage className={`absolute z-0 w-52 h-52 object-fill opacity-80 top-0 -translate-y-1/4 blur-[9px]`} imgKey={character.imageKeys.icons[0]} /> 
        </div>

        
        <div className="py-4 md:w-28 md:h-28 xs:w-14 xs:h-14 w-12 h-12 border-2 border-white overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight">
        
          <CachedImage className="z-10" imgKey={character.imageKeys.icons[0]} /> 
        </div>

        

      </div>

        {isClassic ? 

        <div className="flex gap-2">
        <TraitBox trait={character.gender === "Male" ? t("Male") : t("Female")} state={character.gender === answer.gender ? 0 : 2} />
        <TraitBox trait={character.role?.replace("/", " , ")} state={compareTrait(character.role, answer.role)} />
        <TraitBox trait={character.lane?.replace("/", " , ")} state={compareTrait(character.lane, answer.lane)} />
        
        <TraitBox trait={t(`${character.region}`)} state={compareTrait(character.region, answer.region)} />
        
        <TraitBox trait={character.year.toString()} state={compareTrait(character.year.toString(), answer.year.toString())} />
      </div>
      
      
      :
      
      
      <div className="text-[0.55rem] xs:text-xs md:text-lg">{character.name}</div>}
      
      {/* <TraitBox trait={character.rangeType.toString()} state={compareTrait(character.rangeType, answer.rangeType)} />
      <TraitBox trait={character.resource.toString()} state={compareTrait(character.resource, answer.resource)} />
      <TraitBox trait={character.species.toString()} state={compareTrait(character.species, answer.species)} />
      <TraitBox trait={character.specialty.toString()} state={compareTrait(character.specialty, answer.specialty)} />
      <TraitBox trait={character.damageType.toString()} state={compareTrait(character.damageType, answer.damageType)} /> */}

    </div>
  );
}
