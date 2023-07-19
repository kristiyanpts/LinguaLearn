import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { arePasswordsMatching } from './validators/passwords.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}
  isRegistering: boolean = false;

  registerForm = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]),
      repass: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(/^https?:\/\/.+$/),
      ]),
      role: new FormControl('', [Validators.required]),
    },
    arePasswordsMatching()
  );

  onSubmit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    } else {
      this.isRegistering = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.isRegistering = false;
        },
        error: (err) => {
          this.isRegistering = false;
        },
      });
    }
  }
}
