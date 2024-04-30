import { useMobileLegendsCharacters } from "../../providers/MobileLegendsCharactersProvider";
import { Chatroom, ChatroomMessage, ChatroomState, ChatroomUser, Prompt } from "../../API";
import ClassicGameView from "./games/view/ClassicGameView";
import LobbyView from "./games/view/LobbyView";
import { useEffect, useState } from "react";


interface GameAreaInput {

    chatroom: Chatroom
    chatroomState : ChatroomState,
    chatroomUser: ChatroomUser,
    chatroomUsers: ChatroomUser[],
    chatroomMessages: ChatroomMessage[],
    prompt: Prompt,
    setPrompt: React.Dispatch<React.SetStateAction<Prompt>>,
    round: number
    
}

export default function GameArea(  {chatroom, chatroomState, chatroomUser, chatroomMessages, chatroomUsers, prompt, setPrompt, round} : GameAreaInput){


    const { data: characters, isLoading, error } = useMobileLegendsCharacters();
    const [ promptBank, setPromptBank ] = useState<Prompt>();

    useEffect(() => {

        if(!chatroomState) return

        if(chatroomState.currentState == "INTERMISSION"){
            console.warn('Nulling prompt')
            setPrompt(null)
        }

    }, [chatroomState])

    useEffect(() => {

        if(prompt == null) return

        setPromptBank(prompt)

    }, [prompt])
    // if(!prompt) return <div>Loading...</div>

    return <div className="h-full w-full">

        {(chatroomState.mode == "CLASSIC") ? <ClassicGameView chatroomMessages={chatroomMessages} chatroomState={chatroomState} prompt={prompt} chatroomUser={chatroomUser} round={round}/> 
        : (chatroomState.currentState == "LOBBY") ? <LobbyView chatroomUsers={chatroomUsers} chatroomState={chatroomState} chatroom={chatroom} chatroomUser={chatroomUser}/>
        : (chatroomState.currentState == "INTERMISSION" && promptBank != null) ? 
        <div className="text-3xl my-auto flex flex-col h-full justify-center">
            
            <div>
            
            Answer is {characters[parseInt(promptBank.mobileLegendsCharacterId)].name}
            </div>

            



        </div>
        : <div>Error </div>}



    </div>
}