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


    

    return <div className="h-full w-full">

        {(chatroomState.currentState == "PLAYING") ? <ClassicGameView chatroomMessages={chatroomMessages} chatroomState={chatroomState} prompt={prompt} chatroomUser={chatroomUser} round={round}/> : <LobbyView chatroomUsers={chatroomUsers} chatroomState={chatroomState}/>}



    </div>
}