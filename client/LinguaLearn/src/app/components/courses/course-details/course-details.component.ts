import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/core/models/courseModel';
import { User } from 'src/app/core/models/userModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/course.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  isInfoLoading: boolean = false;

  course: Course | undefined;
  canManageCourse: boolean = false;
  canSignUpForCourse: boolean = false;

  teacherInfo = { name: '', id: '' };
  spotsLeft: number = 0;

  constructor(
    private coursesService: CourseService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isInfoLoading = true;
    let courseId: string = this.route.snapshot.params['courseId'];
    this.coursesService.getById(courseId).subscribe({
      next: (course: Course) => {
        console.log('vlizam?');

        this.isInfoLoading = false;
        let userId: string = sessionStorage.getItem('id') || '';
        this.course = course;
        this.canManageCourse = (course.teacher as User)._id == userId;
        this.canSignUpForCourse =
          !this.canManageCourse && !course.students.includes(userId);
        this.teacherInfo.name =
          (course.teacher as User).firstName +
          ' ' +
          (course.teacher as User).lastName;
        this.teacherInfo.id = (course.teacher as User)._id;
        this.spotsLeft = course.capacity - course.students.length;
      },
      error: (err) => {
        this.isInfoLoading = false;
        this.router.navigate(['/not-found']);
      },
    });
  }

  deleteCourse(): void {
    let confirmDeletion = confirm(
      'Are you sure you want to delete this course?'
    );
    if (confirmDeletion) {
      this.coursesService.delete(this.course?._id!).subscribe({
        next: () => {
          this.notificationService.showNotification(
            'success',
            'Success',
            'Course deleted successfully!'
          );
          this.router.navigate(['/courses']);
        },
        error: (err) => {
          this.notificationService.showNotification(
            'error',
            'Error',
            err.error.message
          );
        },
      });
    }
  }

  signUpForCourse() {}
}
