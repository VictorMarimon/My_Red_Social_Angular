import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeInteraction } from '../models/type-interaction';

@Injectable({
  providedIn: 'root'
})
export class TypeInteractionService {

  private urlBase = 'http://localhost:8090/app/type_int';

  constructor(private clientHttp:HttpClient) { }

  getTyperInteraction(): Observable<TypeInteraction[]>{
    return this.clientHttp.get<TypeInteraction[]>(this.urlBase);
  }
}
