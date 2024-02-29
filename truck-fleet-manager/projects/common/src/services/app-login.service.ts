import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../models';
import { environment } from '../../../../src/enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppLoginService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  authenticateUser(email: string, password: string) {
    const credentials = { email, password };

    return this.http.post(`${this.apiUrl}/auth/signin`, credentials);
  }

  getUser(id: string) {
    return this.http.get(`${this.apiUrl}/user/` + id);
  }

  isLoggedIn() {
    const tokenStr = localStorage.getItem('user');
    if (tokenStr !== null) {
      const { token } = JSON.parse(tokenStr);
      const jwtRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/;
      try {
        jwtRegex.test(token);
        return !this.jwtHelper.isTokenExpired(token);
      } catch (err) {
        return false;
      }
    }
    return false;
  }

  setUser(user: User, token: string) {
    const data = { token, user };
    localStorage.setItem('user', JSON.stringify(data));
  }

  getUserInfo() {
    let userStr = localStorage.getItem('user') ?? '';
    return JSON.parse(userStr).user;
  }

  updateUserInfo(user: User) {
    let userStr = localStorage.getItem('user') ?? '';
    let data = JSON.parse(userStr);
    data.user = user;
    localStorage.setItem('user', JSON.stringify(data));
  }

  logout() {
    localStorage.removeItem('user');
    return true;
  }

  getUserRole() {
    let userStr = localStorage.getItem('user') ?? '';
    return JSON.parse(userStr).user.roles.map((role: any) => role.name);
  }
}
