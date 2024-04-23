import React, { useEffect, useState } from 'react';
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
    const [chatroomMessages, setChatroomMessages] = useState<ChatroomMessage[]>([])

    
    const [chatroomInit, setChatroomInit] = useState(false)
    const [chatroomMessageInit, setChatroomMessageInit] = useState(false)
    const [chatroomUserInit, setChatroomUserInit] = useState(false)


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
        const onUpdateChatroomSub = onUpdateChatroomSubscription()
        
        return(() => {
            console.log('unsubscribing from onCreateMessage/onUpdateChatroom ...')
            onCreateMessageSub.unsubscribe()
            onUpdateChatroomSub.unsubscribe()
        })

    }, [chatroomInit])


    
    
    const onCreateMessageSubscription = () => {
        return client
        .graphql({
            query: onCreateChatroomMessage,
            variables: {
                chatroomId: chatroom.id
            }
        }).subscribe(data => {
            console.log('subscribed to onCreateMessage')
            if(onCreateChatroomMessage != null){
                setChatroomMessages([...chatroomMessages, data.data.onCreateChatroomMessage])
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
            console.log('subscribed to onUpdateChatroom')
            setChatroom(data.data.onUpdateChatroom)
        })
    }

    return(
        <div>
            {params.code}
        </div>
    )

}


