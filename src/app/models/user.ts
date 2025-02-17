import { Follower } from "./follower";
import { Like } from "./like";
import { Message } from "./message";
import { Post } from "./post";

export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    biography: string;
    photo_profile: string;
    created_at: string;
    birthday: string;
    rol: string;
    enabled: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    authorities: { authority: string }[];
    accountNonLocked: boolean;

    constructor(){}

}
