import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createUser, createChatroomUser , updateChatroom, updateChatroomUser, updateChatroomMessage, createChatroom, createChatroomMessage, updateUser } from '../../graphql/mutations';
import { onCreateChatroom, onUpdateChatroom, onDeleteChatroom } from '../../graphql/subscriptions';
import { Chatroom, ChatroomMessage } from '../../API';
import getTtlFromMinutes from '../../utils/getTtlFromMinutes';
import { listChatrooms, getChatroom } from '../../graphql/queries';
import RoomCard from '../../components/arcade/RoomCard';
import Navbar from '../../components/navigation/Navbar';
import { FiRefreshCw } from 'react-icons/fi';
import { useUser } from '../../providers/UserProvider';

const client = generateClient();

export default function ArcadeLandingPage() {

    const [username, setUsername] = useState('')
    const [usernameChanged, setUsernameChanged] = useState(false)
    

    const [roomName, setRoomName] = useState('')
    const [roomCode, setRoomCode] = useState('')
    
    const [chatrooms, setChatrooms] = useState<Chatroom[]>([])
    const [filteredChatrooms, setFilteredChatrooms] = useState<Chatroom[]>([])
    
    const [isRefreshed, setRefresh] = useState(true)
    const [chatroomFetched, setChatroomFetched] = useState(false)
    const { data: user, isLoading: userIsLoading, error: userError, refetch } = useUser()
    const [init, setInit] = useState(false)
    
    

    useEffect(() => {

        if(init && isRefreshed) return

        console.log('fetching chatrooms...')
        client.graphql({
            query: listChatrooms

        }).then(data => {
            console.log('chatrooms fetched: ', data)
            setChatrooms(data.data.listChatrooms.items)


            setChatroomFetched(true)
            setRefresh(true)
        })


    }, [isRefreshed])

    useEffect(()=> {

        refetch().then( (data) => {
            if(!data.data) return
            setUsername(data.data.username)
        })
            
        if(!userIsLoading) setUsername(user ? user.username : username)

    }, [userIsLoading])

    useEffect(() => {
        
        if(!init) return;

        
        const createChatroomSub = onCreateChatroomSubscription()
        const deleteChatroomSub = onDeleteChatroomSubscription()

        return(() => {
            console.log('unsubscribing from create/delete chatrooms...')
            createChatroomSub.unsubscribe()
            deleteChatroomSub.unsubscribe()
        })

    }, [init])

    useEffect(() => {

        if(!chatroomFetched || !isRefreshed) return

        setFilteredChatrooms(chatrooms.sort((a,b) => a.users.length > b.users.length ? -1 : 1 ))
        setInit(true)

    }, [isRefreshed, chatroomFetched])

    useEffect(() => {

        filterChatrooms(roomCode)

    }, [chatrooms])


    const onCreateChatroomSubscription = () => {
        
        console.log('subscribing to oncreate chatroom')
        const sub = client.graphql({
            query: onCreateChatroom
        }).subscribe({
            next: ({data}) => {
                
                console.log('got chats: ', data)
                setChatrooms((currentChatroom) => [...currentChatroom, data.onCreateChatroom])
                
            },error: error => console.error(error)})

        return sub
    }

    const onDeleteChatroomSubscription = () => {
        
        console.log('subscribing to ondelete chatroom')
        const sub = client.graphql({
            query: onDeleteChatroom

        }).subscribe({
            next: ({data}) => {
                
                console.log('got chats: ', data)
                setChatrooms((currentChatroom) => currentChatroom.filter(chatroom => chatroom.id != data.onDeleteChatroom.id))
                
            },error: error => console.error(error)})

        return sub
    }
    
    const filterChatrooms = (value : string) => {

        const prefix = value
        setFilteredChatrooms(chatrooms.filter(chat => chat.code.startsWith(prefix)))
    }
    
    const handleRoomNameInputChange = (event : React.FormEvent<HTMLInputElement>) => {
        
        setRoomName(event.currentTarget.value)
    
    }

    const handleRoomCodeInputChange = (event : React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value.toUpperCase()
        
        if(value.length > 4) return
        setRoomCode(value)
        
        filterChatrooms(value)
    
    }

    const handleCreateRoomClick = () => {
        
        console.log('creating room')
        const createRoomQL = client.graphql({
            query: createChatroom,
            variables: {
                input: {
                    name: roomName,
                    ttl: getTtlFromMinutes(10)
                }
            }
        }).then((result) => {

            console.log('createRoom successful: ', result)
            
        }).catch((error) => {
            
            console.error('createRoom unsuccessful: ', error)
        })

    }

    const handleUsernameInputChange = (e : React.FormEvent<HTMLInputElement>) => {

        if(e.currentTarget.value.length > 16) return

        setUsernameChanged(true)
        setUsername(e.currentTarget.value)
        console.log('username: ',username)

    }


    const handleRefreshRoomClick = () => {
        setRefresh(false)
    }

    if(!init) return <div>Loading...</div>

    return(
        <div className='flex flex-col justify-center'>
            
            <div className=''>

            <Navbar />
            </div>
            <div className='mt-10'>

                <input className='p-2 rounded-lg mb-5' onChange={handleUsernameInputChange} value={username} type="text" placeholder='Room Name'/>
                
                <div className='flex flex-row gap-2'>
                    <input className='p-2 rounded-lg' onChange={handleRoomNameInputChange} value={roomName} type="text" placeholder='Room Name'/>
                    <button className='w-full' onClick={handleCreateRoomClick}>Create Room</button>
                </div>
                <h2 className='my-5 '>or</h2>
                <div className='flex flex-row gap-2 w-full justify-between'>
                    
                    <input className='p-2 w-full rounded-lg' onChange={handleRoomCodeInputChange} value={roomCode} type="text" placeholder='Find Room'/>
                    
                    <button className='bg-orange-700' onClick={handleRefreshRoomClick}><FiRefreshCw /></button>
                </div>
            </div>

            <div className='mx-auto mt-10'>
                {filteredChatrooms.map(room => 
                
                <RoomCard key={room.code} room={room} username={username} client={client}  user={(user)? user : null} usernameChanged={usernameChanged} />
            )}
            </div>

        </div>
    )


}