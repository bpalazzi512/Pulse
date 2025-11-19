import Gradient from "../components/Gradient";
import TextInput from "../components/TextInput";
import { useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";


export function Signup() {
    const [pending, setPending] = useState(false);
    const navigate = useNavigate();


    const createRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
        setPending(true);
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        console.log(import.meta.env.VITE_API_URL);
        console.log("hello")
        const response = await fetch(import.meta.env.VITE_API_URL + "/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        setPending(false);
        if (response.ok) {
            navigate("/signup/confirmation");
        } else {
            toast.error("Error creating registration");
        }
        

    }

    

    

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold align-center text-center">Create an <br /> Account!</h1>

            <form action="javascript:void(0);" method="post" onSubmit={createRegistration} className="mt-10 space-y-4">
                <div>
                    <label htmlFor="email" className="text-primary-red">Northeastern Email</label>
                    <TextInput type="email" name="email" />
                </div>

                
                <button type="submit" className="">
                    <Gradient className="flex items-center justify-center mt-4 w-72 h-10 rounded-full text-white font-thin">
                        {pending ? <LoaderCircleIcon className="animate-spin ml-2" size={20} /> : "Sign Up"}
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

            
            
            
        </div>
    )
}