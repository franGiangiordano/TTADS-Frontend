import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Driver } from '../models/driver';
import {environment} from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  selectedDriver: Driver;
  drivers: Driver[] = [];
  apiUrl: string = environment.apiUrlDriver;

  constructor(private http: HttpClient) { 
    this.selectedDriver = new Driver();
  }

  getDrivers(page: number = 1, limit: number = 10) {
    return this.http.get<{drivers : Driver[], currentPage: number, totalPages
      : number, totalDrivers: number}>(this.apiUrl + '/?page=' + page + '&limit=' + limit);   
  }

  postDrivers(driver: Driver){    
    return this.http.post(this.apiUrl, driver).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error.message); 
      })
    );
  }

  putDrivers(selectedDriver: Driver) {    
    return this.http.put(this.apiUrl + '/' + selectedDriver._id , selectedDriver).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error.message); 
      })
    );
  }

  deleteDrivers(driver: Driver){
    return this.http.delete(this.apiUrl + '/' + driver._id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error.message); 
      })
    );
  }
}
