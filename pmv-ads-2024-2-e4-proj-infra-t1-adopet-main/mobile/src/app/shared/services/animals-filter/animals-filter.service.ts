import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AnimalsFilterService {
  private readonly fb: FormBuilder = inject(FormBuilder);
  public readonly form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      Age: this.fb.control(''),
      Name: this.fb.control(''),
      City: this.fb.control(''),
      State: this.fb.control(''),
      Specie: this.fb.control(''),
    });
  }
}
