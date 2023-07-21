import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants/api.constants';
import { Observable } from 'rxjs';
import { User } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl: string = `${API_URL}/users`;

  constructor(private http: HttpClient) {}

  getAllTeachers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/teachers`);
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }
}
