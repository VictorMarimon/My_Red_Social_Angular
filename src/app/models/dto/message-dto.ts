export class MessageDTO {
    id:number;
    message:string;
    checked:boolean;
    created_at: Date;
    user_sender_id: number;
    user_receiver_id: number;
}
