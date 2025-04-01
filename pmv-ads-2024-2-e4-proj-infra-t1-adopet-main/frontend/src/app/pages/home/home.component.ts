import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, switchMap, take } from 'rxjs';

import { AnimalService } from 'src/app/shared/services/animal/animal.service';
import { AnimalInterfaces } from 'src/app/shared/services/animal/animal.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private readonly animalService: AnimalService = inject(AnimalService);
  private readonly modalService: NgbModal = inject(NgbModal);
  private readonly routerService: Router = inject(Router);

  public readonly animals: Signal<AnimalInterfaces.Receive.GetAll> = toSignal(
    this.animalService.getAll({}).pipe(
      take(1),
      switchMap((animals) => of(animals.slice(-5)))
    ),
    { initialValue: Array(5) }
  );

  constructor() {}

  public redirectToAnimalCreation(): void {
    this.routerService.navigate(['/animals/create']);
  }

  public redirectToAnimals() {
    this.routerService.navigate(['/animals']);
  }
}
