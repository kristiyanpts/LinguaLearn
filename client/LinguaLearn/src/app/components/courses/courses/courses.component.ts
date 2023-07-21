import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @Input() isLimited: boolean = false;
  @Input() userCourses: Course[] = [];
  @Input() title: string = 'Courses';
  areCoursesLoading: boolean = false;
  courses: Course[] = [];
  coursesUnchanged: Course[] = [];
  selectedFilter: string = 'all';

  constructor(
    private coursesService: CourseService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.userCourses.length > 0) {
      this.courses = this.userCourses;
      return;
    }

    console.log('hello?');

    this.areCoursesLoading = true;
    if (this.isLimited) {
      this.coursesService.getSixthLatest().subscribe({
        next: (courses) => {
          this.areCoursesLoading = false;
          this.courses = courses;
          this.coursesUnchanged = courses;
        },
        error: (error) => {
          this.areCoursesLoading = false;
        },
      });
    } else {
      this.coursesService.getAll().subscribe({
        next: (courses) => {
          this.areCoursesLoading = false;
          this.courses = courses;
          this.coursesUnchanged = courses;
        },
        error: (error) => {
          this.areCoursesLoading = false;
        },
      });
    }
  }

  sortCourses(level: string) {
    this.courses = this.coursesUnchanged;
    this.selectedFilter = level;
    if (level != 'all') {
      this.courses = this.courses.filter((c) => c.level == level);
    }
  }

  searchCourse(form: NgForm) {
    let searchQuery = form.value.search;
    this.courses = this.coursesUnchanged;
    if (searchQuery != '') {
      this.courses = this.courses.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }
}
