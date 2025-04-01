import { AbstractControl } from '@angular/forms';

export type ValidatorReturn = null | { [key: string]: boolean };

export const passwordMatchValidator = (
  control: AbstractControl
): ValidatorReturn => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
  }
  return null;
};

export const nonAlphanumericValidator = (
  control: AbstractControl
): ValidatorReturn => {
  const password = control.value;
  const hasNonAlphanumeric = /[^a-zA-Z0-9]/.test(password);

  return hasNonAlphanumeric ? null : { nonAlphanumeric: true };
};

export const uppercaseValidator = (
  control: AbstractControl
): ValidatorReturn => {
  const password = control.value;
  const hasUppercase = /[A-Z]/.test(password);

  return hasUppercase ? null : { uppercase: true };
};

export const phoneValidator = (control: AbstractControl): ValidatorReturn => {
  const phoneNumber = control.value;
  const isValidPhone = /^[0-9]{10,15}$/.test(phoneNumber);

  return isValidPhone ? null : { invalidPhone: true };
};
