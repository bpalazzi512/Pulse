import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { Post } from "../components/PublicPost";
import { BottomPanel } from "../components/BottomPanel";
import { PostsDisplay } from "../components/PostsDisplay";
import { useNavigate } from "react-router";


export function Profile() {
    const { user, logout } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    const getPosts = async () => {
        let response = await fetch(import.meta.env.VITE_API_URL + `/posts/user/${user!.id}`);
        let posts = (await response.json()).posts;
        response = await fetch(`${import.meta.env.VITE_API_URL}/votes/user/${user!.id}`);
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

    const handleLogout = () => {
        logout();
        navigate('/')
    }
    

    
    return (
        <div className="w-screen h-screen relative">
            <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2">
                <BottomPanel/>
            </div>
            
            <h1 className="text-4xl font-bold mt-4 ml-4">Pulse</h1>

            <div className="w-full flex flex-col items-center">
                <div className="w-96 h-fit  rounded-lg ">
                <button className=" bg-primary-red text-white rounded-full px-4 py-2" onClick={logout}>Logout</button>
                    <h2 className="text-3xl font-semibold my-4">Your Posts</h2>
                    
                </div>
                <PostsDisplay initial_posts={posts} user={user!}/>

            </div>
            

        </div>
    );
}