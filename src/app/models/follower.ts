import { User } from "./user";

export class Follower {
    id: number;
    created_at:boolean;

    //manyToOne
    user_follower: User;
    user_following: User;

    constructor(){}
}
