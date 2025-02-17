import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDTO } from '../models/dto/comment-dto';
import { CommentPostDto } from '../models/dto/comment-post-dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private urlBase = 'http://localhost:8090/app/comment';

  constructor(private clientHttp:HttpClient) { }

  getComments(): Observable<Comment[]>{
    return this.clientHttp.get<Comment[]>(this.urlBase);
  }

  addComment(newComment: CommentDTO): Observable<Comment>{
    return this.clientHttp.post<Comment>(this.urlBase, newComment, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    });
  }

  deleteComment(id: number): Observable<{deleted: boolean}>{
    return this.clientHttp.delete<{deleted: boolean}>(`${this.urlBase}/${id}`);
  }

  commentsPost(id_post: number): Observable<CommentPostDto[]>{
    return this.clientHttp.get<CommentPostDto[]>(`${this.urlBase}/${id_post}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    });
  }
}
