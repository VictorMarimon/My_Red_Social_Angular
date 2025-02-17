import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from '../models/like';
import { LikeDTO } from '../models/dto/like-dto';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private urlBase = 'http://localhost:8090/app/like';

  constructor(private clientHttp: HttpClient) { }

  getLikes(): Observable<Like[]>{
    return this.clientHttp.get<Like[]>(this.urlBase);
  }

  addLike(newLike: LikeDTO): Observable<Like>{
    return this.clientHttp.post<Like>(this.urlBase, newLike);
  }

  deleteLike(id: number): Observable<{deleted: boolean}>{
    return this.clientHttp.delete<{deleted: boolean}>(`${this.urlBase}/${id}`);
  }
}
