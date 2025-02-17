import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlRegister = 'http://localhost:8090/auth/register';
  private urlLogin = 'http://localhost:8090/auth/login';

  constructor(private http: HttpClient) {}

  login(userData: any): Observable<any> {
    return this.http.post(this.urlLogin, userData);
  }

  register(userData: any): Observable<any> {
    return this.http.post(this.urlRegister, userData);
  }
}
