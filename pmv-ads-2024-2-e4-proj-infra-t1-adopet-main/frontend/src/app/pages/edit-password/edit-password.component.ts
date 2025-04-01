import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { UserInterfaces } from 'src/app/shared/services/user/user.interface';
import { UserService } from 'src/app/shared/services/user/user.service';
import {
  uppercaseValidator,
  passwordMatchValidator,
  nonAlphanumericValidator,
} from 'src/app/utils/customValidators';
import { getFieldErrorMessage } from 'src/app/utils/getFieldErrorMessage';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css'],
})
export class EditPasswordComponent {
  public readonly form: FormGroup;
  public readonly getErrorMessage = getFieldErrorMessage;

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly userService: UserService = inject(UserService);

  private readonly uppercaseValidator = uppercaseValidator;
  private readonly passwordMatchValidator = passwordMatchValidator;
  private readonly nonAlphanumericValidator = nonAlphanumericValidator;

  constructor() {
    this.form = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            this.nonAlphanumericValidator,
            this.uppercaseValidator,
          ],
        ],
        currentPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  public changePassword(): void {
    const userData = this.userService.user();
    const payload = {
      ...userData,
      password: this.form.value.password,
      confirmPassword: this.form.value.confirmPassword,
    };

    this.userService
      .update(payload as UserInterfaces.Send.Update)
      .pipe(take(1))
      .subscribe((response) => {
        console.log(response);
      });
  }
}
