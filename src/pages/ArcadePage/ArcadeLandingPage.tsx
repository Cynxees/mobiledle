import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createUser, createChatroomUser , updateChatroom, updateChatroomUser, updateChatroomMessage, createChatroom, createChatroomMessage, updateUser } from '../../graphql/mutations';
import { onCreateChatroom, onDeleteChatroom } from '../../graphql/subscriptions';
import { Chatroom, ChatroomMessage } from '../../API';
import getTtlFromMinutes from '../../utils/getTtlFromMinutes';
import { listChatrooms, getChatroom } from '../../graphql/queries';
import RoomCard from '../../components/arcade/RoomCard';
import Navbar from '../../components/navigation/Navbar';
import { FiRefreshCw } from 'react-icons/fi';
import { useUser } from '../../providers/UserProvider';
import { useSpring } from 'react-spring';
import { Navigate, useNavigate } from 'react-router-dom';
import { BiSolidPencil } from 'react-icons/bi';
import CachedImage from '../../components/CachedImage';
import { useMobileLegendsCharacters } from '../../providers/MobileLegendsCharactersProvider';
import { TiTick } from 'react-icons/ti';
import { FaLock, FaShuffle, FaUnlock } from 'react-icons/fa6';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

const client = generateClient();

export default function ArcadeLandingPage() {

    const [username, setUsername] = useState('')
    const [showInputUsername, setShowInputUsername] = useState(false)
    const [willUpdateUser, setWillUpdateUser] = useState(false)
    const [roomIsPrivate, setRoomIsPrivate] = useState(false)

    const [profilePicture, setProfilePicture] = useState('0-0')
    const [profileIsHovered, setProfileHover] = useState(false)
    const [profileBank, setProfileBank] = useState<string[]>([])
    const [profileBankIndex, setProfileBankIndex] = useState(0)

    const [roomName, setRoomName] = useState('')
    const [roomCode, setRoomCode] = useState('')
    
    const [chatrooms, setChatrooms] = useState<Chatroom[]>([])
    const [filteredChatrooms, setFilteredChatrooms] = useState<Chatroom[]>([])
    
    const [isCreatingRoom, setIsCreatingRoom] = useState(false)
    const [isRefreshed, setRefresh] = useState(true)
    const [chatroomFetched, setChatroomFetched] = useState(false)
    const { data: user, isLoading: userIsLoading, error: userError, refetch } = useUser()
    const [init, setInit] = useState(false)

    const navigate = useNavigate()

    const lockAudio = new Audio('/audios/lock.mp3')
    const unlockAudio = new Audio('/audios/unlock.mp3')
    
    const { data: characters, isLoading, error } = useMobileLegendsCharacters();

    const [spinRotation, setSpinRotation] = useState(0)


    

    useEffect(() => {

        if(userIsLoading || !user || !characters) return

        if(!user.profilePicture){

            setWillUpdateUser(true)
            const id = Math.floor(Math.random()*characters.length)

            const pictureId = Math.floor(Math.random()*characters[id].imageKeys.icons.length)
            user.profilePicture = id + '-' + pictureId
            setProfilePicture(id+'-'+pictureId)
            setProfileBank((oldData) => {return [...oldData, id + '-' + pictureId]})

        }else{
            
            const picture = user.profilePicture
            setProfilePicture(user.profilePicture)
            setProfileBank((oldData) => {return [...oldData, picture]})
        }


    }, [userIsLoading, characters])

    useEffect(() => {

        if(init && isRefreshed) return

        console.log('fetching chatrooms...')
        client.graphql({
            query: listChatrooms,
            variables: {
                filter: {
                    type: {
                        eq: 'PUBLIC'
                    }
                }
            }

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

        const chatroomUsersFiltered = chatrooms.filter((chatroom) => chatroom.users.filter((user) => {
            return user.activeState != "BANNED" && user.state != "BANNED" && user.activeState != "INACTIVE"
        })).filter((chatroom) => {
            return chatroom.users.length < 0
        })

        setFilteredChatrooms(chatroomUsersFiltered.sort((a,b) => a.users.length > b.users.length ? -1 : 1 ))

        
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
                setChatrooms((currentChatroom) => currentChatroom.filter(chatroom => {(chatroom && data.onDeleteChatroom)?chatroom.id != data.onDeleteChatroom.id:''}))
                
            },error: error => console.error(error)})

        return sub
    }
    
    const filterChatrooms = (value : string) => {

        const prefix = value
        setFilteredChatrooms(chatrooms.filter(chat => chat.code.startsWith(prefix)))
    }
    
    const handleRoomNameInputChange = (e : React.FormEvent<HTMLInputElement>) => {
        
        if(e.currentTarget.value.length > 16) return

        setRoomName(e.currentTarget.value)
    }

    const handleRoomCodeInputChange = (event : React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value.toUpperCase()
        
        if(value.length > 4) return
        setRoomCode(value)
        
        filterChatrooms(value)
    
    }

    const handleCreateRoomClick = () => {
        
        if(isCreatingRoom) return
        console.log('creating room')
        setIsCreatingRoom(true)

        if(!user) return
        if(!user.id) return
        console.log('user: ', user)
        user.profilePicture = profilePicture
        if(willUpdateUser){

            client.graphql({
                query: updateUser,
                variables: {
                    input: {
                        id: user.id,
                        username: username,
                        profilePicture: profilePicture
                    }
                }
            }).then((data) => {
                console.log("changed pfp & username: ", data)
            })



        }


        const createRoomQL = client.graphql({
            query: createChatroom,
            variables: {
                input: {
                    name: roomName,
                    ttl: getTtlFromMinutes(10),
                    hostId: user.id,
                    type: roomIsPrivate ? 'PRIVATE': 'PUBLIC'
                }
            }
        }).then((result) => {


            setIsCreatingRoom(false)
            console.log('createRoom successful: ', result)
            navigate('/ARCADE/'+result.data.createChatroom.code)
            
            
        }).catch((error) => {
            
            console.error('createRoom unsuccessful: ', error)
        })

    }

    const handleChangeNameClick = () => {

        setShowInputUsername((old) => !old)


    }

    const handleUsernameInputChange = (e : React.FormEvent<HTMLInputElement>) => {

        if(e.currentTarget.value.length > 16) return

        setWillUpdateUser(true)
        setUsername(e.currentTarget.value)

    }

    const handleRefreshRoomClick = () => {
        setRefresh(false)
    }

    const handleProfileHover = () => {

        setProfileHover(true)

    }

    const handleProfileUnhover = () => {

        setProfileHover(false)

    }


    const handleNextClick = () => {

        const id = Math.floor(Math.random()*characters.length)

        const pictureId = Math.floor(Math.random()*characters[id].imageKeys.icons.length)

        let newProfilePicture = id + "-" + pictureId
        setWillUpdateUser(true)

        if(profileBankIndex+1 >= profileBank.length){

            setProfileBank((oldData) => {return [...oldData, newProfilePicture]})
            setProfilePicture(newProfilePicture)
        }else{
            newProfilePicture = profileBank[profileBankIndex+1]
            setProfilePicture(newProfilePicture)
        }

        
        setProfileBankIndex((old) => old+1)
    }

    const handlePrevClick = () => {

        const id = Math.floor(Math.random()*characters.length)

        const pictureId = Math.floor(Math.random()*characters[id].imageKeys.icons.length)

        if(profileBankIndex > 0){

            setProfilePicture(profileBank[profileBankIndex-1])
            setProfileBankIndex(old => old-1)


        }else{

            const id = Math.floor(Math.random()*characters.length)

            const pictureId = Math.floor(Math.random()*characters[id].imageKeys.icons.length)

            let newProfilePicture = id + "-" + pictureId

            setProfileBank((oldData) => {return [newProfilePicture, ...oldData]})
            setProfilePicture(newProfilePicture)
            setProfileBankIndex(0)


        }
          
    
    
    }

    const handleQuickStart = () => {

        let roomFound = false
        console.log(filteredChatrooms)

        if(filteredChatrooms.length <= 0){

            handleCreateRoomClick()

            return
        }

        
        filteredChatrooms.sort((a,b) => a.users.length > b.users.length? -1: 1 ).map((tempRoom) => {

            if(roomFound) return
            if(tempRoom.users.length < 8){

                roomFound = true
                navigate('/arcade/' + tempRoom.code)

            }




        })



    }
    


    if(!init || !characters || userIsLoading) return <div>Loading...</div>

    return(
        <div className='flex flex-col justify-center my-52 w-screen'>
            

            <img src="/images/arcade_background.png" alt="" className='-z-50 object-cover fixed blur brightness-[0.15] top-0 left-0 w-full h-full' />
            <Navbar />

            <div className='border-2 mx-auto border-orange-200 bg-black bg-opacity-35  rounded-lg'>

                <div className='flex flex-col gap-2 w-[80vw] py-10'>

                    <div className='flex align-middle justify-center gap-2 text-lg'>

                        {!showInputUsername?
                        
                        <div className='flex gap-2'>


                            {username} <BiSolidPencil className='cursor-pointer my-auto' onClick={handleChangeNameClick} />
                        </div>:

                        <div className='relative flex'>
                            <input className='text-center py-1 rounded-lg bg-white bg-opacity-5' onChange={handleUsernameInputChange} value={username} type="text" placeholder='Username'/>
                        </div>

                        
                        } 

                    </div>

                    <div className={`w-24 h-24 flex mx-auto mb-5 relative cursor-pointer`}  >
                        <IoMdArrowDropleft className='select-none text-[3rem] absolute left-0 -translate-x-[150%] -translate-y-[50%] top-1/2' onClick={handlePrevClick}/>
                        <FaShuffle className={`absolute left-1/2 top-1/2 text-[3rem] -translate-x-1/2 -translate-y-1/2 ${profileIsHovered ? 'opacity-70 animate-pulse': 'opacity-0'}`} />
                        <span onMouseLeave={handleProfileUnhover} onMouseOver={handleProfileHover} onClick={handleNextClick} >
                            {profilePicture ? <CachedImage className={`mx-auto select-none  ${profileIsHovered ? 'opacity-50': ''}`} imgKey={characters[profilePicture.split('-')[0]].imageKeys.icons[profilePicture.split('-')[1]]}/>
                            :'no pic'

                            }
                        </span>
                        <IoMdArrowDropright className='select-none text-[3rem] absolute right-0 translate-x-[150%] -translate-y-[50%] top-1/2' onClick={handleNextClick}/>
                    </div>
                
                    <div className='grid grid-cols-3 max-sm:px-4 lg:w-[300px] gap-4 mx-auto'>

                        <div className='relative col-span-2'>

                            <input className='rounded-lg w-full h-[53px] bg-neutral-900 ps-3'
                            onChange={handleRoomNameInputChange} value={roomName} type="text" placeholder='Room Name'
                            />

                            {!roomIsPrivate? <FaUnlock className='select-none absolute top-1/3 right-3 text-lg text-gray-400 cursor-pointer' onClick={() => {lockAudio.play();setRoomIsPrivate(true)}}  />
                            : <FaLock className='select-none absolute top-1/3 right-3 text-lg text-orange-300 cursor-pointer' onClick={() => {unlockAudio.play();setRoomIsPrivate(false)}}  />
                        
                            }

                        </div>

                        <button className='w-full bg-[#D6B485] rounded-lg p-0' onClick={handleCreateRoomClick}>
                            {isCreatingRoom ? 
                            <div role="status" className='w-full h-[53px] bg-neutral-900 rounded-lg align-middle flex items-center'>
                                <svg aria-hidden="true" className="h-8 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                            :
                            <span className='font-nova text-lg text-wrap text-shadow drop-shadow-[0_2px_1px_rgba(0,0,0,0.3)] shadow-black'>Create<br/>Room</span>
                            
                            }
                        </button>

                        <button className='col-span-3 bg-orange-400' onClick={handleQuickStart}>
                            <span className='font-nova-bold text-3xl text-wrap text-shadow drop-shadow-[0_7px_1px_rgba(0,0,0,0.15)] shadow-black'>QUICK START</span>
                        </button>

                    </div>

                </div>



            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-[80vw] mx-auto pt-10 gap-5 md:gap-10'>


                {filteredChatrooms.sort((a,b) => a.users.length > b.users.length ? -1 : 1 ).map(room => 

                <RoomCard key={room.code} room={room} username={username} profilePicture={profilePicture} client={client} joinable={!isCreatingRoom}  user={(user)? user : null} usernameChanged={willUpdateUser} />
                    
                )}
                {filteredChatrooms.map(room => 

                <RoomCard key={room.code} room={room} username={username} profilePicture={profilePicture} client={client} joinable={!isCreatingRoom}  user={(user)? user : null} usernameChanged={willUpdateUser} />

                )}
                {filteredChatrooms.map(room => 

                <RoomCard key={room.code} room={room} username={username} profilePicture={profilePicture} client={client} joinable={!isCreatingRoom}  user={(user)? user : null} usernameChanged={willUpdateUser} />

                )}
                {filteredChatrooms.map(room => 

                <RoomCard key={room.code} room={room} username={username} profilePicture={profilePicture} client={client} joinable={!isCreatingRoom}  user={(user)? user : null} usernameChanged={willUpdateUser} />

                )}
                {filteredChatrooms.map(room => 

                <RoomCard key={room.code} room={room} username={username} profilePicture={profilePicture} client={client} joinable={!isCreatingRoom}  user={(user)? user : null} usernameChanged={willUpdateUser} />

                )}
                {filteredChatrooms.map(room => 

                <RoomCard key={room.code} room={room} username={username} profilePicture={profilePicture} client={client} joinable={!isCreatingRoom}  user={(user)? user : null} usernameChanged={willUpdateUser} />

                )}
            </div>


        </div>
    )


}