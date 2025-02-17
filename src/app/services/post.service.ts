import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { PostDTO } from '../models/dto/post-dto';
import { PostsFollowingUsers } from '../models/dto/posts-following-users';

@Injectable({
  providedIn: 'root'
})
export class PostService {

    private urlBase='http://localhost:8090/app/posts';
  
    constructor(private clienteHttp:HttpClient) {}
  
    getPosts(): Observable<Post[]>{
      return this.clienteHttp.get<Post[]>(this.urlBase);
    }
  
    addPost(newPost: PostDTO): Observable<Post>{
      return this.clienteHttp.post<Post>(this.urlBase, newPost);
    }
  
    deletePost(id: number): Observable<{deleted: boolean}>{
      return this.clienteHttp.delete<{deleted: boolean}>(`${this.urlBase}/${id}`);
    }

    getPostsUsersFollowing(): Observable<PostsFollowingUsers[]>{
      return this.clienteHttp.get<PostsFollowingUsers[]>(`${this.urlBase}/juanperez`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
        },
        withCredentials: true  
      })
    }
}
