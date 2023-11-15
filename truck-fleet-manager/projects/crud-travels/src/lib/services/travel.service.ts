import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntityListResponse } from 'projects/common/src/models';

import { Travel } from '../models';
import { environment } from '../../../../../src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTravels(page: number = 1, limit: number = 10, search:string = '') {
    return this.http.get<EntityListResponse<Travel>>(this.apiUrl + '/travel/', { params: { search, page, limit } });
  }
  
  getTravel(id:string) {
    return this.http.get<Travel>(this.apiUrl + '/travel/'+ id);
  }

  postTravels(travel: Travel) {
    return this.http.post<Travel>(this.apiUrl + '/travel/', travel)
  }

  putTravels(selectedTravel: Travel) {
    return this.http.put<Travel>(this.apiUrl + '/travel/' + selectedTravel._id, selectedTravel);
  }

  deleteTravels(travel: Travel) {
    return this.http.delete(this.apiUrl + '/travel/' + travel._id);
  }
}
