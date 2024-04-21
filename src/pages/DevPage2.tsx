import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createUser, createChatroomUser , updateChatroom, updateChatroomUser, updateChatroomMessage, createChatroom, createChatroomMessage } from '../graphql/mutations';
import { onCreateChatroom, onCreateChatroomMessage, onUpdateChatroom } from '../graphql/subscriptions';
import { ChatroomMessage } from '../API';
import getTtlFromMinutes from '../components/utils/getTtlFromMinutes';


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

    const chatroomSubscription = (chatroomID) => {
        
        const sub = client.graphql({
            query: onCreateChatroomMessage,
            variables: {
                chatroomId: chatroomID,
            } 

        }).subscribe({
            next: ({data}) => {
                
                console.log('got chats: ', data)
                setChats((currentChat) => [...currentChat, data.onCreateChatroomMessage])
                
            },error: error => console.error(error)})

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

    function handleChatroomCreateButton(): void {
    
        console.log('creating chatroom: ');

        const createChatQL = client
            .graphql({ 
                query: createChatroom,
                variables: {
                    input: {
                        name: chatroomName,
                        ttl: getTtlFromMinutes(60*24)
                        
                    }
                }
            
        });
        createChatQL.then(result => {
            setChatroomID(result.data.createChatroom.id)
            chatroomSubscription(result.data.createChatroom.id)
            
            console.log('createChatroom: ', result)
        
        })
    }


    function handleChatroomJoinButton(): void {
    
        console.log('joining room');

        chatroomSubscription(chatroomID)
        

    }

    function handleCreateMessageButton(): void {

        console.log('creating messages')

        const createMessageQL = client
            .graphql({
                query: createChatroomMessage,
                variables: {
                    input : {
                        ownerId: userID,
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
            <div>

                {(chats != null) ? chats.map((chat)=> 
                    <div key={chat.id}>{chat.ownerId}: {chat.content}</div>
                ):''}

            </div>
            

            
            
        </div>

    )
}


// export default function DevPage2() {


    // const createSub = client
    //     .graphql({ query: onCreateChat })
    //     .subscribe({
    //     next: ({ data }) => {
    //         setChats(data.onCreateChat.text)
    //         console.log('receive create data: ', data)
    //     }
    //         ,
    //     error: (error) => console.warn(error)
    // });

//     const updateSub = client
//         .graphql({ query: onUpdateChat  })
//         .subscribe({
//             next: ({ data }) => {
//                 setChats(data.onUpdateChat.text)
//                 console.log('receive update data: ', data)
//         },
//         error: (error) => console.warn(error)
//     });

//     const sub = client
//         .graphql({
//             query: onCreateChat,
//         })
//         .subscribe({
//             next: ({ data }) => console.log(data),
//             error: (error) => console.warn(error)
//         })


//     function handleInput(event: React.FormEvent<HTMLInputElement>): void {
        
//         setInputText(event.currentTarget.value)

//     }

//     function handleOwnerInput(event: React.FormEvent<HTMLInputElement>): void {
        
        
//         setOwner(event.currentTarget.value)

//     }

//     function handleIdInput(event: React.FormEvent<HTMLInputElement>): void {
        
//         setChatId(event.currentTarget.value)

//     }

    // function handleSubmit(): void {
    
    //     console.log('sending: ', inputText);

    //     const createChatQL = client
    //         .graphql({ 
    //             query: createChat,
    //             variables: {

    //                 input: {
    //                     owner: owner,
    //                     text: inputText,
    //                     createdAt: new Date().toString()
    //                 }
    //             }
            
    //         });

    //     console.log('createChat: ',createChatQL.then(result => setChatId(result.data.createChat.id)))


    // }

//     function handleSubmitUpdate(): void {
    
//         console.log('sending: ', inputText);

//         try{
//         const updateQL = client
//             .graphql({ 
//                 query: updateChat,
//                 variables: {

//                     input: {

//                         id: chatId,
//                         owner: owner,
//                         text: inputText,
//                         createdAt: new Date().toString()
//                     }
//                 }
            
//             })
//             console.log('updateSub: ',updateQL)

//         }catch(e){
//             console.log(e)
//         }



//     }

//     return(

//         <div>

//             <div>{chats.toString()}</div>

//             id: <input type="text" onChange={handleIdInput} value={chatId}/>
//             <br></br>
//             owner : <input type="text" onChange={handleOwnerInput} value={owner}/>
            
//             <br></br>
//             <br></br>
//             <br></br>
//             <br></br>
//             text : <input type="text" onChange={handleInput} value={inputText}/>
//             <button onClick={handleSubmit} >submit</button>
//             <button onClick={handleSubmitUpdate} >update</button>

//         </div>


//     )

// }