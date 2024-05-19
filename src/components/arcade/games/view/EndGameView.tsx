import { generateClient } from "aws-amplify/api"
import { ChatroomState, ChatroomUser } from "../../../../API"
import { executeLaunchGame } from "../../../../graphql/mutations"

interface EndGameViewInput {

    winnerId: string,
    chatroomState: ChatroomState,
    chatroomUsers: ChatroomUser[],
    
}

export default function EndGameViewInput(  {winnerId, chatroomState, chatroomUsers} : EndGameViewInput){


    const client = generateClient()

    

    const handleClickStartGame = async () => {

        
        console.log('launch button click: ', chatroomState)

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
            console.error('launch button error: ',err)
        })

        
    }

    return <div className="h-full w-full flex flex-col align-bottom">

        <div className="my-auto text-6xl text-orange-200">

            {chatroomUsers.find((user) => user.id == winnerId).user.username} Won
        </div>

        <button className='w-52 align-bottom my-auto mb-[5%] border-1 border-white mx-auto' onClick={handleClickStartGame}>Play Again</button>

    </div>



}