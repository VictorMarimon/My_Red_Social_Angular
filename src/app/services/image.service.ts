import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/image';
import { ImageDTO } from '../models/dto/image-dto';
import { ImagesPostDto } from '../models/dto/images-post-dto';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private urlBase = 'http://localhost:8090/app/image';

  constructor(private clientHttp:HttpClient) { }

  getImages(): Observable<Image[]>{
    return this.clientHttp.get<Image[]>(this.urlBase, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    });
  }

  getImagesPost(id:number): Observable<ImagesPostDto[]>{
    return this.clientHttp.get<ImagesPostDto[]>(`${this.urlBase}/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true  
    });
  }

  addImage(newImage: ImageDTO[]): Observable<Image[]>{
    return this.clientHttp.post<Image[]>(this.urlBase, newImage, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true  
    });
  }

  deleteImage(id: number): Observable<{deleted: boolean}>{
    return this.clientHttp.delete<{deleted: boolean}>(`${this.urlBase}/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
      },
      withCredentials: true  
    });
  }
}
