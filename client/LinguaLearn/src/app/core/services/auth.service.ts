import { Injectable } from '@angular/core';
import { API_URL } from '../constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private loginUrl: string = `${API_URL}/login`;
  private logoutUrl: string = `${API_URL}/logout`;
  private registerUrl: string = `${API_URL}/register`;

  isLoggedIn(): boolean {
    return sessionStorage.getItem('id') != undefined;
  }

  getUserId(): string | null {
    return sessionStorage.getItem('id');
  }

  login(loginData: Object): Observable<Object> {
    return this.http.post<Object>(this.loginUrl, loginData, {
      withCredentials: true,
    });
  }

  register(registerData: Object): Observable<Object> {
    return this.http.post<Object>(this.registerUrl, registerData, {
      withCredentials: true,
    });
  }

  logout(): Observable<Object> {
    return this.http.post<Object>(
      this.logoutUrl,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
