import Gradient from "../components/Gradient";
import { Link } from "react-router";

export function Home() {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold">Pulse</h1>
            <Link to="/login">
                <Gradient className="flex items-center justify-center mt-4 w-72 h-10 rounded-full text-white font-thin">
                    Login
                </Gradient>
            </Link>
            <Link to="/signup">
                <Gradient className="flex items-center justify-center  mt-4 p-0.5 w-72 h-10 rounded-full text-primary-red font-thin">
                    <div className="flex items-center justify-center rounded-full bg-white w-full h-full">
                        Register
                    </div>
                </Gradient>
            </Link>
        </div>
    );
}