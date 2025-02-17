import { Post } from "./post";

export class Tag {
    id: number;
    tag:string;

    //manyToOne
    post_tags: Post;

    constructor(){}
}
