import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/enviroments/environment';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  authenticateUser(email: string, password: string) {
    const credentials = { email, password };
    
    return this.http.post(`${this.apiUrl}/auth/signin`, credentials);
  }

  loginUser(token: string): void {
    localStorage.setItem('token', token);
  }

  getUser(id: string) {
    return this.http.get(`${this.apiUrl}/user/` + id);
  }

  isLoggedIn() {
    const tokenStr = localStorage.getItem('token');

    const hasToken = !(tokenStr == undefined || tokenStr == '' || tokenStr == null);
    return hasToken;
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  getUserRole() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr).roles.map((role: any) => role.name);
    } else {
      this.logout();
      return null;
    }
  }
}