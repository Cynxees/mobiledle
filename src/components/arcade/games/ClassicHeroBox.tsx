import { useTranslation } from "react-i18next";
import { MobileLegendsCharacter } from "../../../API";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

interface ClassicHeroBox {
  character: MobileLegendsCharacter;
  answer: MobileLegendsCharacter | undefined;
  showBooleans?: boolean[]
}

interface TraitBoxProps {
  trait: string,
  state: number,
  isYear?: boolean,
  answerYear?: string
}

function TraitBox({trait, state, isYear = false, answerYear='0'}: TraitBoxProps){


  const wrongColor = "bg-red-900 text-shadow shadow-gray-700 w-28 h-28"
  const partialColor = "bg-orange-700 text-shadow shadow-gray-700 w-28 h-28"
  const correctColor = "bg-green-700 text-shadow shadow-gray-700 w-28 h-28"


  return <div
  className={`py-4  border-neutral-300 border-2 overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight animate__delay-1s bg-[url('/agelta.jpg')] bg-blend-darken ${
      state == 0 ? correctColor
        : state == 1 ? partialColor
        : wrongColor 
    } `}
  >

  {(!isYear)? trait : 
  
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
    <div className="flex gap-2 z-0 font-nova-bold text-shadow-lg relative">
      

      <div className="absolute w-28 h-28 overflow-hidden animate__animated animate__zoomInRight">
      <img className="absolute z-0 w-52 h-52 object-fill opacity-80 top-0 -translate-y-1/4 blur-[9px]" src={character.imageUrl[0] || undefined} alt="" onError={({ currentTarget }) => {
                    currentTarget.src="/noPicture.png";
                    currentTarget.onerror = null
              }}/>
      </div>

      
      <div className="py-4 w-28 h-28 border-2 border-white overflow-hidden flex justify-center items-center animate__animated animate__zoomInRight">
      
        <img className="z-10" src={character.imageUrl[0] || undefined} alt="" onError={({ currentTarget }) => {
                    currentTarget.src="/noPicture.png";
                    currentTarget.onerror = null
                }}/>
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
