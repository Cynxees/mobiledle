import { MobileLegendsCharacter } from "../../API";

interface ClassicIconProps {
    character: MobileLegendsCharacter;
}


export default function CharacterIcon({
    character
}: ClassicIconProps){

    return(

        <div className="flex flex-col w-24">
            <img src={character.imageUrl} alt="" className="max-w-[100px]"/>
            <div>{character.name}</div>
        </div>

    )



}