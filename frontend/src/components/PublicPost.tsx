import GradientButton from "./GradientButton";
import {ThumbsUpIcon, ThumbsDownIcon} from 'lucide-react';


export interface Post {
    id: number;
    content: string;
    num_votes: number;
    user_vote: string | null | undefined;
    toggleUpvote: () => void;
    toggleDownvote: () => void;

}

enum Vote {
    UPVOTE = "upvote",
    DOWNVOTE = "downvote"
}

export function PublicPost({post} : {post : Post}) {
    let vote : number = 0;
    if (vote) {
        if (post.user_vote === "upvote") {
            vote = 1;
        } else {
            vote = -1;
        }
    }

    const deleteVote = async () => {

    }

    const updateVote = async (id : number) => {
        
    }
    
    return (
        <div className="w-96 h-fit shadow-md rounded-lg border border-slate-100 p-4">
            <p>{post.content}</p>
            <div className="flex justify-center items-center space-x-4 w-fit mt-4">
                <GradientButton className="px-4 py-2">
                    <ThumbsUpIcon className="" size={20} fill={ vote == 1 ? "green" : "transparent"}/>
                </GradientButton>
                <span>{post.num_votes}</span>
                <GradientButton className="px-4 py-2">
                    <ThumbsDownIcon fill={ vote == -1 ? "red" : "transparent"} size={20}/>
                </GradientButton>
            </div>
        </div>
    )
}