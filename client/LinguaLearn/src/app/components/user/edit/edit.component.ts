import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/userModel';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}
  isUpdating: boolean = false;
  user: User | undefined;

  editForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    image: new FormControl('', [
      Validators.required,
      Validators.pattern(/^https?:\/\/.+$/),
    ]),
    role: new FormControl('', [Validators.required]),
  });

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit(): void {
    let userId = this.route.snapshot.params['userId'];
    let isAdmin = this.isAdmin;
    if (userId != this.authService.getUserId() && !isAdmin) {
      this.router.navigate(['/not-found']);
    } else {
      this.userService.getById(userId).subscribe({
        next: (userData: User) => {
          this.user = userData;
          this.editForm.controls.email.setValue(userData.email || '');
          this.editForm.controls.username.setValue(userData.username || '');
          this.editForm.controls.firstName.setValue(userData.firstName || '');
          this.editForm.controls.lastName.setValue(userData.lastName || '');
          this.editForm.controls.image.setValue(userData.image || '');
          this.editForm.controls.role.setValue(userData.role || null);
        },
      });
    }
  }

  onSubmit() {
    this.isUpdating = true;
    if (this.user != undefined) {
      this.user.email = this.editForm.controls.email.value || '';
      this.user.username = this.editForm.controls.username.value || '';
      this.user.firstName = this.editForm.controls.firstName.value || '';
      this.user.lastName = this.editForm.controls.lastName.value || '';
      this.user.image = this.editForm.controls.image.value || '';
      this.user.role = this.editForm.controls.role.value || '';

      this.authService.edit(this.user).subscribe({
        next: () => {
          this.isUpdating = false;
          this.notificationService.showNotification(
            'success',
            'Success',
            'Profile information updated successfully'
          );
          this.router.navigate([`/user/${this.user?._id}`]);
        },
        error: (err) => {
          this.isUpdating = false;
        },
      });
    }
  }
}
