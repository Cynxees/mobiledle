import { IoMdSettings } from "react-icons/io";
import { FaLanguage } from "react-icons/fa6";

export default function Navbar(){

    return (


        <nav className="flex justify-between items-center">
            <IoMdSettings />
            <p className="text-3xl text-green-400">Mobiledle</p>
            <FaLanguage />
        </nav>
    
    )

}