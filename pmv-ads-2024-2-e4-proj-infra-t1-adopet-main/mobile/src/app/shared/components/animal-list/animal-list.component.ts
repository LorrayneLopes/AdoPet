import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

import { GridSize } from './animal-list.interfaces';
import { AnimalInterfaces } from 'src/app/shared/services/animal/animal.interfaces';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
})
export class AnimalListComponent {
  @Input() public animals: AnimalInterfaces.Receive.GetAll = [];
  @Input() public gridSize: GridSize = { min: '12.625rem', max: '1fr' };

  private readonly router: Router = inject(Router);

  public redirectToAnimalDetails(id: string): void {
    this.router.navigate(['/pages', 'search', id]);
  }
}
