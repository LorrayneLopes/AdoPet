import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AnimalInterfaces } from 'src/app/shared/services/animal/animal.interfaces';
import { GridSize } from './animal-list.interfaces';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css'],
})
export class AnimalListComponent {
  @Input() public animals: AnimalInterfaces.Receive.GetAll = [];
  @Input() public gridSize: GridSize = { min: '12.625rem', max: '1fr' };

  private readonly router: Router = inject(Router);

  public redirectToAnimalDetails(id: string): void {
    this.router.navigate(['/animals', id]);
  }
}
