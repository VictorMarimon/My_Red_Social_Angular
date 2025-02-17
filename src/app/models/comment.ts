import { Post } from "./post";
import { User } from "./user";

export class Comment {
    id: number;
    comment: string;
    created_at: Date;

    //manyToOne
    user_comments: User;
    post_comments: Post;

    constructor(){}
}
