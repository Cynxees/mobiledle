import { FunctionComponent } from "react"
import { Chatroom, User } from "../../API"
import { Link } from "react-router-dom"
import { Client } from "aws-amplify/api"
import { updateUser } from "../../graphql/mutations"

interface RoomCardProps {
    room : Chatroom
    username?: string
    usernameChanged?: boolean
    user?: User
    client?: Client
}


const RoomCard: React.FC<RoomCardProps> = ({
    room,
    username,
    usernameChanged,
    user,
    client
}) => (

    

    <div className="text-left">

        <div className="grid grid-cols-6">

            <div>
            {room.code} 
            </div>
            <div className="border pl-5 border-y-transparent border-r-transparent border-l-gray-500 col-span-2">
            {room.name} 
            </div>
            <div 
            className={`text-center text-orange-100 mr-5 
            ${(room.chatroomState) ? 
            (room.chatroomState.currentState == "PLAYING")? "text-orange-300" : 
            "text-green-300" : 'text-green-300'}`}>


            {(room.chatroomState) ? room.chatroomState.currentState: "LOBBY"}
            </div>
            <div>
            {room.users ? room.users.length.toString() + ((room.users.length > 1) ? " users" : " user") : "empty"}    

            </div>
            <Link to={'/arcade/'+room.code}>
                <button 
                className="h-[80%] flex items-center my-auto mx-auto text-orange-300"
                onClick={() =>{

                    if(usernameChanged == null) return
                    if(!usernameChanged) return
                    
                    console.log("changing username")
                    client.graphql({
                        query: updateUser,
                        variables: {
                            input: {
                                id: user.id,
                                username: username
                            }
                        }
                    }).then((data) => {
                        console.log("changed username: ", data)
                    })
                    


                }}>Join</button>
            </Link>
            

        </div>   
        
    </div>


)

export default RoomCard