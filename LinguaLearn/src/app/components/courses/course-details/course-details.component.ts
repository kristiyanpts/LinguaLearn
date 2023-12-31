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
  isUser: boolean = false;

  teacherInfo = { name: '', id: '' };
  spotsLeft: number = 0;
  areThereStudents: boolean = false;

  constructor(
    private coursesService: CourseService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isInfoLoading = true;
    let courseId: string = this.route.snapshot.params['courseId'];
    this.coursesService.getById(courseId).subscribe({
      next: (course: Course) => {
        this.isInfoLoading = false;
        let userId: string = sessionStorage.getItem('id') || '';
        this.course = course;
        this.canManageCourse = (course.teacher as User)._id == userId;

        this.canSignUpForCourse =
          !this.canManageCourse &&
          !course.students.find((s: any) => s._id == userId);
        this.isUser = this.authService.isLoggedIn();
        this.teacherInfo.name =
          (course.teacher as User).firstName +
          ' ' +
          (course.teacher as User).lastName;
        this.teacherInfo.id = (course.teacher as User)._id || '';
        this.spotsLeft = course.capacity - course.students.length;
        this.course.students.length > 0
          ? (this.areThereStudents = true)
          : (this.areThereStudents = false);
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
      });
    }
  }

  signUpForCourse() {
    let courseId: string = this.route.snapshot.params['courseId'];
    this.coursesService.signUp(courseId).subscribe({
      next: () => {
        this.notificationService.showNotification(
          'success',
          'Success',
          'You have successfully signed up for this course!'
        );
        this.ngOnInit();
      },
    });
  }

  removeStudent(userId: string) {
    let courseId: string = this.route.snapshot.params['courseId'];
    this.coursesService.removeStudent(courseId, userId).subscribe({
      next: () => {
        this.notificationService.showNotification(
          'success',
          'Success',
          'Student removed successfully!'
        );
        this.ngOnInit();
      },
    });
  }
}
