import Gradient from "../components/Gradient";
import TextInput from "../components/TextInput";
import { Link } from "react-router";

export function Login() {

    function test(e : any) {
        e.preventDefault();
        alert("hi")
    }

    

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold align-center text-center">Welcome <br /> Back!</h1>

            <form onSubmit={test} className="mt-10 space-y-4">
                <div>
                    <label htmlFor="email" className="text-primary-red">Northeastern Email</label>
                    <TextInput type="email" name="email" />
                </div>

                <div className="">
                    <label htmlFor="password" className="text-primary-red">Password</label>
                    <TextInput name="password" type="password" />
                </div>

                <button type="submit" className="">
                    <Gradient className="flex items-center justify-center mt-4 w-72 h-10 rounded-full text-white font-thin">
                        Login
                    </Gradient>
                </button>
            </form>
            <Link to="/" className="underline-offset-4 hover:underline text-primary-red mt-3"><h3>Forgot Password?</h3></Link>

            
            
            
        </div>
    )
}