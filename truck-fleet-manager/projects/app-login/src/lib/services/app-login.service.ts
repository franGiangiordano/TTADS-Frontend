import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AppLoginService {
  
  apiUrl: string = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  authenticateUser(email:string, password:string){
    const user = {
      email: email,
      password: password
    };
    return this.http.post(`${this.apiUrl}/auth/signin`,user).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error.message); 
      })
    );    
  }

  public loginUser(token:string){
    localStorage.setItem('token',token);
    return true;
  }

  public getUser(id:string){
    return this.http.get(`${this.apiUrl}/user/` + id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error.message); 
      })
    );
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  public setUser(user:User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getUserRole(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr).roles.map((role:any) => role.name);
    }else{
      this.logout();
      return null;
    }
  }

}
