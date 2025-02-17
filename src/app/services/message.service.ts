import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { MessageDTO } from '../models/dto/message-dto';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private urlBase = 'http://localhost:8090/app/messages';

  constructor(private clientHttp: HttpClient) { }

  getMessages(): Observable<Message[]>{
    return this.clientHttp.get<Message[]>(this.urlBase);
  }

  addMessage(newMessage: MessageDTO): Observable<Message>{
    return this.clientHttp.post<Message>(this.urlBase, newMessage);
  }

  deleteMessage(id: number):Observable<{deleted: boolean}>{
    return this.clientHttp.delete<{deleted: boolean}>(`${this.urlBase}/${id}`);
  }
}
