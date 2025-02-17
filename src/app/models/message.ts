import { User } from "./user";

export class Message {
    id:number;
    message:string;
    checked: boolean;
    created_at: Date;

    //manyToOne
    user_sender: User;
    user_receiver: User;

    constructor(){}
}
