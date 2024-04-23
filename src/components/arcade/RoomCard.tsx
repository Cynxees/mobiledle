import { FunctionComponent } from "react"
import { Chatroom } from "../../API"
import { Link } from "react-router-dom"

interface RoomCardProps {
    room : Chatroom
}


const RoomCard: React.FC<RoomCardProps> = ({
    room
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
                <button>Join</button>
            </Link>
            

        </div>   
        
    </div>


)

export default RoomCard