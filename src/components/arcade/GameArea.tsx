import { Chatroom, ChatroomState, ChatroomUser, Prompt } from "../../API";
import ClassicGameView from "./games/ClassicGameView";
import LobbyView from "./games/LobbyView";


interface GameAreaInput {

    chatroom: Chatroom
    chatroomState : ChatroomState,
    chatroomUser: ChatroomUser,
    prompt: Prompt
    
}

export default function GameArea(  {chatroom, chatroomState, chatroomUser, prompt} : GameAreaInput){


    

    return <div className="h-full w-full">

        {(chatroomState.currentState == "PLAYING") ? <ClassicGameView chatroomState={chatroomState} prompt={prompt} chatroomUser={chatroomUser}/> : <LobbyView chatroomState={chatroomState}/>}



    </div>
}