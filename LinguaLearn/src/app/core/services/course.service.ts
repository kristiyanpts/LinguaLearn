import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants/api.constants';
import { Course } from '../models/courseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  private courseUrl: string = `${API_URL}/courses`;

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseUrl);
  }

  getSixthLatest(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}?limit=6`);
  }

  getAllByUserId(userId: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}?teacher=${userId}`);
  }

  getById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.courseUrl}/${id}`);
  }

  create(course: Course) {
    return this.http.post<Course>(this.courseUrl, course, {
      withCredentials: true,
    });
  }

  edit(course: Course) {
    return this.http.put<Course>(`${this.courseUrl}/${course._id}`, course, {
      withCredentials: true,
    });
  }

  delete(id: string) {
    return this.http.delete<Course>(`${this.courseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  signUp(courseId: string) {
    return this.http.put<Course>(
      `${this.courseUrl}/${courseId}/sign-up`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  removeStudent(courseId: string, userId: string) {
    return this.http.put<Course>(
      `${this.courseUrl}/${courseId}/remove-student`,
      { userId },
      { withCredentials: true }
    );
  }
}
