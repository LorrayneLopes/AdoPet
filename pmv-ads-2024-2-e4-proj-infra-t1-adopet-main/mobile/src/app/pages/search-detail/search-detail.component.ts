import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { map, switchMap } from 'rxjs';

import { getImageUrl } from 'src/app/utils/getImageUrl';
import { AnimalInterfaces } from 'src/app/shared/services/animal/animal.interfaces';
import { AnimalService } from 'src/app/shared/services/animal/animal.service';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.scss'],
})
export class SearchDetailComponent {
  private readonly animalService: AnimalService = inject(AnimalService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly modalController: ModalController = inject(ModalController);

  public readonly animalSignal: Signal<AnimalInterfaces.Receive.GetById | null> =
    toSignal(
      this.route.params.pipe(
        switchMap((params) => this.animalService.getById(params['id']))
      ),
      { initialValue: null }
    );

  public readonly animalsSignal: Signal<AnimalInterfaces.Receive.GetAll> =
    toSignal(
      this.animalService.getAll().pipe(map(this.filterOtherAnimals.bind(this))),
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

  public getAnimalResume(): string {
    if (!this.animal) return 'Não encontrado';
    const { gender, age, size, specie } = this.animal;

    return `${specie} | ${gender} | ${age} ano(s) | ${size}`;
  }

  public getImageUrl(image: string | null): string {
    return getImageUrl(image);
  }

  async handleClick() {
    const modal = await this.modalController.create({
      component: Component,
      componentProps: {},
    });

    await modal.present();
  }
}
