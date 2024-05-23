import { useEffect, useState } from "react";
import { Chatroom, ChatroomState, ChatroomUser, MobileLegendsCharacter, Prompt } from "../../../../API"
import { generateClient, post } from 'aws-amplify/api';
import { executeLaunchGame } from "../../../../graphql/mutations";
import { FaCrown } from "react-icons/fa6";
import { MobileLegendsHero } from "../../../../types/MobileLegendsHero";
import CachedImage from "../../../../components/CachedImage";

interface IntermissionViewInput {

    prompt : Prompt,
    characters : MobileLegendsHero[]
    
}

const imgStyle: React.CSSProperties = {
    width: '80%',
    cursor: 'pointer',
    // transition: 'transform 0.3s ease',
    top: '19%',
  };

const enlargedImgStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    zIndex: 1000,
    cursor: 'zoom-out',
  };

export default function IntermissionView({prompt, characters}: IntermissionViewInput){

    const audio = new Audio('/audios/end_game.mp3')

    useEffect(() => {

        audio.play()

    }, [])

    const [isImageEnlarged, setIsImageEnlarged] = useState(false);

    const handleImageClick = () => {
        setIsImageEnlarged(!isImageEnlarged);
    };
    

    if(!prompt || !characters) return <div>Loading...</div>


    return <div className="text-3xl my-auto flex flex-col h-full justify-center">
        <div className="relative flex-col flex">
            <div className="w-full text-center">
                Answer is {characters[parseInt(prompt.mobileLegendsCharacterId)].name}
            </div>
            <div onClick={handleImageClick} className ="mx-auto justify-center flex">
            <CachedImage
                className={isImageEnlarged ? 'enlarged' : ''}
                imgKey= {characters[parseInt(prompt.mobileLegendsCharacterId)].imageKeys.banners[0]}
                style={isImageEnlarged ? enlargedImgStyle : imgStyle}
            />
            </div>

            {isImageEnlarged && <div className="overlay" onClick={handleImageClick}></div>}    
        </div>

    </div>



}