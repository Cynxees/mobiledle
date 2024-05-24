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
    const [isCreatingRoom, setIsCreatingRoom] = useState(false)

    const handleClickStartGame = async () => {

        if(isCreatingRoom)return
        setIsCreatingRoom(true)
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
            setIsCreatingRoom(false)
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
        
        <button className='w-52 align-bottom my-auto mb-[5%] border-1 border-white mx-auto' onClick={handleClickStartGame}>
            {isCreatingRoom ? 
            <div role="status" className='w-full h-[30px] bg-neutral-900 rounded-lg align-middle flex items-center'>
                <svg aria-hidden="true" className="h-8 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            :
            <div className='font-nova h-[30px]  text-lg text-wrap text-shadow drop-shadow-[0_2px_1px_rgba(0,0,0,0.3)] shadow-black'>Start Game</div>
            
            }
        </button>
        
        :''}
        



    </div>



}