import { useMobileLegendsCharacters } from "../../../../providers/MobileLegendsCharactersProvider";
import { ChatroomMessage, ChatroomState, ChatroomUser, MobileLegendsCharacter, Prompt } from "../../../../API"
import { useEffect, useRef, useState } from "react";
import { generateClient, post } from "aws-amplify/api";
import { createChatroomMessage, executeUserAnswer } from "../../../../graphql/mutations";
import getTtlFromMinutes from "../../../../utils/getTtlFromMinutes";
import ClassicHeroBox from "../ClassicHeroBox";
import { GiSilverBullet } from "react-icons/gi";
import ArcadeChance from "../../ArcadeChance";
import { animated, useSpring } from "react-spring";
import { MobileLegendsHero } from "../../../../types/MobileLegendsHero";
import CachedImage from "../../../../components/CachedImage";

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
    
    return Math.floor(index+5 * date+5 * month+5 * year+5) % max



}


interface LobbyViewInput {

    chatroomState : ChatroomState,
    chatroomUser : ChatroomUser,
    chatroomMessages: ChatroomMessage[],
    prompt: Prompt,
    round: number,
    timer: number
    
}


export default function BlurGameView({chatroomState, chatroomUser, chatroomMessages, prompt, round, timer} : LobbyViewInput) {


    const client = generateClient()
    const { data: characters, isLoading, error } = useMobileLegendsCharacters();
    const [ characterGuesses, setCharacterGuesses ] = useState<MobileLegendsHero[]>([])
    const [ userInput, setUserInput ] = useState('');
    const [currentRound, setCurrentRound] = useState(0)
    
    const [ answer, setAnswer ] = useState<MobileLegendsHero>();
    const [isRevealed, setReveal] = useState(false);
    const [ messagesInit, setMessagesInit ] = useState(false);

    const [showInput, setShowInput] = useState(true)
    const [inputCooldown, setInputCooldown] = useState(3000)
    const percent = (inputCooldown/2000)*100
    const inputProps = useSpring({ value: percent, from: { value: 0 } });

    const timerPercent = (prompt) ? Math.floor((timer/(prompt.timeLimit*1000))*1000)/10 : 100

    const skinIndex = (prompt) ? parseInt(prompt.description) : 0



    
    const borderStyle = useSpring({
        borderLeftColor: percent <= 0 ? 'orange' : 'transparent',
        borderBottomColor: percent <= 33 ? 'orange' : 'transparent',
        borderRightColor: percent <= 66 ? 'orange' : 'transparent',
        borderTopColor: percent <= 100 ? 'orange' : 'transparent',
        config: { duration: 250 }
    });


    useEffect(() => {

        
        const interval = setInterval(() => {
            
            setInputCooldown(old => {return old-100})
            

        }, 100);


        return () => {
            clearInterval(interval)

        };


    }, [])

    useEffect(() => {

        if(!chatroomUser) return



        if(chatroomUser.state == "PLAYING"){
            setShowInput(true)

        }
        
        if(chatroomUser.state.startsWith("CORRECT")){

            const correctRound = chatroomUser.state.split('-')[1]

            if(parseInt(correctRound) >= round){

                setShowInput(false)
            }else{
                setShowInput(true)
            }
        }


    }, [chatroomUser])

    useEffect(() => {

        if(!prompt) return

        if(!prompt.mobileLegendsCharacterId) return

        setAnswer(characters[prompt.mobileLegendsCharacterId])
        console.log('answer: ', characters[prompt.mobileLegendsCharacterId])

        const index1 = randomizeHero(parseInt(prompt.mobileLegendsCharacterId), 124)
        const index2 = randomizeHero(index1, 124)
        const index3 = randomizeHero(index2, 124)

        setCharacterGuesses([characters[index1], characters[index2], characters[index3]])

    }, [prompt])

    useEffect(() => {

        if(messagesInit) chatroomMessages.map((message) => {

            if(message.type.startsWith('GUESS-HERO')){

                
                const character = characters[parseInt(message.type.split('-')[2])-1]

                if(message.type.split('-')[3] != round.toString()) return
                
                if(message.type.split('-')[4] != null) return
                
                
                message.type = message.type + "-DONE"

                if(!characterGuesses.includes(character)){

                    setCharacterGuesses((oldGuess) => {
                        
                        if(oldGuess.length == 5) return [...oldGuess.slice(1,), characters[parseInt(message.type.split('-')[2])-1]]

                        return [...oldGuess, characters[parseInt(message.type.split('-')[2])-1]]
    
    
                    })
                }



                

            }

        })

        setMessagesInit(true)
        
    }, [chatroomMessages])



    const validateAnswer = (ans: string): boolean => {
        
        console.log('checking ', ans)
        console.log(ans ,', answer is ', characters[prompt.mobileLegendsCharacterId].name.toUpperCase())
        
        if(ans == characters[prompt.mobileLegendsCharacterId].name.toUpperCase()) return true

        return false

    }

    const validateHero = (ans : string): string => {


        if(ans.length < 3) return '-1';

        var id = '-1'
        
        characters.map((char) => {

            if(char.name.toUpperCase() == ans) {
                id = char.id
            }
        })

        return id



    }

    const handleUserInput = (e: React.FormEvent<HTMLInputElement>) => {

        if(isAlphaNumeric(e.currentTarget.value)){
            setUserInput(e.currentTarget.value.toUpperCase());
        }

    }

    const handleUserAnswer = async (points: number) => {

        console.log('executing user answer at round ', round)

        client.graphql({
            query: executeUserAnswer,
            variables: {
                input: {
                    chatroomUserId: chatroomUser.id,
                    userId: chatroomUser.userId,
                    chatroomId: chatroomUser.chatroomId,
                    chatroomUserTtl: chatroomUser.ttl,
                    points: points,
                    chatroomStateId: chatroomState.id,
                    lastRound: round
                }
            }
        })


    }
 
    const handleChatKeyDown = (e : React.KeyboardEvent) => {
        

        var type = 'GUESS'

        if(e.key === 'Enter' && userInput.length < 1) {

            setInputCooldown(1200)

        }else if(e.key === 'Enter' && inputCooldown < 0){
            setInputCooldown(1200)            

        }


        if(e.key === 'Enter' && userInput.length > 0 && inputCooldown < 0) {

            const heroId = validateHero(userInput)
            
            if(heroId != '-1'){

                type = 'GUESS-HERO-'+heroId+'-'+round

                setInputCooldown(3000)

                if(validateAnswer(userInput)){

                    setShowInput(false)
                    const timeLeftPercent = (chatroomState.willEndAt*1000 - (new Date().getTime()))/(prompt.timeLimit*1000)
                    console.log('time left percent', timeLeftPercent)
                    const points = Math.floor((timeLeftPercent) * 10)*10 
                    console.log('points', points)

                    handleUserAnswer(points)

                    type = 'GUESS-CORRECT'
                }else{



                }

            }else{



            }

            console.log(type)
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
    

    if(!prompt || !characterGuesses || !answer ) return <div> Loading...</div>

    return <div className="h-full w-full grid grid-rows-10 pb-2">

        <div className="h-full w-full flex flex-col leading-tight">
            <span className="text-3xl">BLUR</span>
            <span className="text-xs">{(prompt)? prompt.question: ''}</span>
            
        </div>

        <CachedImage 
        style={{filter: `blur(${(isRevealed)?'0':13*(timerPercent/100)}px) saturate(${(isRevealed)?1:(((100-timerPercent)/100))})`}}
        className="row-span-7 h-2/3 my-auto mx-auto brightness-110" 
        imgKey={answer.imageKeys.banners[skinIndex % answer.imageKeys.banners.length]} 
        />


        
        <div className="flex mx-auto">
            

            {showInput ? 
            
            <div className=''>

                <animated.div className='border-4' style={{
                    ...borderStyle
                    }}>

                    <input autoFocus={true} onInput={handleUserInput} onKeyDown={handleChatKeyDown} value={userInput} type="text" className="rounded-[0.1rem] w-[20vw] focus:outline-none bg-neutral-900 h-12 text-center uppercase text-white ps-5 text-xl" />
                </animated.div>

            </div>
            
            :''}
        </div>



    </div>



}