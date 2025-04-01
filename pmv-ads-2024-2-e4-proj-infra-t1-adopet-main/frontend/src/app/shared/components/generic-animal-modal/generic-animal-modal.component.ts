import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EMPTY, switchMap, take } from 'rxjs';

import {
  Gender,
  Size,
  Specie,
  Temperament,
  Sociability,
  LiveWellWith,
  VeterinaryCare,
} from './generic-animal-modal.interfaces';
import {
  Animal,
  AnimalInterfaces,
} from '../../services/animal/animal.interfaces';

import { UserService } from '../../services/user/user.service';
import { AnimalService } from '../../services/animal/animal.service';

import { getImageUrl } from 'src/app/utils/getImageUrl';

type RequestMode = 'INSERT' | 'UPDATE';

@Component({
  selector: 'app-generic-animal-modal',
  templateUrl: './generic-animal-modal.component.html',
  styleUrls: ['./generic-animal-modal.component.css'],
})
export class GenericAnimalModalComponent implements OnInit {
  @Input() public animal: Animal | null = null;

  private readonly route: Router = inject(Router);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly userService: UserService = inject(UserService);
  private readonly animalsService: AnimalService = inject(AnimalService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private selectedFile: File | null = null;

  public readonly sizeOptions = Object.values(Size);
  public readonly specieOptions = Object.values(Specie);
  public readonly genderOptions = Object.values(Gender);
  public readonly sociabilityOptions = Object.values(Sociability);
  public readonly temperamentOptions = Object.values(Temperament);
  public readonly liveWellWithOptions = Object.values(LiveWellWith);
  public readonly veterinaryCareOptions = Object.values(VeterinaryCare);

  public petForm: FormGroup;
  public imagePreview: string | ArrayBuffer | null = null;

  constructor() {
    this.petForm = this.fb.group({
      age: ['', Validators.required],
      name: ['', Validators.required],
      address: this.fb.group({
        city: ['', Validators.required],
        state: ['', Validators.required],
        about: ['Simple about', Validators.required],
      }),
      size: ['', Validators.required],
      gender: ['', Validators.required],
      specie: ['', Validators.required],
      temperament: ['', Validators.required],
      sociability: ['', Validators.required],
      liveWellWith: ['', Validators.required],
      veterinaryCare: ['', Validators.required],
      whatsappVisible: [false],
    });
  }

  private loadAnimalData(): void {
    this.petForm.patchValue({
      age: this.animal?.age,
      name: this.animal?.name,
      address: {
        city: this.animal?.address.city,
        state: this.animal?.address.state,
      },
      size: this.animal?.size,
      gender: this.animal?.gender,
      specie: this.animal?.specie,
      sociability: this.animal?.sociability,
      temperament: this.animal?.temperament,
      liveWellWith: this.animal?.liveWellWith,
      veterinaryCare: this.animal?.veterinaryCare,
    });

    if (this.animal?.image) {
      this.imagePreview = getImageUrl(this.animal.image);
    }
  }

  private redirectToDetails(animalId: string) {
    this.route.navigate(['animals', animalId]);
  }

  private reload(): void {
    const currentRoute = this.route.url;

    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentRoute]);
    });
  }

  private createAnimal(payload: AnimalInterfaces.Send.Create): void {
    this.animalsService
      .create(payload)
      .pipe(take(1))
      .subscribe((response) => this.redirectToDetails(response.id));
  }

  private updateAnimal(payload: AnimalInterfaces.Send.Update): void {
    this.animalsService
      .update(payload)
      .pipe(take(1))
      .subscribe(this.reload.bind(this));
  }

  private buildPayloadByMode(
    mode: RequestMode
  ): AnimalInterfaces.Send.Create | AnimalInterfaces.Send.Update {
    return mode === 'UPDATE'
      ? {
          ...this.animal,
          ...this.petForm.value,
          userId: this.userService.user()?.id,
        }
      : {
          ...this.petForm.value,
          image: null,
          userId: this.userService.user()?.id,
        };
  }

  private makeRequestByMode(
    payload: AnimalInterfaces.Send.Create | AnimalInterfaces.Send.Update,
    mode: 'INSERT' | 'UPDATE'
  ): void {
    return mode === 'UPDATE'
      ? this.updateAnimal(payload as AnimalInterfaces.Send.Update)
      : this.createAnimal(payload);
  }

  private handleSubmit(mode: RequestMode): void {
    const payload = this.buildPayloadByMode(mode);
    const image = this.selectedFile || (this.animal && this.animal.image);

    if (image instanceof File) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result as string;
        this.makeRequestByMode({ ...payload, image: base64Image }, mode);
      };

      reader.readAsDataURL(image);
    } else {
      this.makeRequestByMode({ ...payload, image: image }, mode);
    }
  }

  private listenToRouteParams(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          if (!params['id']) return EMPTY;

          return this.animalsService.getById(params['id']);
        })
      )
      .subscribe((animal) => {
        this.animal = animal;

        this.loadAnimalData();
      });
  }

  public isFieldInvalid(controlName: string): boolean {
    const control = this.petForm.get(controlName);
    return control
      ? control.invalid && (control.touched || control.dirty)
      : false;
  }

  public onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const reader = new FileReader();
      this.selectedFile = fileInput.files[0];

      reader.onload = (e) => {
        if (typeof e.target?.result !== 'undefined')
          this.imagePreview = e.target?.result;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  public onSubmit(): void {
    if (!this.petForm.valid) return;

    const mode: RequestMode = this.animal ? 'UPDATE' : 'INSERT';
    this.handleSubmit(mode);
  }

  public ngOnInit(): void {
    this.listenToRouteParams();
  }
}
