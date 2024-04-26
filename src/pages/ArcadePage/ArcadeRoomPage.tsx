import React, { FormEventHandler, useEffect, useState } from 'react';
import { generateClient, post } from 'aws-amplify/api';
import { createUser, createChatroomUser , updateChatroom, updateChatroomUser, updateChatroomMessage, createChatroom, createChatroomMessage } from '../../graphql/mutations';
import { onCreateChatroom, onCreateChatroomMessage, onUpdateChatroom, onUpdateChatroomState } from '../../graphql/subscriptions';
import { Chatroom, ChatroomMessage, ChatroomUser, ChatroomState, Prompt, MobileLegendsCharacter } from '../../API';
import getTtlFromMinutes from '../../utils/getTtlFromMinutes';
import { listChatrooms, getChatroom, getChatroomByCode, getChatroomUser, listChatroomUsers, getPrompt, getMobileLegendsCharacter } from '../../graphql/queries';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../providers/UserProvider';
import { isLeafType } from 'graphql';
import { Tooltip } from 'react-tooltip'
import { PiPersonFill } from 'react-icons/pi';
import { IoPersonSharp } from 'react-icons/io5';
import { useMobileLegendsCharacters } from '../../providers/MobileLegendsCharactersProvider';
import GameArea from '../../components/arcade/GameArea';



