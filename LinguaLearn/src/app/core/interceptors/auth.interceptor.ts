import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { API_URL } from '../constants/api.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      tap({
        next: (res: any) => {
          if (res instanceof HttpResponse) {
            if (res.url?.endsWith('login') || res.url?.endsWith('register')) {
              sessionStorage.setItem('id', res.body._id);
              sessionStorage.setItem('email', res.body.email);
              sessionStorage.setItem('username', res.body.username);
              sessionStorage.setItem('firstName', res.body.firstName);
              sessionStorage.setItem('lastName', res.body.lastName);
              sessionStorage.setItem('image', res.body.image);
              sessionStorage.setItem('role', res.body.role);
              this.router.navigate(['/']);
              if (res.url?.endsWith('login')) {
                this.notificationService.showNotification(
                  'success',
                  'Message',
                  `Welcome back, ${res.body.username}!`
                );
              } else if (res.url?.endsWith('register')) {
                this.notificationService.showNotification(
                  'success',
                  'Message',
                  `Successfull registration. Welcome, ${res.body.username}!`
                );
              }
            }
          }
        },
        error: (err: HttpErrorResponse) => {
          this.notificationService.showNotification(
            'error',
            'Error',
            err.error.message
          );
        },
      })
    );
  }
}

export const authInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
