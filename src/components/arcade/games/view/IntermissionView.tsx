import { useEffect, useState } from "react";
import { Chatroom, ChatroomState, ChatroomUser, MobileLegendsCharacter, Prompt } from "../../../../API"
import { generateClient, post } from 'aws-amplify/api';
import { executeLaunchGame } from "../../../../graphql/mutations";
import { FaCrown } from "react-icons/fa6";

interface IntermissionViewInput {

    prompt : Prompt,
    characters : MobileLegendsCharacter[]
    
}




export default function IntermissionView({prompt, characters}: IntermissionViewInput){

    

    if(!prompt || !characters) return <div>Loading...</div>

    return <div className="text-3xl my-auto flex flex-col h-full justify-center">
            
        <div>
        
            Answer is {characters[parseInt(prompt.mobileLegendsCharacterId)].name}

        </div>

        



    </div>



}