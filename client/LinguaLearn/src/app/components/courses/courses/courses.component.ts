import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/core/models/courseModel';
import { CourseService } from 'src/app/core/services/course.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  @Input() showHeader: boolean = true;
  areCoursesLoading: boolean = false;
  courses: Course[] = [];

  constructor(
    private coursesService: CourseService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.areCoursesLoading = true;
    this.coursesService.getAll().subscribe({
      next: (courses) => {
        this.areCoursesLoading = false;
        this.courses = courses;
      },
      error: (error) => {
        this.areCoursesLoading = false;
        this.notificationService.showNotification(
          'error',
          'Error',
          error.error.message
        );
      },
    });
  }
}
