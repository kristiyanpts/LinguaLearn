import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/course.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private userService: UserService,
    private coursesService: CourseService
  ) {}
  dashboardInfo = {
    teachersAmount: 0,
    studentsAmount: 0,
    coursesAmount: 0,
    entryCourseAmount: 0,
    midCourseAmount: 0,
    advancedCourseAmount: 0,
    expertCourseAmount: 0,
  };

  ngOnInit(): void {
    this.userService.getAllTeachers().subscribe({
      next: (teachers) => {
        this.dashboardInfo.teachersAmount = teachers.length;
      },
    });
    this.userService.getAllStudents().subscribe({
      next: (students) => {
        this.dashboardInfo.studentsAmount = students.length;
      },
    });
    this.coursesService.getAll().subscribe({
      next: (courses) => {
        this.dashboardInfo.coursesAmount = courses.length;
        this.dashboardInfo.entryCourseAmount = courses.filter(
          (course) => course.level === 'entry'
        ).length;
        this.dashboardInfo.midCourseAmount = courses.filter(
          (course) => course.level === 'mid'
        ).length;
        this.dashboardInfo.advancedCourseAmount = courses.filter(
          (course) => course.level === 'advanced'
        ).length;
        this.dashboardInfo.expertCourseAmount = courses.filter(
          (course) => course.level === 'expert'
        ).length;
      },
    });
  }
}
