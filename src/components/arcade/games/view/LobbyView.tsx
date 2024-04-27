import { useEffect, useState } from "react";
import { Chatroom, ChatroomState, ChatroomUser } from "../../../../API"
import { post } from 'aws-amplify/api';

interface LobbyViewInput {

    chatroomState : ChatroomState,
    chatroomUsers: ChatroomUser[]
    
}




export default function LobbyView({chatroomState, chatroomUsers}: LobbyViewInput){



    const handleClickStartGame = async () => {

        
        console.log('button click: ', chatroomState)

        const callAPI  = post({
            apiName: 'mobiledleapi',
            path: '/functions',
            options: {
                body: {
                    chatroomStateId: chatroomState.id
                }
            }
    
        })
        const {body} = await callAPI.response
        const response = await body.json();
        console.log('POST call succeeded');
        console.log(response);

        
    }

    

    return <div className="h-full w-full flex flex-col align-bottom">


        <div className="my-auto flex flex-row flex-wrap justify-center gap-5">
            {chatroomUsers.map(user => {
                return <div className="py-5 px-14 border border-neutral-700 rounded-md bg-white bg-opacity-5">

                    {user.user.username}

                </div>
            })}
            
        </div>

        <button className='w-52 align-bottom my-auto mb-[5%] border-1 border-white mx-auto' onClick={handleClickStartGame}>Start Game</button>
        



    </div>



}