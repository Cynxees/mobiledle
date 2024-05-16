import React, { FormEventHandler, useEffect, useRef, useState } from 'react';
import { generateClient, post } from 'aws-amplify/api';
import { createUser, createChatroomUser , updateChatroom, updateChatroomUser, updateChatroomMessage, createChatroom, createChatroomMessage, executeLaunchGame, executeUserAnswer } from '../../graphql/mutations';
import { onCreateChatroom, onCreateChatroomMessage, onCreateChatroomUser, onUpdateChatroom, onUpdateChatroomState, onUpdateChatroomUser, onUpdateChatroomUserByChatroom } from '../../graphql/subscriptions';
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
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json'
import { FaCrown } from 'react-icons/fa6';
import ProgressBar from '../../components/arcade/ProgressBar';
import CachedImage from '../../components/CachedImage';





export default function ArcadeRoomPage() {
    Amplify.configure(amplifyconfig)
    const navigate = useNavigate()
    let params = useParams()
    const client = generateClient()
    let audio = new Audio("/bloop.mp3")

    const [linkTooltip, setLinkTooltip] = useState('Copy to Clipboard')
    const [usersTooltip, setUsersTooltip] = useState('')

    const { data: characters, isLoading, error } = useMobileLegendsCharacters();


    const [paramsVerified, setParamsVerified] = useState(false)
    const { data: user, isLoading: userIsLoading, error: userError } = useUser()

    const [chatroomUser, setChatroomUser] = useState<ChatroomUser>()
    const [chatroomUserId, setChatroomUserId] = useState('')
    const [chatroomUsers, setChatroomUsers] = useState<ChatroomUser[]>([])
    const [chatroom, setChatroom] = useState<Chatroom>()
    const [chatroomState, setChatroomState] = useState<ChatroomState>()
    const [prompt, setPrompt] = useState<Prompt>()
    const [round, setRound] = useState(0)
    const [activeRound, setActiveRound] = useState(0)
    const [userCount, setUserCount] = useState(0) 
    const [chatroomMessages, setChatroomMessages] = useState<Array<ChatroomMessage>>([])
    const [chatroomReinit, setChatroomReinit] = useState('')
    const [timer, setTimer] = useState(-1)
    
    const [chatroomInit, setChatroomInit] = useState(false)
    const [chatroomMessageInit, setChatroomMessageInit] = useState(false)
    const [chatroomUserInit, setChatroomUserInit] = useState(false)

    const [chatInput, setChatInput] = useState('')
    const inactivityTimeout = useRef(null);
    const isFocused = useRef(true);
    const chatRef = useRef(null);
    
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
    
    const setUserInactive = () => {

        if(!chatroomUserInit) return

        client.graphql({
            query: updateChatroomUser,
            variables: {
                input: {
                    id: chatroomUser.id,
                    activeState: "INACTIVE"
                }
            }
        }).then(data => {
            console.log('Changed to Inactive: ', data)
        })

    }

    const onFocus = () => {
        isFocused.current = true;
        clearTimeout(inactivityTimeout.current);
    };
    const onBlur = () => {
        if(!chatroomUserInit) return
        isFocused.current = false;
        inactivityTimeout.current = setTimeout(() => {
            console.warn("USER IS INACTIVE: ", chatroomUser);
            setUserInactive()
            navigate('/arcade');
        },  5*60 * 1000);
    };

    useEffect(() => {
        if(!chatroomUserInit) return
        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);
        onFocus();

        return () => {
            clearTimeout(inactivityTimeout.current);
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
        };
    }, [chatroomUserInit]);

    useEffect(() => {

        if(!chatroomUserInit) return

        if(round == 0) return

        if(!isFocused.current) return

        if(round == activeRound) return

        
        setActiveRound(round)

        client.graphql({
            query: updateChatroomUser,
            variables: {
                input: {
                    id: chatroomUser.id,
                    activeState: "ACTIVE-" + round
                }
            }
        }).then(data => {
            console.log('Changed to Active: ', data)
        })



    }, [round])

    useEffect(() => {
        if (chatRef.current) {
            const { scrollHeight, clientHeight } = chatRef.current;
            chatRef.current.scrollTop = scrollHeight - clientHeight;
        }
    }, [chatroomMessages])

    useEffect(() => {

        if(!chatroomState) return
        
        const interval = setInterval(() => {
            if(chatroomState.willEndAt != null) setTimer(chatroomState.willEndAt*1000 - (new Date().getTime() - 17000))

        }, 100);


        return () => {
            clearInterval(interval)

        };


    }, [,chatroomState])

    useEffect(() => {
        
        return () => {
            setUserInactive()
        
        }
    }, [])


    useEffect(() => {
        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);
        onFocus();



        return () => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
        };
    }, []);
    


    const fetchPrompt = (inputPromptId?: string) => {

        console.log('fetching prompt')



        const promptId = inputPromptId ? inputPromptId : chatroomState.promptId

        console.log('promptId: ', promptId)
        if(!promptId){
            console.log('no promptId: ', promptId , 'state: ', chatroomState)
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
                    setChatroomUsers(data.data.getChatroomByCode.users)
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

    }, [userIsLoading, paramsVerified, chatroomReinit])


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
                            points: 0,
                            state: "PLAYING",
                            activeState: "ACTIVE-0"
                        }
                    }
                }).then(data => {
                    setChatroomUser(data.data.createChatroomUser)
                    setChatroomUserInit(true)
                    setChatroomUserId(data.data.createChatroomUser.id)
                    setChatroomUsers((oldData) => [...oldData, data.data.createChatroomUser])
                    console.log('chatroomUser Initialized: ', data)
                })
        }

        var userExist = false
        var userId = ''
        
        user.chatrooms.map((chatroomUser) => {

            if(chatroomUser.chatroom == null) return
            if(chatroomUser.chatroom.code == params.code){
                
                if(userExist) return 
                
                setChatroomUser(chatroomUser)
                setChatroomUserInit(true)
                userExist = true
                userId = chatroomUser.id
                console.log('chatroomUser Fetched: ', chatroomUser)
                setChatroomUserId(chatroomUser.id)
                return 
                
            }
        })

        if(userExist){
            client.graphql({
                query: updateChatroomUser,
                variables: {
                    input: {
                        id: userId,
                        activeState: "ACTIVE-0"
                    }
                }
            }).then(data => {
                console.log('chatroomUser state updated: ', data)
            })
        }
        

        if(!userExist) {
            initializeChatroomUser()
        }

    }, [chatroomInit])

    useEffect(() => {

        if(!chatroomInit || !chatroomUserInit) return
        const onCreateChatroomUserSub = onCreateChatroomUserSubscription()
        console.log('subscribed to onUpdateChatroomUser')
        const onCreateMessageSub = onCreateMessageSubscription()
        console.log('subscribed to onCreateMessage')
        const onUpdateChatroomSub = onUpdateChatroomSubscription()
        console.log('subscribed to onUpdateChatroom')
        const onUpdateChatroomStateSub = onUpdateChatroomStateSubscription()
        console.log('subscribed to onUpdateChatroomState')
        const onUpdateChatroomUserSub = onUpdateChatroomUserSubscription()
        console.log('subscribed to onUpdateChatroomUser')
        
        return(() => {
            console.log('unsubscribing from onCreateMessage/onUpdateChatroom ...', onCreateMessageSub, onUpdateChatroomSub, onCreateChatroomUserSub, onUpdateChatroomStateSub)
            onCreateMessageSub.unsubscribe()
            onUpdateChatroomSub.unsubscribe()
            onCreateChatroomUserSub.unsubscribe()
            onUpdateChatroomStateSub.unsubscribe()

        })

    }, [chatroomInit, chatroomUserInit])

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

    
    const onCreateChatroomUserSubscription = () => {
        
        const sub = client
        .graphql({
            query: onCreateChatroomUser,
            variables: {
                chatroomId: chatroom.id
            }
        }).subscribe(data => {
            console.log('USER JOINED: ', data)
            if(!chatroom) return

            if(chatroomUsers.findIndex(user => user.id == data.data.onCreateChatroomUser.id) == -1){

                console.log('adding user')
                setChatroomUsers((oldData) => [...oldData, (data.data.onCreateChatroomUser)])
                
            }
            

        })
        console.log('onUpdateUserSub: ', sub)
        return sub;
    }

    const onUpdateChatroomUserSubscription = () => {

        const sub = client
            .graphql({
                query: onUpdateChatroomUser,
                variables: {
                    chatroomId: chatroom.id
                }
            }).subscribe((data) => {

                console.log('UPDATE: ', data)

                if(data.data.onUpdateChatroomUser.id == chatroomUser.id){

                    setChatroomUser(data.data.onUpdateChatroomUser)

                }


                setChatroomUsers((oldData) => {
                    
                    console.log('oldData: ',oldData)
                    const temp = oldData
                    var changedIndex = temp.findIndex((user) => user.id != data.data.onUpdateChatroomUser.id)
                    console.log('Update user index: ', changedIndex)
                    if(oldData[0].id == data.data.onUpdateChatroomUser.id) changedIndex = 0;
                    if(changedIndex == -1) return [...oldData]
                    console.log('user before: ', temp[changedIndex])

                    if(data.data.onUpdateChatroomUser.points) temp[changedIndex].points = data.data.onUpdateChatroomUser.points
                    if(data.data.onUpdateChatroomUser.state) temp[changedIndex].state = data.data.onUpdateChatroomUser.state

                    console.log('user after: ', temp[changedIndex])
                    return temp
                    


                })

            })
    }
    
    const onCreateMessageSubscription = () => {
        return client
        .graphql({
            query: onCreateChatroomMessage,
            variables: {
                chatroomId: chatroom.id
            }
        }).subscribe(data => {
            console.log('got message: ', data)
            console.log('filtering user: ' , chatroomUserId)
            if(onCreateChatroomMessage != null && data.data.onCreateChatroomMessage.chatroomUser.id != chatroomUserId){
                setChatroomMessages((oldMessages) => ([
                    
                    ...oldMessages,
                    data.data.onCreateChatroomMessage

                ]))

            }else if(data.data.onCreateChatroomMessage.type.startsWith('GUESS')){
                setChatroomMessages((oldMessages) => ([
                    
                    ...oldMessages,
                    data.data.onCreateChatroomMessage

                ]))   

            }else if(data.data.onCreateChatroomMessage.type == 'GUESS-CORRECT'){
                setChatroomMessages((oldMessages) => ([
                    
                    ...oldMessages,
                    data.data.onCreateChatroomMessage

            ]))

            const el = document.getElementById('chat-container');
            if (el) {
                el.scrollTop = el.scrollHeight;
              }


        }})
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
            }



            
            setChatroomState(newState)
            if(data.data.onUpdateChatroomState.promptId) fetchPrompt(data.data.onUpdateChatroomState.promptId)
        })
    }
    
    

    const handleChatInput = (e : React.FormEvent<HTMLInputElement>) => {

        setChatInput(e.currentTarget.value)
    }

    const handleChatKeyDown = (e : React.KeyboardEvent) => {
        
        if(e.key === 'Enter') {

            var input = chatInput

            // DEV ONLY
            if(chatInput == '/help'){
                input = "/launch /points"
            }
            if(chatInput == '/launch'){
                devLaunchStepFunction()
                input = 'Game Launched'
            }
            if(chatInput == '/points'){
                devAddPoints()
                input = 'Points Added'
            }
            
            client.graphql({
                query: createChatroomMessage,
                variables: {
                    input: {
                        chatroomId: chatroom.id,
                        createdAt: new Date().toISOString(),
                        content: input,
                        chatroomUserId: chatroomUser.id,
                        ttl: getTtlFromMinutes(60),
                        type: 'CHAT'
                    }
                }
            })


            const newMessage: ChatroomMessage = {
                __typename: 'ChatroomMessage',
                id: new Date().getTime().toLocaleString(),
                content: input,
                chatroomUserId: chatroomUser.id,
                chatroomId: chatroom.id,
                createdAt: new Date().toISOString(),
                type: 'CHAT',
                ttl: 0,
                chatroomUser: chatroomUser
            }
            setChatroomMessages((oldMessages) => [...oldMessages, newMessage])


            


            setChatInput('')
        }
    }

 
    useEffect(() => {

        if(!chatroom) return
        if(!chatroom.users) return

        console.log(chatroom.users)
        if(chatroom.users.length > userCount){
            
            // audio.play()
            
            
        }


        setUserCount(chatroom.users.length)
    }, [chatroom])
    

    const devLaunchStepFunction = () => {
        console.log('dev button clicked')

        const temp = client.graphql({
            query: executeLaunchGame,
            variables: {
                input: {
                    chatroomStateId: chatroomState.id
                }
            }
        }).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.error('dev button error: ',err)
        })
    }

    const devAddPoints = () => {
        console.log('dev button 2 clicked')

        const temp = client.graphql({
            query: executeUserAnswer,
            variables: {
                input: {
                    chatroomId: chatroom.id,
                    chatroomUserId: chatroomUser.id,
                    chatroomUserTtl: chatroomUser.ttl,
                    points: 1000,
                    userId: chatroomUser.userId,
                    chatroomStateId: chatroomState.id,
                    lastRound: chatroomState.round
                }
            }
        }).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.error('dev button error: ',err)
        })
    }

    if(!chatroomInit || isLoading) return <div>loading...</div>

    return(
        <div className='grid grid-cols-5 w-screen h-screen'>
            
            <div className='col-span-4 w-full h-full flex flex-col justify-between overflow-hidden'>

                
                <div className='w-full h-[5vh] bg-gray-800 shadow-md shadow-gray-900 flex flex-row'>
                    
                    
                    <img src="/ml-icon.svg" alt="" className='h-[70%] my-auto px-3 cursor-pointer' onClick={() => {setUserInactive(); navigate('/arcade'); }} />
                
                    <div 
                    className='text-[2vh] align-middle text-start my-auto font-modesto pr-5 cursor-pointer'  
                    onClick={() => {navigator.clipboard.writeText(`https://www.mobiledle.com/arcade/${params.code}`); setLinkTooltip('Link Copied!') }}
                    onMouseLeave={() => setLinkTooltip('Copy to Clipboard')}
                    data-tooltip-id="link-tooltip"
                    data-tooltip-content={linkTooltip}
                    data-tooltip-float={true}
                    data-tooltip-offset={30}
                    data-tooltip-variant='light'
                    data-tooltip-place="bottom">
                    
                        <Tooltip id='link-tooltip' className='z-10'></Tooltip>
                        MOBILEDLE.COM/ARCADE/<span className='text-orange-200'>{params.code}</span>
                    </div>

                    <div 
                    className='w-full bg-gray-700 font-modesto text-start flex flex-row justify-between text-[2vh] pr-5'
                    
                    
                    >

                        <span className='my-auto ps-5'><span>{(round == 0)? "LOBBY": "Round " + round}:  {chatroomState.currentState}</span></span>
                        <span className='my-auto flex flex-row cursor-default' onMouseEnter={() => {
                        setUsersTooltip((chatroomUsers.map((user) => user.user.username.toString()).join("\n")))
                    }}
                        data-tooltip-id="users-tooltip"
                        data-tooltip-delay-show={100}
                        data-tooltip-float={true}
                        data-tooltip-offset={30}
                        data-tooltip-variant='light'
                        data-tooltip-place="bottom">{(chatroomUsers) ? chatroomUsers.length: 0} 
                        
                        <IoPersonSharp className='my-auto ms-2' />
                        
                        </span>
                        <Tooltip id='users-tooltip' className='z-10 flex flex-col'>{chatroomUsers.map((user) => {

                            return <div>{user.user.username}</div>

                        })}</Tooltip>
                    </div>


                </div>
                <div 
                className='h-1'
                
                data-tooltip-id="timer-tooltip"
                data-tooltip-delay-show={100}
                data-tooltip-float={true}
                data-tooltip-offset={30}
                data-tooltip-variant='light'
                data-tooltip-place="bottom"
                
                >
                    <ProgressBar value={timer} maxValue={(prompt)?prompt.timeLimit*1000: 100000000} />
                    <Tooltip id='timer-tooltip' className='z-10 text-xl font-nova-bold'>{Math.floor(timer/1000).toString()}</Tooltip>
                </div>
                {/* <div className='bg-neutral-400 p-5 gap-5 flex flex-row'>
                    <span className='text-xl my-auto text-black font-nova-bold'>Dev Mode: </span>
                    <button onClick={
                        devButton
                    }>1: LAUNCH GAME</button>
                    <button onClick={
                        devButton2
                    }>2: ADD POINTS</button>
                </div> */}

                <div className='h-full w-full flex flex-row p-5'>
                    

                    <div className='top-0 left-0 h-full -z-10 ps-5 text-sm text-nowrap '>

                        {(chatroomUsers == null)? '' :chatroomUsers.sort((a,b) => a.points> b.points ? -1 : 1).map((user) => {

                            return (
                            
                            <div key={user.id} className='flex'>

                                {user.user.username}:   {user.points}
                                
                            </div>
                        
                        )
                        })}
                    
                    </div>

                    <GameArea 
                    chatroom={chatroom} chatroomMessages={chatroomMessages} chatroomState={chatroomState} chatroomUser={chatroomUser} 
                    chatroomUsers={chatroomUsers} prompt={prompt} setPrompt={setPrompt} round={round} characters={characters}/>
                    



                </div>
            </div>

            <div className='bg-gray-900 bg-opacity-30 shadow-lg shadow-black w-full h-screen flex flex-col justify-between'>
                <div id='chat-container' ref={chatRef} className='flex flex-col overflow-y-auto mt-auto w-full text-start ps-5 overflow-x-hidden'>

                    {chatroomMessages.map((message) => {

                        if(message.type == 'GUESS-CORRECT' ){

                            return <div key={message.id} className='text-lg leading-5 text-orange-300 mb-3'>
                                <span className='font-nova-bold text-neutral-300'>{message.chatroomUser.user.username}</span> guessed it!


                            </div>

                        }

                        return( 
                        <div key={message.id} className={`${message.type.startsWith("GUESS")?'text-neutral-500': 'text-neutral-200'} flex flex-col leading-5`}>
                            <div className='text-xs'>
                                {(message.chatroomUser) ? message.chatroomUser.user.username: ''}
                            </div>
                            <div className={`text-lg mb-3 break-all flex h-5`}>
                                {(message.type.split('-')[2]) == null ?'' :

                                    <div className='px-1 '>
                                        <CachedImage imgKey={characters[parseInt((message.type.split('-')[2]))-1].imageKeys.icons[0]}  className='max-h-full' />
                                    </div>

                                
                                
                                }
                                <div className='my-auto'>
                                {message.content}

                                </div>
                            </div>
                        </div>
                        )
                    })}
   

                </div>
                <div className='mt-4 border-2 border-t-neutral-600 border-transparent'>
                    <input onChange={handleChatInput} onKeyDown={handleChatKeyDown} value={chatInput} className='w-full focus:outline-none rounded-t-[0.1rem] bg-neutral-900 h-12 text-white ps-5 text-lg' type="text" placeholder='Type Here' />
                </div>

            </div>
                
        </div>
    )

}


