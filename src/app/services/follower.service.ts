import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Follower } from '../models/follower';
import { FollowerDTO } from '../models/dto/follower-dto';
import { FollowersUserDto } from '../models/dto/followers-user-dto';
import { FollowsDto } from '../models/dto/follows-dto';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  private urlBase = 'http://localhost:8090/app/follow';

  constructor(private clientHttp:HttpClient) { }

  getFollowers():Observable<Follower[]>{
    return this.clientHttp.get<Follower[]>(this.urlBase);
  }

  addFollow(newFollow: FollowerDTO): Observable<Follower>{
    return this.clientHttp.post<Follower>(this.urlBase, newFollow, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    });
  }

  deleteFollow(idFollower: number, idFollowing: number): Observable<{deleted: boolean}>{
    return this.clientHttp.delete<{deleted: boolean}>(`${this.urlBase}/${idFollower}/${idFollowing}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    });
  }

  getFollowersUser(id: number): Observable<FollowersUserDto>{
    return this.clientHttp.get<FollowersUserDto>(`${this.urlBase}/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    })
  }

  getUserFollowers(id:number):Observable<FollowsDto[]>{
    return this.clientHttp.get<FollowsDto[]>(`${this.urlBase}/followers/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    });
  }

  getUserFollowing(id:number):Observable<FollowsDto[]>{
    return this.clientHttp.get<FollowsDto[]>(`${this.urlBase}/following/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    });
  }
}
