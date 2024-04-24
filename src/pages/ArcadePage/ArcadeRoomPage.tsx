import React, { FormEventHandler, useEffect, useState } from 'react';
import { generateClient, post } from 'aws-amplify/api';
import { createUser, createChatroomUser , updateChatroom, updateChatroomUser, updateChatroomMessage, createChatroom, createChatroomMessage } from '../../graphql/mutations';
import { onCreateChatroom, onCreateChatroomMessage, onUpdateChatroom } from '../../graphql/subscriptions';
import { Chatroom, ChatroomMessage, ChatroomUser, ChatroomState } from '../../API';
import getTtlFromMinutes from '../../utils/getTtlFromMinutes';
import { listChatrooms, getChatroom, getChatroomByCode, getChatroomUser, listChatroomUsers } from '../../graphql/queries';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../providers/UserProvider';
import { isLeafType } from 'graphql';
import { Tooltip } from 'react-tooltip'
import { PiPersonFill } from 'react-icons/pi';
import { IoPersonSharp } from 'react-icons/io5';

export default function ArcadeRoomPage() {

    const navigate = useNavigate()
    let params = useParams()
    const client = generateClient()

    const [linkTooltip, setLinkTooltip] = useState('Copy to Clipboard')
    const [usersTooltip, setUsersTooltip] = useState('')




    const [paramsVerified, setParamsVerified] = useState(false)
    const { data: user, isLoading: userIsLoading, error: userError } = useUser()

    const [chatroomUser, setChatroomUser] = useState<ChatroomUser>()
    const [chatroom, setChatroom] = useState<Chatroom>()
    const [chatroomState, setChatroomState] = useState<ChatroomState>()
    const [chatroomMessages, setChatroomMessages] = useState<Array<ChatroomMessage>>([])
    
    const [chatroomInit, setChatroomInit] = useState(false)
    const [chatroomMessageInit, setChatroomMessageInit] = useState(false)
    const [chatroomUserInit, setChatroomUserInit] = useState(false)

    const [chatInput, setChatInput] = useState('')

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
                    setChatroomState(data.data.getChatroomByCode.chatroomState)
                    console.log('chatroom Initialized: ', data)
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
                            userId: user.id
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
        console.log('subscribed to onUpdateMessage')
        
        return(() => {
            console.log('unsubscribing from onCreateMessage/onUpdateChatroom ...')
            onCreateMessageSub.unsubscribe()
            onUpdateChatroomSub.unsubscribe()

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
            if(onCreateChatroomMessage != null){
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

        }
    }

 
    const handleClickStartGame = async () => {

        const callAPI = post({
            apiName: 'mobiledleAPI',
            path: '/items',

        })

        const {body} = await callAPI.response
        const response = await body.json();
        console.log('POST call succeeded');
        console.log(response);

        
    }


    
    if(!chatroomInit) return <div>loading...</div>

    return(
        <div className='grid grid-cols-5 w-screen h-screen'>
            
            <div className='col-span-4 w-full h-full flex flex-col justify-between'>

                
                <div className='w-full h-[5vh] bg-gray-800 shadow-md shadow-gray-900 flex flex-row'>
                    
                
                    <div 
                    className='text-[2vh] align-middle text-start my-auto font-modesto px-5 cursor-pointer'  
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
                        <span></span>
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

                <div>

                </div>
                <button className='w-52 align-bottom border-1 border-white mx-auto' onClick={handleClickStartGame}>Start Game</button>
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


