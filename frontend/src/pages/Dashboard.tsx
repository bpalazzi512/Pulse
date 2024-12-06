import { useEffect, useState } from "react";
import { BottomPanel } from "../components/BottomPanel";
import {  Post } from "../components/PublicPost";
import { useAuth } from "../components/AuthProvider";
import {  Navigate, Link } from "react-router";
import { PostsDisplay } from "../components/PostsDisplay";


type PostsType = "hot" | "new";


export function Dashboard({ variant }  : { variant : PostsType}) {
    const [posts, setPosts] = useState<Post[]>([]);
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login"/>
    }

    

    const getPosts = async () => {
        let response;
        if (variant === "new") {
            response = await fetch(`${import.meta.env.VITE_API_URL}/posts/new`);
        } else {
            response = await fetch(`${import.meta.env.VITE_API_URL}/posts/hot`);
        }

        let posts = (await response.json()).posts;

        response = await fetch(`${import.meta.env.VITE_API_URL}/votes/user/${user.id}`);
        let votes = (await response.json()).votes;
        
        
        posts = posts.map((post : {id : number, content: string, user_id: number, votes : number}) => {
            if (votes.some((vote : {post_id : number}) => vote.post_id === post.id)) {
                return {
                    id: post.id,
                    content: post.content,
                    num_votes: post.votes,
                    user_vote: votes.find((vote : {post_id : number}) => vote.post_id === post.id).vote_type,
                }
            }
            return {
                id: post.id,
                content: post.content,
                num_votes: post.votes,
                user_vote: undefined,
            }
        })
        setPosts(posts);
    }

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        getPosts();
    }, [variant])

    
    
    return (
        <div className="w-screen h-screen relative">
            <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-40">
                <BottomPanel/>
            </div>
            <h1 className="text-4xl font-bold mt-4 ml-4">Pulse</h1>
            <div className="w-full h-full flex flex-col items-center space-y-2">
                <div className="w-48 flex justify-evenly items-center">
                    <Link to="/dashboard/hot" className={`text-lg ${variant === "hot" ? "text-primary-red" : "text-gray-500"}`}>Hot</Link>
                    <Link to="/dashboard/new" className={`text-lg ${variant === "new" ? "text-blue-500" : "text-gray-500"}`}>New</Link>
                </div>
                <PostsDisplay initial_posts={posts} user={user}/>
            </div>
        </div>
    )
}