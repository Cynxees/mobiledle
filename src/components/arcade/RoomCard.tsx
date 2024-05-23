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
    client?: Client,
    joinable: boolean
}


const RoomCard: React.FC<RoomCardProps> = ({
    room,
    username,
    usernameChanged,
    user,
    client,
    joinable
}) => { 
    
    // const userCount = room.users.filter((user) => {
    //     return user.activeState != "BANNED" && user.state != "BANNED" && user.activeState != "INACTIVE"
    // }).length

    const userCount = Math.floor(Math.random()*10)

    const cardColor = 'rgb(255,' + (175-userCount*10) +',' + (70-userCount*10) +')'



    
    return (

    

    <div className="w-full my-5 bg-white bg-opacity-5" style={{'color': cardColor }}>

        <div className='border-[3px] rounded-xl p-5 flex flex-col ' style={{'borderColor': cardColor}}>
            <div className="flex gap-2">
                <span className="font-nova-bold text-3xl">
                    {room.code} 

                </span>
                
                <span className="mt-auto text-lg font-nova-bold text-white">

                    {room.users ? userCount.toString() + ((room.users.length > 1) ? "/10" : "/10") : "0/10"}
                </span>
                
                

            </div>
            <span className="font-nova text-xl mr-auto text-white mb-5">
                {room.name}

            </span>

            <div className="flex">

                <div className="text-gray-500 text-xl font-nova-bold mt-auto mb-2">
                    {(room.chatroomState) ? room.chatroomState.currentState.split('-')[0]: "LOBBY"}
                </div>

                <Link className="ms-auto" to={joinable ? '/arcade/'+room.code : ''}>
                    <button 
                    className="ms-auto bg-white bg-opacity-5 text-white font-nova-bold px-10"
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

        
    </div>


)}

export default RoomCard