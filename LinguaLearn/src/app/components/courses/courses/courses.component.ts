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
  @Input() showHeader: boolean = true; // Show initial header (courses-header)
  @Input() isLimited: boolean = false; // Limit amount of courses to 6
  @Input() isUser: boolean = false; // Does the user send courses
  @Input() userCourses: Course[] = []; // If isUser is true then these are the courses that should be shown
  @Input() title: string = 'Courses'; // Title used above the courses
  areCoursesLoading: boolean = false;
  courses: Course[] = [];
  coursesUnchanged: Course[] = [];
  selectedFilter: string = 'all';

  constructor(
    private coursesService: CourseService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.userCourses && this.isUser == true) {
      this.courses = this.userCourses;
      return;
    }

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
