import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/userModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  teachers: User[] = [];
  teachersUnchanged: User[] = [];
  isDataLoading: boolean = false;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.isDataLoading = true;
    this.userService.getAllTeachers().subscribe({
      next: (teachers: User[]) => {
        this.isDataLoading = false;
        this.teachers = teachers;
        this.teachersUnchanged = teachers;
      },
    });
  }

  searchTeacher(form: NgForm) {
    let searchQuery: string = form.value.search;
    this.teachers = this.teachersUnchanged;
    if (searchQuery != '') {
      this.teachers = this.teachers.filter((c) => {
        let fullName: string = `${c.firstName} ${c.lastName}`;
        return fullName.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }
  }
}
