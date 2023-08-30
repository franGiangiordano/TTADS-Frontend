import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Batea } from '../models/batea';
import {environment} from '../../../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class BateaService {


  selectedBatea: Batea;
  bateas: Batea[] = [];
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { 
    this.selectedBatea = new Batea();
  }

  getBateas(page: number = 1, limit: number = 10) {
    return this.http.get<{bateas : Batea[], currentPage: number, totalPages
      : number, totalBateas: number}>(this.apiUrl + '/?page=' + page + '&limit=' + limit);   
  }

  postBateas(batea: Batea){
    return this.http.post(this.apiUrl, batea).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error.error); 
      })
    );
  }

  putBateas(selectedBatea: Batea) {
    return this.http.put(this.apiUrl + '/' + selectedBatea._id , selectedBatea).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error.error); 
      })
    );
  }

  deleteBateas(batea: Batea){
    return this.http.delete(this.apiUrl + '/' + batea._id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error.error); 
      })
    );
  }

}
