import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { EntityListResponse } from '../../../../../projects/common/src/models';
import { Batea } from '../models';
import { environment } from '../../../../../src/enviroments/environment';

export interface BateaServiceInterface {
  getBateas(page: number, limit: number, search: string): Observable<EntityListResponse<Batea>>;
  getBatea(id: string): Observable<Batea>;
  postBateas(batea: Batea): Observable<Batea>;
  putBateas(selectedBatea: Batea): Observable<Batea>;
  deleteBateas(batea: Batea): Observable<object>;
}

@Injectable({
  providedIn: 'root'
})
export class BateaService implements BateaServiceInterface {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBateas(page: number = 1, limit: number = 10, search: string = '') {
    return this.http.get<EntityListResponse<Batea>>(this.apiUrl + '/batea/', { params: { search, page, limit } });
  }

  getBatea(id: string) {
    return this.http.get<Batea>(this.apiUrl + '/batea/' + id);
  }

  postBateas(batea: Batea) {
    return this.http.post<Batea>(this.apiUrl + '/batea/', batea)
  }

  putBateas(selectedBatea: Batea) {
    return this.http.put<Batea>(this.apiUrl + '/batea/' + selectedBatea._id, selectedBatea);
  }

  deleteBateas(batea: Batea) {
    return this.http.delete(this.apiUrl + '/batea/' + batea._id);
  }
}
