import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserDto } from '../models/dto/user-dto';
import { url } from 'inspector';

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
    return this.clientHttp.post<User>(this.urlBase, newUser, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    });
  }

  updateUser(updatedUser: User, id:number): Observable<User>{
    return this.clientHttp.put<User>(`${this.urlBase}/${id}`, updatedUser, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    });
  }

  deleteUser(id: number): Observable<{deleted: boolean}>{
    return this.clientHttp.delete<{deleted: boolean}>(`${this.urlBase}/${id}`);
  }

  getUserSession(): Observable<User>{
    return this.clientHttp.get<User>(`${this.urlBase}/${sessionStorage.getItem('username')}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    })
  }

  getUsersNotFollowing(id:number):Observable<UserDto[]>{
    return this.clientHttp.get<UserDto[]>(`${this.urlBase}/follow/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    });
  }
}
