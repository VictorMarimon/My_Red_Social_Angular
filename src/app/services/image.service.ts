import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../models/image';
import { ImageDTO } from '../models/dto/image-dto';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private urlBase = 'http://localhost:8090/app/image';

  constructor(private clientHttp:HttpClient) { }

  getImages(): Observable<Image[]>{
    return this.clientHttp.get<Image[]>(this.urlBase);
  }

  addImage(newImage: ImageDTO): Observable<Image>{
    return this.clientHttp.post<Image>(this.urlBase, newImage);
  }

  deleteImage(id: number): Observable<{deleted: boolean}>{
    return this.clientHttp.delete<{deleted: boolean}>(`${this.urlBase}/${id}`);
  }
}
