import { useMobileLegendsCharacters } from "../../providers/MobileLegendsCharactersProvider";
import { Chatroom, ChatroomMessage, ChatroomState, ChatroomUser, Prompt } from "../../API";
import ClassicGameView from "./games/view/ClassicGameView";
import LobbyView from "./games/view/LobbyView";


interface GameAreaInput {

    chatroom: Chatroom
    chatroomState : ChatroomState,
    chatroomUser: ChatroomUser,
    chatroomUsers: ChatroomUser[],
    chatroomMessages: ChatroomMessage[],
    prompt: Prompt,
    round: number
    
}

export default function GameArea(  {chatroom, chatroomState, chatroomUser, chatroomMessages, chatroomUsers, prompt, round} : GameAreaInput){


    const { data: characters, isLoading, error } = useMobileLegendsCharacters();
    

    return <div className="h-full w-full">

        {(chatroomState.currentState == "PLAYING") ? <ClassicGameView chatroomMessages={chatroomMessages} chatroomState={chatroomState} prompt={prompt} chatroomUser={chatroomUser} round={round}/> 
        : (chatroomState.currentState == "LOBBY") ? <LobbyView chatroomUsers={chatroomUsers} chatroomState={chatroomState}/>
        : (chatroomState.currentState == "INTERMISSION") ? 
        <div className="text-3xl my-auto flex flex-col h-full justify-center">
            
            <div>
            Answer is {characters[parseInt(prompt.mobileLegendsCharacterId)].name}
            </div>

            



        </div>
        : <div>Error </div>}



    </div>
}