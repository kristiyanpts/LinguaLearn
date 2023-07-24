import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/core/models/courseModel';
import { CourseService } from 'src/app/core/services/course.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css'],
})
export class AdminCoursesComponent implements OnInit {
  constructor(
    private coursesService: CourseService,
    private notificationService: NotificationService
  ) {}
  courses: Course[] = [];
  coursesUnchanged: Course[] = [];

  ngOnInit(): void {
    this.coursesService.getAll().subscribe({
      next: (data) => {
        this.courses = data;
        this.coursesUnchanged = data;
      },
    });
  }

  deleteCourse(courseId: string): void {
    let confirmDeletion = confirm(
      'Are you sure you want to delete this course?'
    );
    if (confirmDeletion) {
      this.coursesService.delete(courseId).subscribe({
        next: () => {
          this.notificationService.showNotification(
            'success',
            'Success',
            'Course deleted successfully!'
          );
          this.ngOnInit();
        },
      });
    }
  }

  searchCourse(form: NgForm) {
    this.courses = this.coursesUnchanged;
    let searchQuery = form.value.search;
    console.log(form.value.search);

    this.courses = this.courses.filter((course) => {
      return course.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    console.log(this.courses);
  }
}
