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

        <div className="grid grid-cols-5 gap-5">

            <div>
            {room.code} 
            </div>
            <div className="border pl-5 border-y-transparent border-r-transparent border-l-gray-500 col-span-2">
            {room.name}
            </div>
            <div>
            {room.users ? room.users.length.toString() + ((room.users.length > 1) ? " users" : " user") : "empty"}    

            </div>
            <Link to={'/arcade/'+room.code}>
                <button onClick={() =>{

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