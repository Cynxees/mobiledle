import { useMobileLegendsCharacters } from "../../../providers/MobileLegendsCharactersProvider";
import { ChatroomState, ChatroomUser, MobileLegendsCharacter, Prompt } from "../../../API"
import { useEffect, useState } from "react";
import { post } from "aws-amplify/api";

function isAlphaNumeric(str : string) {
    var code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i)
        if (!(code > 44 && code < 58) && // 0-9
            !(code > 64 && code < 91) && // A-Z
            !(code > 96 && code < 123) && // a-z
            !(code == 32) ){ 
                return false;
            }
    }
    return true;
};


interface LobbyViewInput {

    chatroomState : ChatroomState,
    chatroomUser : ChatroomUser,
    prompt: Prompt
    
}




export default function ClassicGameView({chatroomState, chatroomUser, prompt} : LobbyViewInput) {


    const { data: characters, isLoading, error } = useMobileLegendsCharacters();
    const [ currentCharacter, setCurrentCharacter ] = useState<MobileLegendsCharacter>();
    const [ userInput, setUserInput ] = useState('') 
    
    const [ answer, setAnswer ] = useState('')



    useEffect(() => {

        if(!prompt) return

        if(!prompt.mobileLegendsCharacterId) return

        setCurrentCharacter(characters[prompt.mobileLegendsCharacterId])

    }, [prompt])


    const validateAnswer = (ans: string): boolean => {
        
        console.log('checking ', ans)
        
        if(ans == characters[prompt.mobileLegendsCharacterId].name.toUpperCase()) return true

        return false

    }


    const handleUserInput = (e: React.FormEvent<HTMLInputElement>) => {

        if(isAlphaNumeric(e.currentTarget.value)){
            setUserInput(e.currentTarget.value.toUpperCase());
        }

    }

    const handleClickStartGame = async () => {

        
        console.log('launch game: ', chatroomState)

        const callAPI  = post({
            apiName: 'mobiledleapi',
            path: '/functions',
            options: {
                body: {
                    chatroomStateId: chatroomState.id
                }
            }
    
        })
        const {body} = await callAPI.response
        const response = await body.json();
        console.log('next game POST call succeeded');
        console.log(response);

        
    }

    const rewardPoints = async()=> {
        
        console.log('rewarding: ', chatroomUser)
        const callAPI  = post({
            apiName: 'mobiledleapi',
            path: '/reward',
            options: {
                body: {
                    chatroomUserId: chatroomUser.id,
                    points: 100
                }
            }
    
        })
        const {body} = await callAPI.response
        const response = await body.json();
        console.log('reward POST call succeeded');
        console.log(response);
    }

    const handleChatKeyDown = (e : React.KeyboardEvent) => {
        
        if(e.key === 'Enter') {
            if(validateAnswer(userInput)){
                rewardPoints()
                handleClickStartGame()
            }
            setUserInput('')


        }

    }
    


    return <div className="h-full w-full grid grid-rows-7 ">

        <div className="h-full w-full flex flex-col align-middle justify-center">
            <span className="my-auto text-5xl">CLASSIC</span>
            <span>{(prompt)? prompt.question: ''}</span>
            
        </div>


        <div className="row-span-5 ">
            <div className="w-full h-full flex items-center">

                <img className="mx-auto" src={(currentCharacter)? currentCharacter.imageUrl[0] :''} />
            </div>
        </div>
        
        <div className="">
            <input onInput={handleUserInput} onKeyDown={handleChatKeyDown} value={userInput} type="text" className="rounded-[0.1rem] bg-neutral-900 h-16 w-[30%] text-center uppercase text-white ps-5 text-2xl" />
        </div>



    </div>



}