import { BottomPanel } from "../components/BottomPanel";
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router";
import Gradient from "../components/Gradient";
import { useState } from "react";
import { toast } from "react-toastify";
import { LoaderIcon } from "lucide-react";

export function Create() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    if (!user) {
        navigate("/login");
    }

    const updateContent = (e: any) => {
        if (e.target.value.length > 500) {
            return;
        }
        setContent(e.target.value);
    }

    const createPost = async () => {
        setLoading(true);
        const response = await fetch(import.meta.env.VITE_API_URL + "/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content, user_id: user!.id }),
        });
        if (response.ok) {
            toast.success("Post created successfully");
            setContent("");
        } else {
            
            toast.error("An error occurred");
        }
        setLoading(false);
    
    }
    

    
    return (
        <div className="w-screen h-screen relative">
            <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2">
                <BottomPanel/>
            </div>
            <h1 className="text-4xl font-bold mt-4 ml-4">Pulse</h1>

            <div className="w-full flex flex-col items-center">
                <div className="w-96 h-fit shadow-md rounded-lg border border-slate-100 mt-20 p-4">
                    <textarea value={content} onChange={updateContent} className="focus:outline-none w-full h-96 resize-none" placeholder="Start typing..." name="content" ></textarea>

                    <div className="w-full flex justify-between items-center">
                        <div className="space-x-4 w-36 flex relative text-gray-500">
                            <span>{content.length}</span>
                            <span className="absolute right-0 w-fit">/ 500 Characters</span>
                        </div>
                        <button onClick={createPost}>
                            <Gradient className="flex items-center justify-center h-10 px-14 py-4 rounded-full text-white font-thin">
                                {loading ? <LoaderIcon className="animate-spin"/> : "Post"}
                            </Gradient>
                        </button>
                        
                    </div>
                    
                </div>

            </div>
            

        </div>
    )
}