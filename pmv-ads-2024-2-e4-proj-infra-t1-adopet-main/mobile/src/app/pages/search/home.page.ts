import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { signal, WritableSignal } from '@angular/core';
import { take, map } from 'rxjs';

import { AnimalService } from 'src/app/shared/services/animal/animal.service';
import { AnimalInterfaces } from 'src/app/shared/services/animal/animal.interfaces';
import { AnimalsFilterService } from 'src/app/shared/services/animals-filter/animals-filter.service';
import { AnimalFilterModalComponent } from '../components/animal-filter-modal/animal-filter-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  private readonly animalsService = inject(AnimalService);
  private readonly animalsFilterService = inject(AnimalsFilterService);

  public readonly animals: WritableSignal<AnimalInterfaces.Receive.Filter> =
    signal([]);
  public form: FormGroup = this.animalsFilterService.form;
  constructor(
    private modalController: ModalController,
    private router: Router
  ) {}

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
        this.animals.update(() => animals);
      });
  }

  async openFilterModal() {
    const modal = await this.modalController.create({
      component: AnimalFilterModalComponent,
      cssClass: 'filter-animal-modal',
    });

    modal.onDidDismiss().then((response) => {
      if (!response.data) return;
      this.filterAnimals();
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

  public redirectToAnimals(): void {
    this.router.navigate(['/animals']);
  }

  public redirectToAnimalCreation(): void {
    this.router.navigate(['/animals/create']);
  }
}
