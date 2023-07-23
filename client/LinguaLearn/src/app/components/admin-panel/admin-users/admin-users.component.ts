import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/core/models/userModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}
  users: User[] = [];
  usersUnchanged: User[] = [];

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.usersUnchanged = data;
      },
    });
  }

  deleteUser(userId: string): void {
    let confirmDeletion = confirm('Are you sure you want to delete this user?');
    if (confirmDeletion) {
      this.authService.delete(userId).subscribe({
        next: () => {
          this.notificationService.showNotification(
            'success',
            'Success',
            'User deleted successfully'
          );
          this.ngOnInit();
        },
      });
    }
  }

  searchUser(form: NgForm) {
    this.users = this.usersUnchanged;
    let searchQuery = form.value.search;
    console.log(form.value.search);

    this.users = this.users.filter((user) => {
      return user.firstName?.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }
}
