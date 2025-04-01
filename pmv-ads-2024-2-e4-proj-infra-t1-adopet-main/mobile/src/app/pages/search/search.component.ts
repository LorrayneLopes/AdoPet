import {
  Component,
  inject,
  OnInit,
  signal,
  OnDestroy,
  WritableSignal,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { map, take } from 'rxjs';

import { AnimalService } from 'src/app/shared/services/animal/animal.service';
import { AnimalInterfaces } from 'src/app/shared/services/animal/animal.interfaces';
import { AnimalsFilterService } from 'src/app/shared/services/animals-filter/animals-filter.service';

import { ModalController } from '@ionic/angular';
import { AnimalFilterModalComponent } from 'src/app/shared/components/animal-filter-modal/animal-filter-modal.component';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly animalsService: AnimalService = inject(AnimalService);
  private readonly modalController: ModalController = inject(ModalController);
  private readonly animalsFilterService: AnimalsFilterService =
    inject(AnimalsFilterService);

  public readonly animals: WritableSignal<AnimalInterfaces.Receive.Filter> =
    signal(Array(5));

  public form: FormGroup = this.animalsFilterService.form;

  constructor() {}

  private filterAnimals(): void {
    const payload: AnimalInterfaces.Send.Filter = this.form.value;

    this.animalsService
      .filter(payload)
      .pipe(
        take(1),
        map((animals) => {
          const { Name } = this.form.value;
          return Name
            ? animals.filter((animal) => animal.name.includes(Name))
            : animals;
        })
      )
      .subscribe((animals) => {
        this.animals.update((_) => animals);
      });
  }

  public async openFilterModal() {
    const modal = await this.modalController.create({
      component: AnimalFilterModalComponent,
      cssClass: 'filter-animal-modal',
    });

    modal.onWillDismiss().then((response) => {
      if (response.data) {
        this.filterAnimals();
      }
    });

    await modal.present();
  }

  public onSubmit(): void {
    this.filterAnimals();
  }

  public ngOnInit(): void {
    this.filterAnimals();
  }

  public ngOnDestroy(): void {
    this.form.reset();
  }
}
