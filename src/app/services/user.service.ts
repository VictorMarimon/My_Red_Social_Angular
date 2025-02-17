import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase = 'http://localhost:8090/app/users';

  constructor(private clientHttp: HttpClient) {}

  getUsers(): Observable<User[]>{
    return this.clientHttp.get<User[]>(this.urlBase);
  }

  addUser(newUser: User): Observable<User>{
    return this.clientHttp.post<User>(this.urlBase, newUser);
  }

  updateUser(updatedUser: User, id:number): Observable<User>{
    return this.clientHttp.put<User>(`${this.urlBase}/${id}`, updatedUser);
  }

  deleteUser(id: number): Observable<{deleted: boolean}>{
    return this.clientHttp.delete<{deleted: boolean}>(`${this.urlBase}/${id}`);
  }

  getUserSession(username: string): Observable<User>{
    return this.clientHttp.get<User>(`${this.urlBase}/${username}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    })
  }
}
