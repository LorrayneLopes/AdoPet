import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AnimalsFilterService } from '../../services/animals-filter/animals-filter.service';

@Component({
  selector: 'app-animal-filter-modal',
  templateUrl: './animal-filter-modal.component.html',
  styleUrls: ['./animal-filter-modal.component.css'],
})
export class AnimalFilterModalComponent {
  private readonly activeModalService: NgbActiveModal = inject(NgbActiveModal);
  private readonly animalsFilterService: AnimalsFilterService =
    inject(AnimalsFilterService);

  public form: FormGroup = this.animalsFilterService.form;

  public onCancel() {
    this.activeModalService.close();
  }

  public onSubmit(): void {
    this.activeModalService.close(true);
  }
}
