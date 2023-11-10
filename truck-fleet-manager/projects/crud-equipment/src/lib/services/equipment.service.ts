import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntityListResponse } from 'projects/common/src/models';

import { Equipment } from '../models';
import { environment } from '../../../../../src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEquipments(page: number = 1, limit: number = 10, search:string = '') {
    return this.http.get<EntityListResponse<Equipment>>(this.apiUrl + '/equipment/', { params: { search, page, limit } });
  }
  
  getEquipment(id:string) {
    return this.http.get<Equipment>(this.apiUrl + '/equipment/'+ id);
  }

  postEquipments(equipment:any) {
    return this.http.post<Equipment>(this.apiUrl + '/equipment/', equipment)
  }

  putEquipments(selectedEquipment: Equipment) {
    return this.http.put<Equipment>(this.apiUrl + '/equipment/' + selectedEquipment._id, selectedEquipment);
  }

  deleteEquipments(equipment: Equipment) {
    return this.http.delete(this.apiUrl + '/equipment/' + equipment._id);
  }
}
