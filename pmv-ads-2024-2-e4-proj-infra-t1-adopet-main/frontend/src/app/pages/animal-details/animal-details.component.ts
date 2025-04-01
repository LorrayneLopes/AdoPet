import { Component, inject, Signal } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { AnimalService } from 'src/app/shared/services/animal/animal.service';
import { AnimalInterfaces } from 'src/app/shared/services/animal/animal.interfaces';

import { getImageUrl } from 'src/app/utils/getImageUrl';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactModalComponent } from 'src/app/shared/components/contact-modal/contact-modal.component';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css'],
})
export class AnimalDetailsComponent {
  private readonly animalService: AnimalService = inject(AnimalService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly modalService: NgbModal = inject(NgbModal);

  public readonly animalSignal: Signal<AnimalInterfaces.Receive.GetById | null> =
    toSignal(
      this.route.params.pipe(
        switchMap((params) => this.animalService.getById(params['id']))
      ),
      { initialValue: null }
    );

  public readonly animalsSignal: Signal<AnimalInterfaces.Receive.GetAll> =
    toSignal(
      this.animalService
        .getAll({})
        .pipe(map(this.filterOtherAnimals.bind(this))),
      { initialValue: Array(3) }
    );

  public get animal(): AnimalInterfaces.Receive.GetById | null {
    return this.animalSignal();
  }

  constructor() {}

  private filterOtherAnimals(animals: AnimalInterfaces.Receive.GetAll) {
    const currentAnimalId = this.animal?.id;

    return animals
      .filter((animal) => animal.id !== currentAnimalId)
      .slice(0, 3);
  }

  public getAnimalBadges(): string[] {
    return this.animal
      ? [
          this.animal.temperament,
          this.animal.sociability,
          this.animal.liveWellWith,
        ]
      : [];
  }

  public getAnimalAdress(): any {
    return `Localizado em ${this.animal?.address.city} - ${this.animal?.address.state}`;
  }

  public getAnimalResume(): string {
    if (!this.animal) return 'Não encontrado';
    const { gender, age, size, specie } = this.animal;

    return `${specie} | ${gender} | ${age} ano(s) | ${size}`;
  }

  public getImageUrl(image: string | null): string {
    return getImageUrl(image);
  }

  handleClick() {
    this.modalService.open(ContactModalComponent, {
      modalDialogClass: 'modal-dialog-centered',
    });
  }
}
