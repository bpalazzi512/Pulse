import Gradient from "./Gradient";
import { HouseIcon, CirclePlusIcon, CircleUserIcon } from "lucide-react";
import { Link } from 'react-router';


export function BottomPanel() {
    return (
        <Gradient className="rounded-xl flex items-center justify-between w-96 py-2 px-10"> 
            
            <Link to="/dashboard/hot">
                <HouseIcon className="text-white" size={25}/>
            </Link>

            <Link to="/create">
                <CirclePlusIcon className="text-white" size={50}/>
            </Link>

            <Link to="/profile">
                <CircleUserIcon className="text-white" size={25}/>
            </Link>

        </Gradient>
    );
}
