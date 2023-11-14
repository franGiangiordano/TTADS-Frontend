import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { User } from '../models';
import { environment } from '../../../../src/enviroments/environment';


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

  getUser(id: string) {
    return this.http.get(`${this.apiUrl}/user/` + id);
  }

  isLoggedIn() {
    const tokenStr = localStorage.getItem('user');

    const hasToken = !(tokenStr == undefined || tokenStr == '' || tokenStr == null);
    return hasToken;
  }

  setUser(user: User, token: string) {
    const data = { token, user };
    localStorage.setItem('user', JSON.stringify(data));
  }

  logout() {
    localStorage.removeItem('user');
    return true;
  }

  getUserRole() {
    let userStr = localStorage.getItem('user');

    if (userStr != null) {
      return JSON.parse(userStr).user.roles.map((role: any) => role.name);
    } else {
      this.logout();
      return null;
    }
  }
}