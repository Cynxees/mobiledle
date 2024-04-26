import { useTranslation } from "react-i18next";
import { MobileLegendsCharacter } from "../../../API";

interface ClassicHeroBox {
  character: MobileLegendsCharacter;
  answer: MobileLegendsCharacter | undefined;
  showBooleans?: boolean[]
}

interface TraitBoxProps {
  trait: string,
  state: number,
}

function TraitBox({trait, state}: TraitBoxProps){


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

  {trait}


</div>

}

export default function ClassicHeroBox({
  character,
  answer,
  showBooleans
}: ClassicHeroBox) {
  const { t } = useTranslation();


  if(!answer) return

  const characterLanes = character.lane.split('/')
  const todayCharacterLanes = answer.lane.split('/')
  let laneIsPartial = false
  let laneIsCorrect = false

  characterLanes.forEach(lane => {
    
    var temp = false

    todayCharacterLanes.forEach(todayLane => {

      if(lane == todayLane){

        laneIsPartial = true
        temp = true
        
      }else{
        
      }

    })


    if(temp) laneIsCorrect = true

  })

  if(characterLanes.length != todayCharacterLanes.length) laneIsCorrect = false
  
  const characterRoles = character.role.split('/')
  const todayCharacterRoles = answer.role.split('/')
  let roleIsPartial = false
  let roleIsCorrect = false

  characterRoles.forEach(role => {
    
    var temp = false

    todayCharacterRoles.forEach(todayRole => {

      if(role == todayRole){

        roleIsPartial = true
        temp = true
        
      }else{
        
      }

    })


    if(temp) roleIsCorrect = true

  })

  if(characterRoles.length != todayCharacterLanes.length) roleIsCorrect = false

  
  

  return (
    <div className="flex gap-2 z-0 font-nova-bold text-shadow-lg h-full w-full">
      

      
      <TraitBox trait={character.gender === "Male" ? t("Male") : t("Female")} state={character.gender === answer.gender ? 0 : 2} />
      
      <TraitBox trait={character.role?.replace("/", " , ")} state={roleIsCorrect?0:roleIsPartial? 1:2} />
      <TraitBox trait={character.lane?.replace("/", " , ")} state={laneIsCorrect?0:laneIsPartial? 1:2} />
      
      <TraitBox trait={t(`${character.region}`)} state={character.region === answer.region ? 0 : 2} />
      
      <TraitBox trait={character.year.toString()} state={character.year === answer.year ? 0 : 2} />
      <TraitBox trait={character.alias.toString()} state={character.year === answer.year ? 0 : 2} />
      <TraitBox trait={character.rangeType.toString()} state={character.year === answer.year ? 0 : 2} />
      <TraitBox trait={character.resource.toString()} state={character.year === answer.year ? 0 : 2} />
      <TraitBox trait={character.species.toString()} state={character.year === answer.year ? 0 : 2} />
      <TraitBox trait={character.specialty.toString()} state={character.year === answer.year ? 0 : 2} />

    </div>
  );
}
