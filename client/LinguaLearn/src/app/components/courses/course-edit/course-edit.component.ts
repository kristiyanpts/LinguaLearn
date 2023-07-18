import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css'],
})
export class CourseEditComponent {
  courseLessonsModel = {
    lessonName: new FormControl('', [Validators.required]),
    lessonDate: new FormControl('', [Validators.required]),
  };

  courseForm = new FormGroup({
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
    return this.courseForm.get('courses') as FormArray;
  }

  addLesson(): void {
    let currentLength: number = this.courseForm.controls.courses.length;

    if (currentLength == 20) {
      this.notificationService.showNotification(
        'error',
        'Error',
        'Course must have max 20 lessons'
      );
    } else {
      this.courseForm.controls.courses.push(
        new FormGroup({
          lessonName: new FormControl('', [Validators.required]),
          lessonDate: new FormControl('', [Validators.required]),
        })
      );
    }
  }

  removeLesson(): void {
    let currentLength: number = this.courseForm.controls.courses.length;

    if (currentLength == 1) {
      this.notificationService.showNotification(
        'error',
        'Error',
        'Course must have at least 1 lesson'
      );
    } else {
      this.courseForm.controls.courses.removeAt(
        this.courseForm.controls.courses.length - 1
      );
    }
  }

  constructor(private notificationService: NotificationService) {}

  onSubmit() {}
}
