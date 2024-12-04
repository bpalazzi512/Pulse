import { useEffect, useState } from "react";
import { BottomPanel } from "../components/BottomPanel";
import { PublicPost, Post } from "../components/PublicPost";


export function Dashboard() {
    const [posts, setPosts] = useState<Post[]>([]);

    const getPosts = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
        let posts = (await response.json()).posts;
        console.log(posts);
        console.log(typeof posts)
        posts = posts.map((post : {id : number, content: string, user_id: number}) => {
            return {
                id: post.id,
                content: post.content,
                num_votes: 0,
                user_vote: null,
                toggleUpvote: () => {},
                toggleDownvote: () => {},
            }
        })
        setPosts(posts);
    }

    useEffect(() => {
        getPosts();
    }, []);

    const onToggleUpvote = async () => {
        
    }


    return (
        <div className="w-screen h-screen relative">
            <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2">
                <BottomPanel/>
            </div>
            <h1 className="text-4xl font-bold mt-4 ml-4">Pulse</h1>
            <div className="w-full h-full flex flex-col items-center space-y-2">
                {posts.map((post) => {
                    return <PublicPost key={post.id} post={post}/>
                })}
            </div>
        </div>
    )
}