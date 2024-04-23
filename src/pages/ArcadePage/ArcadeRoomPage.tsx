import React, { FormEventHandler, useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createUser, createChatroomUser , updateChatroom, updateChatroomUser, updateChatroomMessage, createChatroom, createChatroomMessage } from '../../graphql/mutations';
import { onCreateChatroom, onCreateChatroomMessage, onUpdateChatroom } from '../../graphql/subscriptions';
import { Chatroom, ChatroomMessage, ChatroomUser } from '../../API';
import getTtlFromMinutes from '../../utils/getTtlFromMinutes';
import { listChatrooms, getChatroom, getChatroomByCode, getChatroomUser, listChatroomUsers } from '../../graphql/queries';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../providers/UserProvider';
import { isLeafType } from 'graphql';

export default function ArcadeRoomPage() {

    const navigate = useNavigate()
    let params = useParams()
    const client = generateClient()

    const [paramsVerified, setParamsVerified] = useState(false)
    const { data: user, isLoading: userIsLoading, error: userError } = useUser()

    const [chatroomUser, setChatroomUser] = useState<ChatroomUser>()
    const [chatroom, setChatroom] = useState<Chatroom>()
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
                        ownerId: chatroomUser.id,
                        ttl: getTtlFromMinutes(60)
                    }
                }
            })

            setChatInput('')

        }
    }

    return(
        <div className='grid grid-cols-5 w-screen h-screen'>
            
            <div className='col-span-4 w-full h-full flex flex-col justify-center'>
                {params.code}
            </div>

            <div className='bg-gray-900 bg-opacity-30 shadow-lg shadow-black w-full h-screen overflow-hidden flex flex-col justify-between'>
                <div className='flex flex-col mt-auto w-full text-start ps-5 align-bottom overflowy-scroll overflow-x-hidden max-h-full'>

                    {chatroomMessages.map((message) => {

                        return( 
                        <div key={message.id}>
                            {message.owner.user.username}: {message.content}
                        </div>
                        )
                    })}
   

                </div>
                <div className=''>
                    <input onChange={handleChatInput} onKeyDown={handleChatKeyDown} value={chatInput} className='w-full rounded-t-sm bg-gray-300 h-20 text-black ps-5 text-2xl' type="text" placeholder='Type Here' />
                </div>

            </div>
                
        </div>
    )

}


