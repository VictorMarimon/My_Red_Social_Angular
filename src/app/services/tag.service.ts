import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';
import { TagDTO } from '../models/dto/tag-dto';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private urlBase = 'http://localhost:8090/app/tag';

  constructor(private clientHttp:HttpClient) { }

  getTags(): Observable<Tag[]>{
    return this.clientHttp.get<Tag[]>(this.urlBase);
  }

  addTag(newTag: TagDTO): Observable<Tag>{
    return this.clientHttp.post<Tag>(this.urlBase, newTag);
  }

  deleteTag(id: number): Observable<{deleted: boolean}>{
    return this.clientHttp.delete<{deleted: boolean}>(`${this.urlBase}/${id}`);
  }
}
