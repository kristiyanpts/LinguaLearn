import { Injectable } from '@angular/core';
import { API_URL } from '../constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private loginUrl: string = `${API_URL}/login`;
  private logoutUrl: string = `${API_URL}/logout`;
  private registerUrl: string = `${API_URL}/register`;
  private editUrl: string = `${API_URL}/users`;

  isLoggedIn(): boolean {
    return sessionStorage.getItem('id') != undefined;
  }

  isTeacher(): boolean {
    return sessionStorage.getItem('role') == 'teacher' || this.isAdmin();
  }

  isAdmin(): boolean {
    return (
      sessionStorage.getItem('role') == 'admin' ||
      sessionStorage.getItem('role') == 'owner'
    );
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

  edit(userData: User): Observable<User> {
    return this.http.put<User>(`${this.editUrl}/${userData._id}`, userData, {
      withCredentials: true,
    });
  }

  delete(userId: string) {
    return this.http.delete(`${this.editUrl}/${userId}`, {
      withCredentials: true,
    });
  }
}
