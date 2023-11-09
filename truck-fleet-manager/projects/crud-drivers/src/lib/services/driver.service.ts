import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntityListResponse } from 'projects/common/src/models';

import { Driver } from '../models';
import { environment } from '../../../../../src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDrivers(page: number = 1, limit: number = 10, search:string = '') {
    return this.http.get<EntityListResponse<Driver>>(this.apiUrl + '/driver/', { params: { search, page, limit } });
  }
  
  getDriver(id:string) {
    return this.http.get<Driver>(this.apiUrl + '/driver/'+ id);
  }

  postDrivers(driver: Driver) {
    return this.http.post<Driver>(this.apiUrl + '/driver/', driver)
  }

  putDrivers(selectedDriver: Driver) {
    return this.http.put<Driver>(this.apiUrl + '/driver/' + selectedDriver._id, selectedDriver);
  }

  deleteDrivers(driver: Driver) {
    return this.http.delete(this.apiUrl + '/driver/' + driver._id);
  }
}