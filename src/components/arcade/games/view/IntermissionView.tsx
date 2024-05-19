import { useEffect, useState } from "react";
import { Chatroom, ChatroomState, ChatroomUser, MobileLegendsCharacter, Prompt } from "../../../../API"
import { generateClient, post } from 'aws-amplify/api';
import { executeLaunchGame } from "../../../../graphql/mutations";
import { FaCrown } from "react-icons/fa6";
import { MobileLegendsHero } from "../../../../types/MobileLegendsHero";

interface IntermissionViewInput {

    prompt : Prompt,
    characters : MobileLegendsHero[]
    
}




export default function IntermissionView({prompt, characters}: IntermissionViewInput){

    const audio = new Audio('/audios/end_game.mp3')

    useEffect(() => {


        audio.play()

    }, [])
    

    if(!prompt || !characters) return <div>Loading...</div>

    return <div className="text-3xl my-auto flex flex-col h-full justify-center">
            
        <div>
        
            Answer is {characters[parseInt(prompt.mobileLegendsCharacterId)].name}

        </div>

        



    </div>



}