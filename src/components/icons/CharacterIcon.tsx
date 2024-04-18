import { MobileLegendsCharacter } from "../../API";

interface ClassicIconProps {
    character: MobileLegendsCharacter;
}


export default function CharacterIcon({
    character,
}: ClassicIconProps){

    return(

        <div className="flex flex-col h-50">
            <img src={character.imageUrl} alt="" className="max-w-[100px]" onError={({ currentTarget }) => {
                    currentTarget.src="/noPicture.png";
                    currentTarget.onerror = null
                }}/>
            <div>{character.name}</div>
        </div>

    )



}