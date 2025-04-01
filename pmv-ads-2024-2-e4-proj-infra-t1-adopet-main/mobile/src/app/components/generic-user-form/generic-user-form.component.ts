import {
  Component,
  inject,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { getFieldErrorMessage } from 'src/app/utils/getFieldErrorMessage';

import { User } from '../../services/user/user.interface';
import {
  nonAlphanumericValidator,
  passwordMatchValidator,
  phoneValidator,
  uppercaseValidator,
} from 'src/app/utils/customValidators';

@Component({
  selector: 'app-generic-user-form',
  templateUrl: './generic-user-form.component.html',
  styleUrls: ['./generic-user-form.component.css'],
})
export class GenericUserFormComponent implements OnInit {
  @Input() public userData: User | null = null;
  @Output() public formSubmit = new EventEmitter<any>();

  public readonly userForm: FormGroup;
  public readonly getErrorMessage = getFieldErrorMessage;

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly phoneValidator = phoneValidator;
  private readonly uppercaseValidator = uppercaseValidator;
  private readonly passwordMatchValidator = passwordMatchValidator;
  private readonly nonAlphanumericValidator = nonAlphanumericValidator;

  constructor() {
    this.userForm = this.fb.group(
      {
        name: ['Matheus', [Validators.required, Validators.maxLength(30)]],
        surname: ['Rocha', [Validators.required, Validators.maxLength(30)]],
        email: [
          'matheus@mail.com',
          [Validators.required, Validators.email, Validators.maxLength(100)],
        ],
        password: [
          '@Teste123',
          [
            Validators.required,
            Validators.minLength(6),
            this.nonAlphanumericValidator,
            this.uppercaseValidator,
          ],
        ],
        confirmPassword: ['@Teste123', Validators.required],
        contact: ['5571999998888', [Validators.required, this.phoneValidator]],
        about: ['Apenas um about'],
        address: this.fb.group({
          city: ['Salvador', Validators.required],
          state: ['Bahia', Validators.required],
          about: ['About sobre o endereço'],
        }),
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  private patchFormValues(): void {
    if (this.userData) {
      this.userForm.patchValue(this.userData);
    }
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      this.formSubmit.emit(this.userForm.value);
    }
  }

  public ngOnInit(): void {
    if (this.userData) {
      this.patchFormValues();

      this.userForm.get('password')?.clearValidators();
      this.userForm.get('confirmPassword')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
      this.userForm.get('confirmPassword')?.updateValueAndValidity();
    }
  }
}
