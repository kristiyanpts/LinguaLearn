import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/core/models/courseModel';
import { LessonModel } from 'src/app/core/models/lessonModel';
import { CourseService } from 'src/app/core/services/course.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { checkDates } from 'src/app/core/validators/date.validator';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css'],
})
export class CourseEditComponent implements OnInit {
  course: Course | undefined;
  isDataLoading: boolean = false;
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
      Validators.maxLength(1000),
    ]),
    schedule: new FormArray([new FormGroup(this.courseLessonsModel)]),
  });

  get courses(): FormArray {
    return this.courseForm.get('schedule') as FormArray;
  }

  addLesson(): void {
    let currentLength: number = this.courseForm.controls.schedule.length;

    if (currentLength == 20) {
      this.notificationService.showNotification(
        'error',
        'Error',
        'Course must have max 20 lessons'
      );
    } else {
      this.courseForm.controls.schedule.push(
        new FormGroup({
          lessonName: new FormControl('', [Validators.required]),
          lessonDate: new FormControl('', [Validators.required]),
        })
      );
    }
  }

  removeLesson(): void {
    let currentLength: number = this.courseForm.controls.schedule.length;

    if (currentLength == 1) {
      this.notificationService.showNotification(
        'error',
        'Error',
        'Course must have at least 1 lesson'
      );
    } else {
      this.courseForm.controls.schedule.removeAt(
        this.courseForm.controls.schedule.length - 1
      );
    }
  }

  constructor(
    private notificationService: NotificationService,
    private coursesService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isDataLoading = true;
    let courseId: string = this.route.snapshot.params['courseId'];
    this.coursesService.getById(courseId).subscribe({
      next: (course: Course) => {
        this.isDataLoading = false;
        this.course = course;
        this.courseForm.controls.name.setValue(this.course.name);
        this.courseForm.controls.image.setValue(this.course.image);
        this.courseForm.controls.level.setValue(this.course.level);
        this.courseForm.controls.capacity.setValue(
          this.course.capacity.toString()
        );
        this.courseForm.controls.date.setValue(this.course.date);
        this.courseForm.controls.duration.setValue(this.course.duration);
        this.courseForm.controls.description.setValue(this.course.description);

        this.courseForm.controls.schedule.clear();
        let schedule: LessonModel[] = this.course.schedule.filter(
          (s) => delete s._id
        );
        schedule.forEach((s) =>
          this.courseForm.controls.schedule.push(
            new FormGroup({
              lessonName: new FormControl(s.lessonName, [Validators.required]),
              lessonDate: new FormControl(s.lessonDate, [Validators.required]),
            })
          )
        );
      },
      error: (error) => {
        this.isDataLoading = false;
      },
    });
  }

  onSubmit() {
    let courseDate: string = this.courseForm.get('date')?.value || '';
    let lessonDates: LessonModel[] =
      (this.courseForm.get('schedule')?.value as LessonModel[]) || [];

    if (checkDates(courseDate, lessonDates) == false) {
      this.notificationService.showNotification(
        'error',
        'Error',
        'Lesson dates are not valid!'
      );
    } else {
      this.course = {
        _id: this.course?._id,
        name: this.courseForm.get('name')?.value || '',
        image: this.courseForm.get('image')?.value || '',
        level: this.courseForm.get('level')?.value || '',
        capacity: Number(this.courseForm.get('capacity')?.value) || 0,
        date: courseDate,
        duration: this.courseForm.get('duration')?.value || '',
        description: this.courseForm.get('description')?.value || '',
        schedule: lessonDates,
        teacher: this.course?.teacher || sessionStorage.getItem('id') || '',
        students: this.course?.students || [],
      };

      this.coursesService.edit(this.course).subscribe({
        next: () => {
          this.router.navigate([`/courses/${this.course?._id}`]);
          this.notificationService.showNotification(
            'success',
            'Success',
            'Course updated successfully!'
          );
        },
      });
    }
  }
}
