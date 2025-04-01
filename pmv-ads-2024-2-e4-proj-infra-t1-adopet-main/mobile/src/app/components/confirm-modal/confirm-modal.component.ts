import { Component, inject, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {
  ConfirmModalConfig,
  ConfirmModalResult,
} from './confirm-modal.interfaces';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent {
  @Input() public config: ConfirmModalConfig = {
    type: 'primary',
    title: 'Confirmação',
    message: 'Tem certeza que deseja continuar?',
  };

  private readonly activeModal: NgbActiveModal = inject(NgbActiveModal);

  get primaryColor(): string {
    return this.config.type === 'primary' ? '#1874A7' : '#990000';
  }

  constructor() {}

  public onConfirm(): void {
    this.activeModal.close(ConfirmModalResult.CONFIRM);
  }

  public onCancel(): void {
    this.activeModal.close(ConfirmModalResult.CANCEL);
  }
}
