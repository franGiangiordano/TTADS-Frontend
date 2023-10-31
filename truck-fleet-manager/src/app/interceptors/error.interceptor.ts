import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, catchError, of } from 'rxjs';
import { NotificationService } from 'projects/common/src';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError(
          exception => {
            switch (exception.status) {
              case HttpStatusCode.BadRequest:
                this.notificationService.showSnackbar(exception.error.message, 'error');
                break;
              case HttpStatusCode.NotFound:
                this.router.navigate(['']);
                break;
            }
            return of(exception);
          }
        )
      );
  }
}