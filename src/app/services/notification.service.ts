import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationDTO } from '../models/dto/notification-dto';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private urlBase = 'http://localhost:8090/app/notification';

  constructor(private clientHttp: HttpClient) { }

  getNotifications(): Observable<Notification[]>{
    return this.clientHttp.get<Notification[]>(this.urlBase);
  }

  addNotification(newNotification: NotificationDTO): Observable<Notification>{
    return this.clientHttp.post<Notification>(this.urlBase, newNotification);
  }

  deleteNotification(id:number): Observable<{deleted: boolean}>{
    return this.clientHttp.delete<{deleted: boolean}>(`${this.urlBase}/${id}`);
  }
}
