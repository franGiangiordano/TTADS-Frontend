import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { NotificationService } from 'projects/common/src';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> { 
    
    let token = '';  
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString); 
      token = user.token;
    }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token || '',
      })

      const reqClone = req.clone({
         headers
      });

      return next.handle(reqClone).pipe(
        catchError(exception => {
          this.notificationService.showSnackbar(exception.error.message, 'error');
          return of(exception);
        })
      );

  }
}
