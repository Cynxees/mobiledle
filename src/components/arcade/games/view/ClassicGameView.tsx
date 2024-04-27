import { useMobileLegendsCharacters } from "../../../../providers/MobileLegendsCharactersProvider";
import { ChatroomState, ChatroomUser, MobileLegendsCharacter, Prompt } from "../../../../API"
import { useEffect, useRef, useState } from "react";
import { generateClient, post } from "aws-amplify/api";
import { createChatroomMessage } from "../../../../graphql/mutations";
import getTtlFromMinutes from "../../../../utils/getTtlFromMinutes";
import ClassicHeroBox from "../ClassicHeroBox";

function isAlphaNumeric(str : string) {
    var code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i)

        if (!(code > 44 && code < 58) && // 0-9
            !(code > 64 && code < 91) && // A-Z
            !(code > 96 && code < 123) && // a-z
            !(code == 32) && !(code == 39) ){ 
                return false;
            }
    }
    return true;
};

const randomizeHero = (index : number, max: number) => {

    const date = new Date().getUTCDay();
    const month = new Date().getUTCMonth();
    const year = new Date().getUTCFullYear();
    

    return Math.floor(index * date * month * year) % max



}


interface LobbyViewInput {

    chatroomState : ChatroomState,
    chatroomUser : ChatroomUser,
    prompt: Prompt
    
}


export default function ClassicGameView({chatroomState, chatroomUser, prompt} : LobbyViewInput) {


    const client = generateClient()
    const { data: characters, isLoading, error } = useMobileLegendsCharacters();
    const [ character1, setCharacter1 ] = useState<MobileLegendsCharacter>();
    const [ character2, setCharacter2 ] = useState<MobileLegendsCharacter>();
    const [ character3, setCharacter3 ] = useState<MobileLegendsCharacter>();
    const [ userInput, setUserInput ] = useState('') ;
    
    const [ answer, setAnswer ] = useState<MobileLegendsCharacter>();



    useEffect(() => {

        if(!prompt) return

        if(!prompt.mobileLegendsCharacterId) return

        setAnswer(characters[prompt.mobileLegendsCharacterId])
        console.log('answer: ', characters[prompt.mobileLegendsCharacterId])

        const index1 = randomizeHero(parseInt(prompt.mobileLegendsCharacterId), 100)
        const index2 = randomizeHero(index1, 100)
        const index3 = randomizeHero(index2, 100)

        setCharacter1(characters[index1])
        setCharacter2(characters[index2])
        setCharacter3(characters[index3])


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
                    id: chatroomUser.id,
                    userId: chatroomUser.userId,
                    chatroomId: chatroomUser.chatroomId,
                    ttl: chatroomUser.ttl,
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
        

        var type = 'GUESS'

        if(e.key === 'Enter') {
            if(validateAnswer(userInput)){
                rewardPoints()
                handleClickStartGame()
                type = 'GUESS-CORRECT'
            }

            client.graphql({
                query: createChatroomMessage,
                variables: {
                    input: {
                        chatroomId: chatroomUser.chatroomId,
                        createdAt: new Date().toISOString(),
                        content: userInput,
                        chatroomUserId: chatroomUser.id,
                        ttl: getTtlFromMinutes(60),
                        type: type
                    }
                }
            })

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
                <div className="mx-auto flex flex-col gap-5">
                <ClassicHeroBox character={character1} answer={answer} showBooleans={[true,true]}/>
                <ClassicHeroBox character={character2} answer={answer} showBooleans={[true,true]}/>
                <ClassicHeroBox character={character3} answer={answer} showBooleans={[true,true]}/>

                </div>
            </div>
        </div>
        
        <div className="">
            <input autoFocus={true} onInput={handleUserInput} onKeyDown={handleChatKeyDown} value={userInput} type="text" className="rounded-[0.1rem]  focus:outline-none bg-neutral-900 h-16 w-[30%] text-center uppercase text-white ps-5 text-2xl" />
        </div>



    </div>



}