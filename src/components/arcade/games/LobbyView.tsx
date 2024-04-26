import { ChatroomState } from "../../../API"
import { post } from 'aws-amplify/api';

interface LobbyViewInput {

    chatroomState : ChatroomState
    
}




export default function LobbyView({chatroomState}: LobbyViewInput){

    const handleClickStartGame = async () => {

        
        console.log('button click: ', chatroomState)

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
        console.log('POST call succeeded');
        console.log(response);

        
    }

    return <div>



        <button className='w-52 align-bottom mb-[5%] border-1 border-white mx-auto' onClick={handleClickStartGame}>Start Game</button>
        



    </div>



}