import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createUser, createChatroomUser , updateChatroom, updateChatroomUser, updateChatroomMessage, createChatroom, createChatroomMessage } from '../graphql/mutations';
import { onCreateChatroom, onCreateChatroomMessage, onUpdateChatroom } from '../graphql/subscriptions';
import { Chatroom, ChatroomMessage } from '../API';
import getTtlFromMinutes from '../utils/getTtlFromMinutes';
import { listChatrooms, getChatroom } from '../graphql/queries';

const client = generateClient();


export default function DevPage2() {

    const [username, setUsername] = useState('')
    const [chatroomName, setChatroomName] = useState('')
    const [messageInput, setMessageInput] = useState('')
    const [userID, setUserID] = useState('')
    const [chatroomUserID, setChatroomUserID] = useState('');
    const [chatroomID, setChatroomID] = useState('');
    const [userIsInChatroom, setUserIsInChatroom] = useState(false)

    const [chats, setChats] = useState<ChatroomMessage[]>([]);
    const [chatID, setChatID] = useState('');
    const [owner, setOwner] = useState('tolol');
    const [inputText, setInputText] = useState('');

    const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
    const [chatroomCode, setChatroomCode] = useState('');
    const [init, setInit] = useState(false)

    useEffect( () =>  {

        chatroomSubscription()

        console.log('fetching chatrooms...')
        client.graphql({
            query: listChatrooms

        }).then((data) =>{

            console.log('fetched chatrooms... ', data)
            setChatrooms(data.data.listChatrooms.items)
            setInit(true)
            
            
        }).catch((error) => {
    
            console.error('listChatrooms error: ', error)
    
        })
        


    }, [])

    const generateRoomcode = (chatrooms : Chatroom[]) => {

        console.log('generating room code...')
        
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charactersLength = characters.length;
        let isDone = false

        
        while(!isDone){

            let counter = 0;
            while (counter < 4) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }

            isDone = true
            

        }
        console.log('room code generated: ', result)

        return result;

    }

    const chatroomSubscription = () => {
        
        const sub = client.graphql({
            query: onCreateChatroom

        }).subscribe({
            next: ({data}) => {
                
                console.log('got chats: ', data)
                setChatrooms((currentChatroom) => [...currentChatroom, data.onCreateChatroom])
                
            },error: error => console.error(error)})

        return sub
    }


    const chatroomMessageSubscription = (chatroomID) => {
        
        console.log('subscribing to chatroomMessage')
        const sub = client.graphql({
            query: onCreateChatroomMessage,
            variables: {
                chatroomId: chatroomID,
            } 

        }).subscribe({
            next: ({data}) => {
                
                console.log('got chats: ', data)
                
                setChats((currentChat) => [...currentChat, data.onCreateChatroomMessage])
                setChatroomCode(data.onCreateChatroomMessage.chatroom.code)
            },error: error => console.error(error)})

        console.log('subscribing to chatroomMessage successful')
        return sub
    }
    


    function handleUsernameInput(event: React.FormEvent<HTMLInputElement>): void {
        setUsername(event.currentTarget.value)
    }
    function handleMessageInput(event: React.FormEvent<HTMLInputElement>): void {
        setMessageInput(event.currentTarget.value)
    }
    function handleUserIdInput(event: React.FormEvent<HTMLInputElement>): void {
        setUserID(event.currentTarget.value)
    }
    function handleChatroomUserIdInput(event: React.FormEvent<HTMLInputElement>): void {
        setChatroomUserID(event.currentTarget.value)
    }
    function handleChatroomIdInput(event: React.FormEvent<HTMLInputElement>): void {
        setChatroomID(event.currentTarget.value)
    }
    function handleChatroomNameInput(event: React.FormEvent<HTMLInputElement>): void {
        setChatroomName(event.currentTarget.value)
    }

    


    function handleUserCreateButton(): void {
    
        console.log('creating user: ', getTtlFromMinutes(60*24));

        const createUserQL = client
            .graphql({ 
                query: createUser,
                variables: {
                    input: {
                        username: username,
                        ttl: getTtlFromMinutes(60*24)
                    }
                }
            
            });

        console.log('createUser: ',createUserQL.then(result => setUserID(result.data.createUser.id)))
    }

    const handleChatroomCreateButton = async() => {
    
        console.log('creating chatroom: ');

        const createChatQL = client
        .graphql({ 
            query: createChatroom,
            variables: {
                input: {
                    name: chatroomName,
                    ttl: getTtlFromMinutes(60*24)
                    
                }
            },
        
        })
        .then(result => {
            
            console.log('chatroom created: ', result.data)
            setChatroomID(result.data.createChatroom.id)
            setChatroomCode(result.data.createChatroom.code)
            console.log('chatroom id fetched')
            chatroomMessageSubscription(result.data.createChatroom.id)
            
            console.log('createChatroom: ', result)
        
        })
        .catch(error => console.error('createChatroom: ',error))
    
    
    
    }


    function handleChatroomJoinButton(): void {
    
        console.log('joining room');

        chatroomMessageSubscription(chatroomID)
        

    }

    function handleCreateMessageButton(): void {

        console.log('creating messages')

        const createMessageQL = client
            .graphql({
                query: createChatroomMessage,
                variables: {
                    input : {
                        chatroomUserId: chatroomUserID,
                        chatroomId: chatroomID,
                        content: messageInput,
                        createdAt: new Date().toISOString(),
                        ttl: getTtlFromMinutes(60*24)
                    }
                }
            })

        console.log('createMessage: ', createMessageQL.then(result => result.data.createChatroomMessage))

    }

    useEffect(() => {

        if(chatroomID == null || chatroomID == undefined || chatroomID.length < 1 || userIsInChatroom) return
        

        console.log('creating chatroom user')
        const createChatroomUserQL = client
            .graphql({ 
                query: createChatroomUser,
                variables: {
                    input: {
                        chatroomId: chatroomID,
                        userId: userID,
                        ttl: getTtlFromMinutes(60*24)
                        
                    }
                }
                
            }
        )
        
        setUserIsInChatroom(true)

        console.log('createChatroomUser: ', createChatroomUserQL.then(result => setChatroomUserID(result.data.createChatroomUser.id)))
    
    }, [chatroomID])

    

    return (
        
        <div className='justify-start flex flex-col items-end border border-white p-10 rounded-lg'>
            <br />
            <div className='flex w-full'>username: <input className='w-full' type="text" onInput={handleUsernameInput} value={username} /></div>
            <div className='flex w-full mt-5'>userID: <input className='w-full' type="text" onInput={handleUserIdInput} value={userID} /></div>
            <button onClick={handleUserCreateButton}>Create</button>
            <br /><br />
            <div className='flex w-full'>chatroom name: <input className='w-full' type="text" onInput={handleChatroomNameInput} value={chatroomName} /></div>
            <div className='flex w-full mt-5'>chatroomID: <input className='w-full' type="text" onInput={handleChatroomIdInput} value={chatroomID} />
            </div>
            <div className='flex '>
            <button onClick={handleChatroomCreateButton}>Create</button><button onClick={handleChatroomJoinButton}>Join</button>

            </div>
            <br />
            <div className='w-full flex'>chatroomUserID: <input className='w-full' type="text" onInput={handleChatroomUserIdInput} value={chatroomUserID} />
            </div>
            <div className='flex'>
            <button onClick={handleChatroomCreateButton}>Create</button><button>Join</button></div>

            <br /><br />
            <div className='flex w-full'>message: <input className='w-full' type="text" onInput={handleMessageInput} value={messageInput} /><button onClick={handleCreateMessageButton} className=''>Create</button></div>

            <br /><br />
            <div className='w-full border rounded-lg'>

                {chatroomCode}
                {(chats != null) ? chats.map((chat)=>
                

                    <div key={chat.id}>
                        {chat.content}
                        
                    </div>
                ):''}

            </div>
            
            <br /><br />
            <div className='w-full border rounded-lg text-start p-5'>

                {chatrooms.map((chatroom)=> 
                    <div key={chatroom.code}>
                        {chatroom.code}: {chatroom.name}
                    </div>
                )}

            </div>

            
            
        </div>

    )
}