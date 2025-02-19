import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { PostDTO } from '../models/dto/post-dto';
import { PostsFollowingUsers } from '../models/dto/posts-following-users';
import { PostUserDto } from '../models/dto/post-user-dto';

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
      return this.clienteHttp.post<Post>(this.urlBase, newPost, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
        },
        withCredentials: true  
      });
    }

    updatePost(id: number, updatedPost: PostDTO): Observable<PostDTO>{
      return this.clienteHttp.put<PostDTO>(`${this.urlBase}/${id}`, updatedPost, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
        },
        withCredentials: true  
      });
    }
  
    deletePost(id: number): Observable<{deleted: boolean}>{
      return this.clienteHttp.delete<{deleted: boolean}>(`${this.urlBase}/${id}`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
        },
        withCredentials: true  
      });
    }

    getPostsUsersFollowing(username:string): Observable<PostsFollowingUsers[]>{
      return this.clienteHttp.get<PostsFollowingUsers[]>(`${this.urlBase}/${username}`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
        },
        withCredentials: true  
      })
    }

    getPostsUser(): Observable<PostUserDto[]>{
      return this.clienteHttp.get<PostUserDto[]>(`${this.urlBase}/user/${sessionStorage.getItem('username')}`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
        },
        withCredentials: true  
      })
    }
}
