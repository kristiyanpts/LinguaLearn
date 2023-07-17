import { AbstractControl, ValidatorFn } from '@angular/forms';

export function arePasswordsMatching(): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('repass');

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
