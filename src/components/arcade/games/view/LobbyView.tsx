import { useEffect, useState } from "react";
import { Chatroom, ChatroomState, ChatroomUser } from "../../../../API"
import { generateClient, post } from 'aws-amplify/api';
import { executeLaunchGame } from "../../../../graphql/mutations";
import { FaCrown } from "react-icons/fa6";

interface LobbyViewInput {

    chatroomState : ChatroomState,
    chatroomUsers: ChatroomUser[],
    chatroomUser: ChatroomUser,
    chatroom: Chatroom
    
}




export default function LobbyView({chatroomState, chatroomUsers, chatroom, chatroomUser}: LobbyViewInput){


    const client = generateClient()

    const handleClickStartGame = async () => {

        
        console.log('launch button click: ', chatroomState)

        const temp = client.graphql({
            query: executeLaunchGame,
            variables: {
                input: {
                    chatroomStateId: chatroomState.id
                }
            }
        }).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.error('launch button error: ',err)
        })

        
    }

    if(!chatroomUser) return <div>Loading..</div>

    return <div className="h-full w-full flex flex-col align-bottom">


        <div className="my-auto flex flex-row flex-wrap justify-center gap-5">
            {chatroomUsers.map(user => {

                if(user.activeState == 'INACTIVE' && user.id != chatroomUser.id) return

                return <div key={user.id} className={`py-5 px-14 relative border border-neutral-700 rounded-md bg-neutral-900 ` + (user.id == chatroomUser.id ? 'font-nova-bold text-orange-300':'') }>

                    {(user.userId == chatroom.hostId) ? 
                    <div className="absolute -top-2 left-0 -rotate-12 text-orange-300">
                        <FaCrown />
                    </div>
                    :''}
                    {user.user.username}

                </div>
            })}
            
        </div>

        {chatroomUser.userId == chatroom.hostId ? 
        
        <button className='w-52 align-bottom my-auto mb-[5%] border-1 border-white mx-auto' onClick={handleClickStartGame}>Start Game</button>
        
        
        :''}
        



    </div>



}