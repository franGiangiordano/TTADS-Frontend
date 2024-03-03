import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EntityListResponse } from 'projects/common/src/models';

import { User } from 'projects/common/src/models';
import { environment } from '../../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(page: number = 1, limit: number = 10, search: string = '') {
    return this.http.get<EntityListResponse<User>>(this.apiUrl + '/user/', {
      params: { search, page, limit },
    });
  }

  getUser(id: string) {
    return this.http.get<User>(this.apiUrl + '/user/' + id);
  }

  postUsers(user: User) {
    return this.http.post<User>(this.apiUrl + '/auth/signup/', user);
  }

  putUsers(selectedUser: User) {
    return this.http.put<User>(
      this.apiUrl + '/user/' + selectedUser._id,
      selectedUser
    );
  }

  deleteUsers(user: User) {
    return this.http.delete(this.apiUrl + '/user/' + user._id);
  }

  changePassword(usuarioActualizado: User) {
    return this.http.put<User>(
      this.apiUrl + '/user/change-password/' + usuarioActualizado._id,
      usuarioActualizado
    );
  }
}
