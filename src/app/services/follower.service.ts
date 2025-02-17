import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Follower } from '../models/follower';
import { FollowerDTO } from '../models/dto/follower-dto';
import { url } from 'inspector';

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
    return this.clientHttp.post<Follower>(this.urlBase, newFollow);
  }

  deleteFollow(id: number): Observable<{deleted: boolean}>{
    return this.clientHttp.delete<{deleted: boolean}>(`${this.urlBase}/${id}`);
  }
}
