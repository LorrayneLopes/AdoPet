import { Component, inject, Input } from '@angular/core';

import { getImageUrl } from 'src/app/utils/getImageUrl';

import { Animal } from 'src/app/shared/services/animal/animal.interfaces';
import { LoaderService } from '../../services/loader/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
})
export class AnimalCardComponent {
  @Input() public animal!: Animal;

  private readonly loaderService: LoaderService = inject(LoaderService);

  public get isLoading(): Observable<boolean> {
    return this.loaderService.isLoading$.asObservable();
  }

  public get hasAnimalData(): boolean {
    return !!this.animal;
  }

  constructor() {}

  public getImageUrl(image: string | null): string {
    return getImageUrl(image);
  }
}
