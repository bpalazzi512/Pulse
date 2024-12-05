import GradientButton from "./GradientButton";
import {ThumbsUpIcon, ThumbsDownIcon} from 'lucide-react';


export interface Post {
    id: number;
    content: string;
    num_votes: number;
    user_vote: string | null | undefined;

}

export enum Vote {
    UPVOTE = "upvote",
    DOWNVOTE = "downvote"
}

export function PublicPost({post, onToggleVote} : {post : Post, onToggleVote : (vote : Vote) => void}) {
    let vote : number = 0;
    if (vote) {
        if (post.user_vote === "upvote") {
            vote = 1;
        } else {
            vote = -1;
        }
    }

    
    return (
        <div className="w-96 h-fit shadow-md rounded-lg border border-slate-100 p-4">
            <p>{post.content}</p>
            <div className="flex justify-center items-center space-x-10 w-fit mt-4 relative">
                <GradientButton className="px-4 py-2" onClick={() => onToggleVote(Vote.UPVOTE)}>
                    <ThumbsUpIcon className="" size={20} fill={ post.user_vote === Vote.UPVOTE ? "green" : "transparent"}/>
                </GradientButton>
                <span className="">{post.num_votes}</span>
                <GradientButton className="px-4 py-2" onClick={() => onToggleVote(Vote.DOWNVOTE)}>
                    <ThumbsDownIcon fill={ post.user_vote === Vote.DOWNVOTE ? "red" : "transparent"} size={20}/>
                </GradientButton>
            </div>
        </div>
    )
}