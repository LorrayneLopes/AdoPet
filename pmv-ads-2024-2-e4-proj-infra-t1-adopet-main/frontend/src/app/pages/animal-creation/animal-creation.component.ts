import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map, of, switchMap } from 'rxjs';

import { Animal } from 'src/app/shared/services/animal/animal.interfaces';
import { AnimalService } from 'src/app/shared/services/animal/animal.service';

@Component({
  selector: 'app-animal-creation',
  templateUrl: './animal-creation.component.html',
  styleUrls: ['./animal-creation.component.css'],
})
export class AnimalCreationComponent implements OnInit {
  private readonly animalsService: AnimalService = inject(AnimalService);
  private readonly activatedRouter: ActivatedRoute = inject(ActivatedRoute);

  public readonly animalSignal: WritableSignal<Animal | null> =
    signal<Animal | null>(null);

  public get animal(): Animal | null {
    return this.animalSignal();
  }

  private listenToRouterParams(): void {
    this.activatedRouter.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => (id ? this.animalsService.getById(id) : of(null)))
      )
      .subscribe((response) => this.animalSignal.set(response));
  }

  public ngOnInit(): void {
    this.listenToRouterParams();
  }
}
