import { Chatroom, ChatroomMessage, ChatroomState, ChatroomUser, Prompt } from "../../API";
import ClassicGameView from "./games/view/ClassicGameView";
import LobbyView from "./games/view/LobbyView";
import { useEffect, useRef, useState } from "react";
import IntermissionView from "./games/view/IntermissionView";
import BlurGameView from "./games/view/BlurGameView";
import { MobileLegendsHero } from "../../types/MobileLegendsHero";


interface GameAreaInput {

    chatroom: Chatroom
    chatroomState : ChatroomState,
    chatroomUser: ChatroomUser,
    chatroomUsers: ChatroomUser[],
    chatroomMessages: ChatroomMessage[],
    prompt: Prompt,
    setPrompt: React.Dispatch<React.SetStateAction<Prompt>>,
    round: number,
    characters: MobileLegendsHero[],
    timer: number
    
}

export default function GameArea(  {chatroom, chatroomState, chatroomUser, chatroomMessages, chatroomUsers, prompt, setPrompt, round, characters, timer} : GameAreaInput){


    const [ promptBank, setPromptBank ] = useState<Prompt>();

    const tickingClockAudioRef = useRef(new Audio('/audios/ticking_clock.mp3'))
    const startGameAudio = new Audio('/audios/start_game.mp3')




    useEffect(() => {

        if(!chatroomState) return

        if(chatroomState.currentState == "INTERMISSION"){
            console.log('Nulling prompt')
            setPrompt(null)
        }else if(chatroomState.currentState != "INTERMISSION" && chatroomState.currentState != "LOBBY" && chatroomState.currentState != null){
            startGameAudio.play()
        }

    }, [chatroomState.currentState])

    useEffect(() => {

        if(prompt == null) return

        setPromptBank(prompt)

    }, [prompt])


    useEffect(() => {
        const tickingClockAudio = tickingClockAudioRef.current;

        if (timer < 5000 && chatroomState.currentState !== "LOBBY" && chatroomState.currentState !== "INTERMISSION") {
            
            tickingClockAudio.play()
        } else{
            tickingClockAudio.pause();
            tickingClockAudio.currentTime = 0;
        }

    }, [timer, chatroomState.currentState]);

    return <div className="h-full w-full overflow-hidden">

        {(chatroomState.mode == "CLASSIC") ? <ClassicGameView chatroomMessages={chatroomMessages} chatroomState={chatroomState} prompt={prompt} chatroomUser={chatroomUser} round={round}/> 
        : (chatroomState.mode == "BLUR") ? <BlurGameView timer={timer} chatroomMessages={chatroomMessages} chatroomState={chatroomState} prompt={prompt} chatroomUser={chatroomUser} round={round}/> 
        : (chatroomState.currentState == "LOBBY") ? <LobbyView chatroomUsers={chatroomUsers} chatroomState={chatroomState} chatroom={chatroom} chatroomUser={chatroomUser}/>
        : (chatroomState.currentState == "INTERMISSION" && promptBank != null) ? <IntermissionView characters={characters} prompt={promptBank} />
        : <div>Loading... </div>}



    </div>
}