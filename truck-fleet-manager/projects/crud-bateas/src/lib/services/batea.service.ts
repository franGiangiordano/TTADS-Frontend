import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntityListResponse } from 'projects/common/src/models';

import { Batea } from '../models';
import { environment } from '../../../../../src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class BateaService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBateas(page: number = 1, limit: number = 10) {
    return this.http.get<EntityListResponse<Batea>>(this.apiUrl + '/batea', { params: { page, limit } });
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
