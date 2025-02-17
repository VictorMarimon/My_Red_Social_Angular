import { Like } from "./like";

export class TypeInteraction {
    id: number;
    type: string;

    //oneToMany
    likes: Like[];

    constructor(){}
}
