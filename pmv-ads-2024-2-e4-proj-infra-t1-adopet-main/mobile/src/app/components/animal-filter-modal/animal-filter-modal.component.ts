import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';

// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AnimalsFilterService } from '../../shared/services/animals-filter/animals-filter.service';

@Component({
  selector: 'app-animal-filter-modal',
  templateUrl: './animal-filter-modal.component.html',
  styleUrls: ['./animal-filter-modal.component.css'],
})
export class AnimalFilterModalComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(ModalController) private modalController: ModalController
  ) {
    this.form = this.fb.group({
      Age: [''],
      City: [''],
      State: [''],
      Specie: [''],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.modalController.dismiss(this.form.value);
    }
  }

  onCancel() {
    this.modalController.dismiss();
  }
}