export default function ArcadeRoomPage() {

    const navigate = useNavigate()
    let params = useParams()
    const client = generateClient()

    const [linkTooltip, setLinkTooltip] = useState('Copy to Clipboard')
    const [usersTooltip, setUsersTooltip] = useState('')

    const { data: characters, isLoading, error } = useMobileLegendsCharacters();


    const [paramsVerified, setParamsVerified] = useState(false)
    const { data: user, isLoading: userIsLoading, error: userError } = useUser()

    const [chatroomUser, setChatroomUser] = useState<ChatroomUser>()
    const [chatroom, setChatroom] = useState<Chatroom>()
    const [chatroomState, setChatroomState] = useState<ChatroomState>()
    const [prompt, setPrompt] = useState<Prompt>()
    const [round, setRound] = useState(0)
    const [chatroomMessages, setChatroomMessages] = useState<Array<ChatroomMessage>>([])
    
    const [chatroomInit, setChatroomInit] = useState(false)
    const [chatroomMessageInit, setChatroomMessageInit] = useState(false)
    const [chatroomUserInit, setChatroomUserInit] = useState(false)

    const [chatInput, setChatInput] = useState('')


    const fetchPrompt = (inputPromptId?: string) => {

        console.log('fetching prompt')


        const promptId = inputPromptId ? inputPromptId : chatroomState.promptId

        console.log('promptId: ', promptId)
        if(!promptId){
            console.warn('no promptId: ', promptId , 'state: ', chatroomState)
            return
        }
        

        client.graphql({
            query: getPrompt,
            variables: {
                id: promptId
            }
        }).then((data) => {
            setPrompt(data.data.getPrompt)
            console.log('prompt fetched: ', data.data.getPrompt)
        }).catch((err) => {

            console.error('prompt fetch error: ', err, 'id: ', promptId)

        })


        

    }

    useEffect(() => {
        if(paramsVerified) return
        if(!params.code || params.code.length != 4 || !/^[A-Z0-9]+$/gm.test(params.code)){
            navigate("/error/1")
        }
        if(params.code.toString().toUpperCase() != params.code.toString()){
            navigate("/arcade/"+params.code.toUpperCase() )
        }
        setParamsVerified(true)
    }, [])

    useEffect(() => {
        if(userIsLoading || !paramsVerified) return
        const initializeChatroom = async () => {

            return await client
                .graphql({
                    query: getChatroomByCode,
                    variables: {
                        code: params.code
                    }
                }).then(data => {
                    setChatroom(data.data.getChatroomByCode)
                    setChatroomInit(true)
                    console.log('chatroom Initialized: ', data)

                    const tempState = data.data.getChatroomByCode.chatroomState
                    if(tempState){

                        setChatroomState(tempState)
                        console.log('chatroomState Initialized: ', tempState)
                        if(tempState.round) setRound(tempState.round)
                        if(tempState.promptId) fetchPrompt(tempState.promptId)
                    }else{
                        throw "CHATROOM STATE NOT FOUND"
                    }
                }).catch(err => {
                    console.error('initalize chatroom error: ', err)
                    navigate("/error/1")
                })
        }
        initializeChatroom()

    }, [userIsLoading, paramsVerified])


    useEffect(()=> {

        if(!chatroomInit || !user) return
        
        const initializeChatroomUser = async ()=> {

            if(!user) return
    
            return await client
                .graphql({
                    query: createChatroomUser,
                    variables: {
                        input: {
                            chatroomId: chatroom.id,
                            ttl: getTtlFromMinutes(60*24),
                            userId: user.id,
                            points: 0
                        }
                    }
                }).then(data => {
                    setChatroomUser(data.data.createChatroomUser)
                    setChatroomUserInit(true)
                    console.log('chatroomUser Initialized: ', data)
                })
        }
        var userExist = false
        
        user.chatrooms.map((chatroomUser) => {

            if(chatroomUser.chatroom == null) return
            if(chatroomUser.chatroom.code == params.code){
                
                if(userExist) return 
                
                setChatroomUser(chatroomUser)
                setChatroomUserInit(true)
                userExist = true
                console.log('chatroomUser Fetched: ', chatroomUser)
                return
                
            }
        })
        

        if(!userExist) {
            initializeChatroomUser()
        }

    }, [chatroomInit])

    useEffect(() => {

        if(!chatroomInit) return
        const onCreateMessageSub = onCreateMessageSubscription()
        console.log('subscribed to onCreateMessage')
        const onUpdateChatroomSub = onUpdateChatroomSubscription()
        console.log('subscribed to onUpdateChatroom')
        const onUpdateChatroomUpdateSub = onUpdateChatroomStateSubscription()
        console.log('subscribed to onUpdateChatroomState')
        
        return(() => {
            console.log('unsubscribing from onCreateMessage/onUpdateChatroom ...', onCreateMessageSub, onUpdateChatroomSub, onUpdateChatroomUpdateSub)
            onCreateMessageSub.unsubscribe()
            onUpdateChatroomSub.unsubscribe()
            onUpdateChatroomUpdateSub.unsubscribe()

        })

    }, [chatroomInit])

    useEffect(() => {

        if(!chatroomInit) return

        console.log('updating room ttl by 5 min') 
        client.graphql({
            query: updateChatroom,
            variables: {
                input: {
                    id: chatroom.id,
                    ttl: getTtlFromMinutes(10)
                }
            }
        }).then((data) => {
            console.log('chatroom ttl updated [join room]: ', data)
        })


    }, [chatroomInit])
    useEffect(() => {

        if(!chatroomUserInit) return

        
        return (() => {
            console.log('setting user ttl to 5 minutes...')
            client.graphql({
                query: updateChatroomUser,
                variables: {
                    input: {
                        id: chatroomUser.id,
                        ttl: getTtlFromMinutes(5)
                    }
                }
            }).then((data)=> {
                console.log('ttl set to 5 minutes: ', data)
            })
        })


    }, [chatroomUserInit])

    useEffect(() => {

        if(!chatroomUserInit) return

        console.log('updating chatroomUser TTL')
        client.graphql({
            query : updateChatroomUser,
            variables: {
                input: {
                    id : chatroomUser.id,
                    ttl : getTtlFromMinutes(60*5),
                }
            }
        }).then((data) => {
            console.log('updated chatroomUser TTL: ', data)
        })



    }, [chatroomUserInit])
    

    
    const onCreateMessageSubscription = () => {
        return client
        .graphql({
            query: onCreateChatroomMessage,
            variables: {
                chatroomId: chatroom.id
            }
        }).subscribe(data => {
            console.log('got message: ', data)
            console.log('filtering user: ' , chatroomUser)
            if(onCreateChatroomMessage != null && data.data.onCreateChatroomMessage.chatroomUser.id != chatroomUser.id){
                setChatroomMessages((oldMessages) => ([
                    
                    ...oldMessages,
                    data.data.onCreateChatroomMessage

                ]))
            }
        })
    }
    const onUpdateChatroomSubscription = () => {

        return client
        .graphql({
            query: onUpdateChatroom,
            variables: {
                id: chatroom.id
            }
        }).subscribe(data => {
            console.log('got updateChatroom: ', data)
            setChatroom(data.data.onUpdateChatroom)
        })
    }
    const onUpdateChatroomStateSubscription = () => {

        console.log('subscribing to chatroomState with id: ', chatroomState.id)
        return client
        .graphql({
            query: onUpdateChatroomState,
            variables: {
                id: chatroomState.id

            }
        }).subscribe(data => {
            console.log('got updateChatroomState: ', data)
            const oldState = chatroomState
            const newState = data.data.onUpdateChatroomState

            if(newState.round != null){
                setRound(newState.round)
                setChatroomState((oldState) => {oldState.round = newState.round;console.log('oldState : ',oldState); return oldState})
            }else{
                newState.round = oldState.round
                setChatroomState(newState)
            }
            if(data.data.onUpdateChatroomState.promptId) fetchPrompt(data.data.onUpdateChatroomState.promptId)
        })
    }
    
    

    const handleChatInput = (e : React.FormEvent<HTMLInputElement>) => {

        setChatInput(e.currentTarget.value)
    }

    const handleChatKeyDown = (e : React.KeyboardEvent) => {
        
        if(e.key === 'Enter') {

            
            client.graphql({
                query: createChatroomMessage,
                variables: {
                    input: {
                        chatroomId: chatroom.id,
                        createdAt: new Date().toISOString(),
                        content: chatInput,
                        chatroomUserId: chatroomUser.id,
                        ttl: getTtlFromMinutes(60)
                    }
                }
            })

            setChatInput('')

            const newMessage: ChatroomMessage = {
                __typename: 'ChatroomMessage',
                id: new Date().getTime().toLocaleString(),
                content: chatInput,
                chatroomUserId: chatroomUser.id,
                chatroomId: chatroom.id,
                createdAt: new Date().toISOString(),
                ttl: 0,
                chatroomUser: chatroomUser
            }
            setChatroomMessages((oldMessages) => [...oldMessages, newMessage])

        }
    }

 
    
    
    if(!chatroomInit) return <div>loading...</div>

    return(
        <div className='grid grid-cols-5 w-screen h-screen'>
            
            <div className='col-span-4 w-full h-full flex flex-col justify-between'>

                
                <div className='w-full h-[5vh] bg-gray-800 shadow-md shadow-gray-900 flex flex-row'>
                    
                    
                    <img src="/ml-icon.svg" alt="" className='h-[70%] my-auto px-3 cursor-pointer' onClick={() => navigate('/arcade')} />
                
                    <div 
                    className='text-[2vh] align-middle text-start my-auto font-modesto pr-5 cursor-pointer'  
                    onClick={() => {navigator.clipboard.writeText(`https://www.mobiledle.com/arcade/${params.code}`); setLinkTooltip('Link Copied!') }}
                    onMouseLeave={() => setLinkTooltip('Copy to Clipboard')}
                    data-tooltip-id="link-tooltip"
                    data-tooltip-content={linkTooltip}
                    data-tooltip-delay-show={100}
                    data-tooltip-float={true}
                    data-tooltip-offset={30}
                    data-tooltip-variant='light'
                    data-tooltip-place="bottom">
                    
                        <Tooltip id='link-tooltip'></Tooltip>
                        MOBILEDLE.COM/ARCADE/<span className='text-orange-200'>{params.code}</span>
                    </div>

                    <div 
                    className='w-full bg-gray-700 font-modesto text-start flex flex-row justify-between text-[2vh] pr-5'
                    
                    
                    >

                        <span className='my-auto ps-5'>Round <span>{round}</span></span>
                        <span className='my-auto flex flex-row cursor-default' onMouseEnter={() => {
                        setUsersTooltip((chatroom.users.map((user) => user.user.username.toString()).join("\n")))
                    }}
                        data-tooltip-id="users-tooltip"
                        data-tooltip-content={usersTooltip}
                        data-tooltip-delay-show={100}
                        data-tooltip-float={true}
                        data-tooltip-offset={30}
                        data-tooltip-variant='light'
                        data-tooltip-place="bottom">{chatroom.users.length} <IoPersonSharp className='my-auto ms-2' /></span>
                        <Tooltip id='users-tooltip'></Tooltip>
                    </div>


                </div>

                <div className='h-full w-full relative '>
                    

                    <div className='absolute top-0 left-0 h-full -z-10 p-5 text-3xl '>

                        {chatroom.users.map((user) => {
                            return <div>{user.user.username}:   {user.points}</div>
                        })}
                    
                    </div>

                    <GameArea chatroom={chatroom} chatroomState={chatroomState} chatroomUser={chatroomUser} prompt={prompt} />
                    



                </div>
            </div>

            <div className='bg-gray-900 bg-opacity-30 shadow-lg shadow-black w-full h-screen overflow-hidden flex flex-col justify-between'>
                <div className='flex flex-col mt-auto w-full text-start ps-5 align-bottom overflowy-scroll overflow-x-hidden max-h-full'>

                    {chatroomMessages.map((message) => {

                        return( 
                        <div key={message.id}>
                            {message.chatroomUser.user.username}: {message.content}
                        </div>
                        )
                    })}
   

                </div>
                <div className='mt-4 border-2 border-t-neutral-600 border-transparent'>
                    <input onChange={handleChatInput} onKeyDown={handleChatKeyDown} value={chatInput} className='w-full rounded-t-[0.1rem] bg-neutral-900 h-16 text-white ps-5 text-2xl' type="text" placeholder='Type Here' />
                </div>

            </div>
                
        </div>
    )

}


