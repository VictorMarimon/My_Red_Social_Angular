import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';
import { TagDTO } from '../models/dto/tag-dto';
import { TagsPostDto } from '../models/dto/tags-post-dto';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private urlBase = 'http://localhost:8090/app/tag';

  constructor(private clientHttp:HttpClient) { }

  getTags(): Observable<Tag[]>{
    return this.clientHttp.get<Tag[]>(this.urlBase, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    });
  }

  getTagsPost(id:number): Observable<TagsPostDto[]>{
      return this.clientHttp.get<TagsPostDto[]>(`${this.urlBase}/${id}`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true  
      });
  }

  addTag(newTag: TagDTO[]): Observable<Tag[]>{
    return this.clientHttp.post<Tag[]>(this.urlBase, newTag, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true  
    });
  }

  deleteTag(id: number): Observable<{deleted: boolean}>{
    return this.clientHttp.delete<{deleted: boolean}>(`${this.urlBase}/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    });
  }
}
