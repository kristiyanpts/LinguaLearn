import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LessonModel } from 'src/app/core/models/lessonModel';
import { NotificationService } from 'src/app/core/services/notification.service';
import { checkDates } from '../../../core/validators/date.validator';
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/core/models/courseModel';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/userModel';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css'],
})
export class CourseCreateComponent {
  isCreatingCourse: boolean = false;
  newCourse: Course | undefined;
  newTeacher: User | undefined;
  courseLessonsModel = {
    lessonName: new FormControl('', [Validators.required]),
    lessonDate: new FormControl('', [Validators.required]),
  };

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern(/^https?:\/\/.+$/),
    ]),
    level: new FormControl('', [Validators.required]),
    capacity: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(100),
    ]),
    date: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1000),
    ]),
    schedule: new FormArray([new FormGroup(this.courseLessonsModel)]),
  });

  get schedule(): FormArray {
    return this.createForm.get('schedule') as FormArray;
  }

  addLesson(): void {
    let currentLength: number = this.createForm.controls.schedule.length;

    if (currentLength == 20) {
      this.notificationService.showNotification(
        'error',
        'Error',
        'Course must have max 20 lessons'
      );
    } else {
      this.createForm.controls.schedule.push(
        new FormGroup({
          lessonName: new FormControl('', [Validators.required]),
          lessonDate: new FormControl('', [Validators.required]),
        })
      );
    }
  }

  removeLesson(): void {
    let currentLength: number = this.createForm.controls.schedule.length;

    if (currentLength == 1) {
      this.notificationService.showNotification(
        'error',
        'Error',
        'Course must have at least 1 lesson'
      );
    } else {
      this.createForm.controls.schedule.removeAt(
        this.createForm.controls.schedule.length - 1
      );
    }
  }

  constructor(
    private notificationService: NotificationService,
    private courseService: CourseService,
    private router: Router
  ) {}

  onSubmit() {
    let courseDate: string = this.createForm.get('date')?.value || '';
    let lessonDates: LessonModel[] =
      (this.createForm.get('schedule')?.value as LessonModel[]) || [];

    if (checkDates(courseDate, lessonDates) == false) {
      this.notificationService.showNotification(
        'error',
        'Error',
        'Lesson dates are not valid!'
      );
    } else {
      this.isCreatingCourse = true;
      this.newTeacher = { _id: sessionStorage.getItem('id') || '' };
      this.newCourse = {
        name: this.createForm.get('name')?.value || '',
        image: this.createForm.get('image')?.value || '',
        level: this.createForm.get('level')?.value || '',
        capacity: Number(this.createForm.get('capacity')?.value) || 0,
        date: courseDate,
        duration: this.createForm.get('duration')?.value || '',
        description: this.createForm.get('description')?.value || '',
        schedule: lessonDates,
        teacher: this.newTeacher,
        students: [],
      };

      this.courseService.create(this.newCourse).subscribe({
        next: () => {
          this.isCreatingCourse = false;
          this.router.navigate(['/courses']);
          this.notificationService.showNotification(
            'success',
            'Success',
            'Course created successfully!'
          );
        },
      });
    }
  }
}
