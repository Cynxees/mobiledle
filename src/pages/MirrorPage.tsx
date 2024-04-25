import questions from "../constant/mirror/questions.json"
import identity from "../constant/mirror/identity.json"
import { useState } from "react"

const MirrorPage = () => {
  const [userTraits, setUserTraits] = useState({
    "Brave": 0,
    "Clever": 0,
    "Sly": 0,
    "Loyal": 0,
    "Honorable": 0,
    "Adventurous": 0,
    "Wise": 0,
    "Calm": 0,
    "Mysterious": 0, 
    "Charismatic": 0,
    "Determined": 0,
    "Resourceful": 0,
    "Noble": 0
  })


  return (
    <div>MirrorPage</div>
  )
}

export default MirrorPage