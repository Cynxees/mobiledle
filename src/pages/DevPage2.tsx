
const endpoint = 'https://fwkgtsinlvf6bfeusjmgdxbmwi.appsync-api.ap-southeast-1.amazonaws.com/graphql'
const apiId = 'qtdtmju7fzfehbp3n7bgg3uxje'
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { listChats } from '../graphql/queries';
import { createChat as CreateChatMutation, createChat, updateChat } from '../graphql/mutations';
import { onCreateChat, onUpdateChat } from '../graphql/subscriptions';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

export default function DevPage2() {
    const [chats, setChats] = useState('hi');
    const [chatId, setChatId] = useState('0');
    const [owner, setOwner] = useState('tolol');
    const [inputText, setInputText] = useState('');


    const createSub = client
        .graphql({ query: onCreateChat })
        .subscribe({
        next: ({ data }) => {
            setChats(data.onCreateChat.text)
            console.log('receive create data: ', data)
        }
            ,
        error: (error) => console.warn(error)
    });

    const updateSub = client
        .graphql({ query: onUpdateChat  })
        .subscribe({
            next: ({ data }) => {
                setChats(data.onUpdateChat.text)
                console.log('receive update data: ', data)
        },
        error: (error) => console.warn(error)
    });

    const sub = client
        .graphql({
            query: onCreateChat,
        })
        .subscribe({
            next: ({ data }) => console.log(data),
            error: (error) => console.warn(error)
        })


    function handleInput(event: React.FormEvent<HTMLInputElement>): void {
        
        setInputText(event.currentTarget.value)

    }

    function handleOwnerInput(event: React.FormEvent<HTMLInputElement>): void {
        
        
        setOwner(event.currentTarget.value)

    }

    function handleIdInput(event: React.FormEvent<HTMLInputElement>): void {
        
        setChatId(event.currentTarget.value)

    }

    function handleSubmit(): void {
    
        console.log('sending: ', inputText);

        const createChatQL = client
            .graphql({ 
                query: createChat,
                variables: {
                    input: {
                        owner: owner,
                        text: inputText,
                        createdAt: new Date().toString()
                    }
                }
            
            });

        console.log('createSub: ',createChatQL.then(result => setChatId(result.data.createChat.id)))


    }

    function handleSubmitUpdate(): void {
    
        console.log('sending: ', inputText);

        try{
        const updateQL = client
            .graphql({ 
                query: updateChat,
                variables: {

                    input: {

                        id: chatId,
                        owner: owner,
                        text: inputText,
                        createdAt: new Date().toString()
                    }
                }
            
            })
            console.log('updateSub: ',updateQL)

        }catch(e){
            console.log(e)
        }



    }

    return(

        <div>

            <div>{chats.toString()}</div>

            id: <input type="text" onChange={handleIdInput} value={chatId}/>
            <br></br>
            owner : <input type="text" onChange={handleOwnerInput} value={owner}/>
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            text : <input type="text" onChange={handleInput} value={inputText}/>
            <button onClick={handleSubmit} >submit</button>
            <button onClick={handleSubmitUpdate} >update</button>

        </div>


    )

}