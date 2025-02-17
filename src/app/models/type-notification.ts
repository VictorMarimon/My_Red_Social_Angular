export class TypeNotification {
    id: number;
    type: string;

    //oneToMany
    notifications: Notification[];

    constructor() {}
}
