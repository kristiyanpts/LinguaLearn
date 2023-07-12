import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9]{5,}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9]{8,16}$/),
      ]),
      repass: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9]{8,16}$/),
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9]{1,}$/),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9]{1,}$/),
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(/^https?:\/\/.+$/),
      ]),
      role: new FormControl('', [Validators.required]),
    },
    this.passwordMatch('password', 'repass')
  );

  passwordMatch(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  onSubmit() {}
}
