import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntityListResponse } from 'projects/common/src/models';

import { Repair } from '../models';
import { environment } from '../../../../../src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepairService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRepairs(page: number = 1, limit: number = 10, search:string = '') {
    return this.http.get<EntityListResponse<Repair>>(this.apiUrl + '/repair/', { params: { search, page, limit } });
  }
  
  getRepair(id:string) {
    return this.http.get<Repair>(this.apiUrl + '/repair/'+ id);
  }

  postRepairs(repair: Repair) {
    return this.http.post<Repair>(this.apiUrl + '/repair/', repair)
  }

  putRepairs(selectedRepair: Repair) {
    return this.http.put<Repair>(this.apiUrl + '/repair/' + selectedRepair._id, selectedRepair);
  }

  deleteRepairs(repair: Repair) {
    return this.http.delete(this.apiUrl + '/repair/' + repair._id);
  }

}
