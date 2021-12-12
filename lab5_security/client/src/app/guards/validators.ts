import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function checkPasswordStrength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value

    if (!value) {
      return null
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/

    return !passwordRegex.test(value) ? {passwordStrength: true} : null
  }
}

export function checkPhoneNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value

    if (!value) {
      return null
    }

    const phoneNumberRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

    return !phoneNumberRegex.test(value) ? {phoneValid: true} : null
  }
}

export function MatchPassword(password: string, confirmPassword: string) {
  // @ts-ignore
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[password];
    const confirmPasswordControl = formGroup.controls[confirmPassword];

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  }
}
