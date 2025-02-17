import { Post } from "./post";

export class Image {
    id:number;
    image:string;

    //manyToOne
    post_images: Post;

    constructor(){}
}
