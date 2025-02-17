import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeNotification } from '../models/type-notification';

@Injectable({
  providedIn: 'root'
})
export class TypeNotificationService {

  private urlBase = 'http://localhost:8090/app/type_not';

  constructor(private clientHttp:HttpClient) { }

  getTypeNotification():Observable<TypeNotification[]>{
    return this.clientHttp.get<TypeNotification[]>(this.urlBase);
  }
}
