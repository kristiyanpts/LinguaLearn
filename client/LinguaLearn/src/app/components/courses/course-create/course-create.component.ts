import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LessonModel } from 'src/app/core/models/lessonModel';
import { NotificationService } from 'src/app/core/services/notification.service';
import { checkDates } from './validators/date.validator';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css'],
})
export class CourseCreateComponent {
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
      Validators.maxLength(200),
    ]),
    courses: new FormArray([new FormGroup(this.courseLessonsModel)]),
  });

  get courses(): FormArray {
    return this.createForm.get('courses') as FormArray;
  }

  addLesson(): void {
    let currentLength: number = this.createForm.controls.courses.length;

    if (currentLength == 20) {
      this.notificationService.showNotification(
        'error',
        'Error',
        'Course must have max 20 lessons'
      );
    } else {
      this.createForm.controls.courses.push(
        new FormGroup({
          lessonName: new FormControl('', [Validators.required]),
          lessonDate: new FormControl('', [Validators.required]),
        })
      );
    }
  }

  removeLesson(): void {
    let currentLength: number = this.createForm.controls.courses.length;

    if (currentLength == 1) {
      this.notificationService.showNotification(
        'error',
        'Error',
        'Course must have at least 1 lesson'
      );
    } else {
      this.createForm.controls.courses.removeAt(
        this.createForm.controls.courses.length - 1
      );
    }
  }

  constructor(private notificationService: NotificationService) {}

  onSubmit() {
    let courseDate: string = this.createForm.get('date')?.value || '';
    let lessonDates: LessonModel[] =
      (this.createForm.get('courses')?.value as LessonModel[]) || [];

    if (checkDates(courseDate, lessonDates) == false) {
      this.notificationService.showNotification(
        'error',
        'Error',
        'Lesson dates are not valid!'
      );
    } else {
      console.log(this.createForm.value);
    }
  }
}
