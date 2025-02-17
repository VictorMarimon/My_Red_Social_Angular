import { TypeNotification } from "./type-notification";
import { User } from "./user";

export class Notification {
    id:number;
    checked:boolean;
    created_at:Date;

    //manyToOne
    user_notifications: User;
    type_notification: TypeNotification;

    constructor(){}
}
