import { StorageImage } from "@aws-amplify/ui-react-storage";
import { MobileLegendsHero } from "../../types/MobileLegendsHero";
import { Image } from "@aws-amplify/ui-react";
import CachedImage from "../../components/CachedImage";

interface ClassicIconProps {
    character: MobileLegendsHero;
}


export default function CharacterIcon({
    character,
}: ClassicIconProps){

    return(

        <div className="flex flex-col h-50">
            <CachedImage imgKey={character.imageKeys.icons[0]} className="max-w-[100px]" />
            <div>{character.name}</div>
        </div>

    )



}