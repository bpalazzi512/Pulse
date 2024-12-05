

import { Post, PublicPost, Vote } from "./PublicPost";
import { useEffect, useState } from "react";
// Remove the import statement for 'User' from './AuthProvider'
import { User } from './AuthProvider'


export function PostsDisplay({ initial_posts, user }: { initial_posts: Post[], user : User }) {
    
    const [posts, setPosts] = useState<Post[]>([...initial_posts]);

    useEffect(() => {
        setPosts(initial_posts);
    }, [initial_posts]);
    


    const createVote = async (post_id : number, vote_type : Vote) => {
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/votes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                post_id,
                vote_type
            })
        });
        

        const data = await response.json();
        
        if (data.vote && data.vote.post_deleted) {
            setPosts(posts.filter((post) => post.id !== post_id));
        } else {
            let net = 0;
            if (vote_type === Vote.UPVOTE) {
                net = 1;
            } else {
                net = -1;
            }
            updatePost(post_id, vote_type, net);
        }
    }

    const deleteVote = async (post_id : number) => {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/votes/user/${user.id}`);
        let votes = (await response.json()).votes;
        const vote = votes.find((vote : {post_id : number}) => vote.post_id === post_id);
        
        response = await fetch(`${import.meta.env.VITE_API_URL}/votes/${vote.id}`, {
            method: 'DELETE',
        });
        //getPosts();
        const data = await response.json();
        
        if (data.vote && data.vote.post_deleted) {
            setPosts(posts.filter((post) => post.id !== post_id));
        } else {
            let net = 0;
            if (vote.vote_type === Vote.UPVOTE) {
                net = -1;
            } else {
                net = 1;
            }
            updatePost(post_id, null, net);
        }
    }

    const updateVote = async (post_id : number, vote : Vote) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/votes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                post_id,
                vote_type: vote
            })
        });
        const data = await response.json();
        
        if (data.vote && data.vote.post_deleted) {
            setPosts(posts.filter((post) => post.id !== post_id));
        } else {
            let net = 0;
            if (vote === Vote.UPVOTE) {
                net = 2;
            } else {
                net = -2;
            }
            updatePost(post_id, vote, net);
        }
        
    }

    const updatePost = (post_id : number, vote : Vote | null, net : number) => {

        setPosts(posts.map((post) => {
            if (post.id === post_id) {
                return {
                    ...post,
                    user_vote: vote,
                    num_votes: post.num_votes + net
                }
            }
            return post;
        }));
    }

    const onToggleVote = (post_id : number) => {
        return (async (vote : Vote) => {
            const post = posts.find((post : any) => post.id === post_id);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${post_id}`);
            const data = await response.json();
            if (!data.post) {
                setPosts(posts.filter((post) => post.id !== post_id));
                return;
            }
            if (post && post.user_vote) {
                if (post.user_vote === Vote.UPVOTE) {
                    if (vote === Vote.UPVOTE) {
                        await deleteVote(post_id);
                    } else {
                        await updateVote(post_id, Vote.DOWNVOTE);
                    }
                } else {
                    if (vote === Vote.DOWNVOTE) {
                        await deleteVote(post_id);
                    } else {
                        await updateVote(post_id, Vote.UPVOTE);

                    }
                }
            } else {
                await createVote(post_id, vote);
                //updatePost(post_id, vote);
            }
        })
    }

    if (posts.length === 0) {
        return <p className="pt-12 text-gray-500">Nothing here yet...</p>
    }



    return (
        <>
            {posts.map((post) => {
                return <PublicPost key={post.id} post={post} onToggleVote={onToggleVote(post.id)}/>
            })}
        </>
            
    )

}