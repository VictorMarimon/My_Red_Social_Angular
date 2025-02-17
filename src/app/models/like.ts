import { Post } from "./post";
import { TypeInteraction } from "./type-interaction";
import { User } from "./user";

export class Like {
    id: number;
    active: boolean;
    created_at: Date;

    //manyToOne
    user_likes: User;
    post_likes: Post;
    type_like: TypeInteraction;

    constructor(){}
}
