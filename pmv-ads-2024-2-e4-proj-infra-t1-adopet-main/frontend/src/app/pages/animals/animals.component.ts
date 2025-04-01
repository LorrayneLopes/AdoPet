import {
  inject,
  OnInit,
  signal,
  OnDestroy,
  Component,
  WritableSignal,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { from, map, take } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AnimalService } from 'src/app/shared/services/animal/animal.service';
import { AnimalInterfaces } from 'src/app/shared/services/animal/animal.interfaces';
import { AnimalsFilterService } from 'src/app/shared/services/animals-filter/animals-filter.service';
import { AnimalFilterModalComponent } from 'src/app/shared/components/animal-filter-modal/animal-filter-modal.component';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
})
export class AnimalsComponent implements OnInit, OnDestroy {
  private readonly modalService: NgbModal = inject(NgbModal);
  private readonly animalsService: AnimalService = inject(AnimalService);
  private readonly animalsFilterService: AnimalsFilterService =
    inject(AnimalsFilterService);

  public readonly animals: WritableSignal<AnimalInterfaces.Receive.Filter> =
    signal(Array(5));

  public form: FormGroup = this.animalsFilterService.form;

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

  public openFilterModal() {
    const filterModalRef = this.modalService.open(AnimalFilterModalComponent, {
      centered: true,
      modalDialogClass: 'filter-animal-modal',
    });

    from(filterModalRef.result)
      .pipe(take(1))
      .subscribe((response) => {
        if (!response) return;

        this.filterAnimals();
      });
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
