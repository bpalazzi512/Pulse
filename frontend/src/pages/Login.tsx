import { useState } from "react";
import Gradient from "../components/Gradient";
import TextInput from "../components/TextInput";
import { Link } from "react-router";
import { LoaderIcon } from 'lucide-react';
import { toast } from "react-toastify";
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from 'react-router';

export function Login() {
    const [pending, setPending] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const test = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPending(true);
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const credentials = {email, password}
        const response = await login(credentials);
        setPending(false);
        
        if (response.success) {
            toast.success("Login successful");
            navigate("/dashboard");

        } else {
            toast.error("Login failed. Please check your credentials");
        }
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
                        {pending ? <LoaderIcon className="animate-spin ml-2" size={20} /> : "Login"}
                    </Gradient>
                </button>
                <Link to="/">
                    <Gradient className="flex items-center justify-center  mt-4 p-0.5 w-72 h-10 rounded-full text-primary-red font-thin">
                        <div className="flex items-center justify-center rounded-full bg-white w-full h-full">
                            Back
                        </div>
                    </Gradient>
                </Link>
            </form>
            <Link to="/" className="underline-offset-4 hover:underline text-primary-red mt-3"><h3>Forgot Password?</h3></Link>

            
            
            
        </div>
    )
}