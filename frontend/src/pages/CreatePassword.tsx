import { useParams } from "react-router";
import Gradient from "../components/Gradient";
import { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function CreatePassword() {
    const { token } = useParams<{ token: string }>();
    const [data, setData] = useState<any>({});
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirm-password") as string;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register/confirm/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: data.registration.email, password }),
        });

        if (response.ok) {
            toast.success("Password set successfully");
            navigate("/login");
            
        } else {
            toast.error("Error setting password");
        }
    
    }

    const getRegistrationInfo = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/registration/${token}`, { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log(await response)
        return await response.json();
    }

    useEffect(() => {  
        getRegistrationInfo().then((response) => {
            console.log(response);
            setData(response);
        });
    }, [])

    
    



    if (data.registration && new Date(data.registration.expiration) > new Date()) {
        return (
            <div className="flex flex-col justify-center items-center h-screen w-screen">
                <h1 className="text-4xl font-semibold align-center text-center">{data.registration.is_password_reset ? "Password Reset" : "Create a Password"}</h1>
                <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
                    
                    <div>
                        <label htmlFor="password" className="text-primary-red">Password</label>
                        <TextInput type="password" name="password" />
                    </div>
                    
                    <div>
                        <label htmlFor="confirm-password" className="text-primary-red">Confirm Password</label>
                        <TextInput type="password" name="confirm-password" />
                    </div>
                    <button type="submit" className="">
                        <Gradient className="flex items-center justify-center mt-4 w-72 h-10 rounded-full text-white font-thin">
                            {data.registration.is_password_reset ? "Reset Password" : "Create Password"}
                        </Gradient>
                    </button>
                </form>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen text-center">
            <h1 className="text-4xl font-semibold align-center text-center">Invalid Registration Link</h1>
            <h3>Registration links are valid for only an hour, check to see if yours expired!</h3>
        </div>
    );

}