import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {
  private baseUrl = '';
  constructor(private httpClient: HttpClient) { }

  authenticateUser(userName:string, password:string){}
}
