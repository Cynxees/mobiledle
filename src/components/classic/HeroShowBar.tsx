import { useTranslation } from "react-i18next";
import { MobileLegendsCharacter } from "../../API";

interface ClassicSearchBarProps {
  character: MobileLegendsCharacter;
  todayCharacter: MobileLegendsCharacter | undefined;
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

export default function HeroShowBar({
  character,
  todayCharacter,
}: ClassicSearchBarProps) {
  const { t } = useTranslation();


  if(!todayCharacter) return

  const characterLanes = character.lane.split('/')
  const todayCharacterLanes = todayCharacter.lane.split('/')
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
  const todayCharacterRoles = todayCharacter.role.split('/')
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

      
      <TraitBox trait={character.gender === "Male" ? t("Male") : t("Female")} state={character.gender === todayCharacter.gender ? 0 : 2} />
      
      <TraitBox trait={character.role?.replace("/", " , ")} state={roleIsCorrect?0:roleIsPartial? 1:2} />
      <TraitBox trait={character.lane?.replace("/", " , ")} state={laneIsCorrect?0:laneIsPartial? 1:2} />
      
      <TraitBox trait={t(`${character.region}`)} state={character.region === todayCharacter.region ? 0 : 2} />
      
      <TraitBox trait={character.year.toString()} state={character.year === todayCharacter.year ? 0 : 2} />

    </div>
  );
}
