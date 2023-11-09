import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntityListResponse } from 'projects/common/src/models';

import { Trailer } from '../models';
import { environment } from '../../../../../src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrailerService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTrailers(page: number = 1, limit: number = 10, search:string = '') {
    return this.http.get<EntityListResponse<Trailer>>(this.apiUrl + '/trailer/', { params: { search, page, limit } });
  }
  
  getTrailer(id:string) {
    return this.http.get<Trailer>(this.apiUrl + '/trailer/'+ id);
  }

  postTrailers(trailer: Trailer) {
    return this.http.post<Trailer>(this.apiUrl + '/trailer/', trailer)
  }

  putTrailers(selectedTrailer: Trailer) {
    return this.http.put<Trailer>(this.apiUrl + '/trailer/' + selectedTrailer._id, selectedTrailer);
  }

  deleteTrailers(trailer: Trailer) {
    return this.http.delete(this.apiUrl + '/trailer/' + trailer._id);
  }
}
