import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { AnimalsFilterService } from '../../services/animals-filter/animals-filter.service';

@Component({
  selector: 'app-animal-filter-modal',
  templateUrl: './animal-filter-modal.component.html',
  styleUrls: ['./animal-filter-modal.component.scss'],
})
export class AnimalFilterModalComponent {
  private readonly modalController: ModalController = inject(ModalController);
  private readonly animalsFilterService: AnimalsFilterService =
    inject(AnimalsFilterService);

  public form: FormGroup = this.animalsFilterService.form;

  constructor() {}

  public onCancel() {
    // Fecha o modal sem passar dados
    this.modalController.dismiss();
  }

  public onSubmit(): void {
    // Fecha o modal e retorna true, indicando que o filtro foi aplicado
    this.modalController.dismiss(true);
  }
}
