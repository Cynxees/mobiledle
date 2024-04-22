import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createUser, createChatroomUser , updateChatroom, updateChatroomUser, updateChatroomMessage, createChatroom, createChatroomMessage } from '../../graphql/mutations';
import { onCreateChatroom, onCreateChatroomMessage, onUpdateChatroom } from '../../graphql/subscriptions';
import { Chatroom, ChatroomMessage } from '../../API';
import getTtlFromMinutes from '../../components/utils/getTtlFromMinutes';
import { listChatrooms, getChatroom } from '../../graphql/queries';

export default function ArcadeLandingPage() {

    const [roomName, setRoomName] = useState('')
    const [roomCode, setRoomCode] = useState('')
    
    const [chatrooms, setChatrooms] = useState<Chatroom[]>([])
    
    const [init, setInit] = useState('')

    
    const handleRoomNameInputChange = (roomNameInput : React.FormEvent<HTMLInputElement>) => {
        setRoomName(roomNameInput.currentTarget.value)
    }

    const handleCreateRoomClick = () => {
        
    }

    return(
        <div className=''>
            
            <div>
                
                <div className='flex flex-row gap-2'>
                    <input className='p-2 rounded-lg' onChange={handleRoomNameInputChange} value={roomName} type="text" placeholder='Room Name'/>
                    <button className='' onClick={handleCreateRoomClick}>Create Room</button>
                </div>
            </div>


        </div>
    )


}