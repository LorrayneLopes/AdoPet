import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  catchError,
  EMPTY,
  forkJoin,
  from,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

import {
  Animal,
  AnimalInterfaces,
} from 'src/app/shared/services/animal/animal.interfaces';
import { Action, ParamsType } from './user-animals.interfaces';
import { UserInterfaces } from 'src/app/shared/services/user/user.interface';
import { ConfirmModalResult } from 'src/app/shared/components/confirm-modal/confirm-modal.interfaces';

import { UserService } from 'src/app/shared/services/user/user.service';
import { AnimalService } from 'src/app/shared/services/animal/animal.service';

@Component({
  selector: 'app-user-animals',
  templateUrl: './user-animals.component.html',
  styleUrls: ['./user-animals.component.css'],
})
export class UserAnimalsComponent implements OnInit {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly animalService: AnimalService = inject(AnimalService);
  private readonly userService: UserService = inject(UserService);
  private readonly modalService: NgbModal = inject(NgbModal);
  private readonly router: Router = inject(Router);

  public readonly date: Date = new Date();

  public readonly actions: Action[] = this.buildActionButtons();
  public readonly animals: WritableSignal<AnimalInterfaces.Receive.GetAll> =
    signal([]);

  public readonly userSignal: WritableSignal<UserInterfaces.Receive.GetById | null> =
    signal(null);

  public get user(): UserInterfaces.Receive.GetById | null {
    return this.userSignal();
  }

  constructor() {}

  private buildActionButtons(): Action[] {
    const iconsBasePath = 'assets/icons/';

    return [
      {
        label: 'Visualizar',
        icon: iconsBasePath + 'house.png',
        canShow: () => true,
        action: this.redirectToAnimalPage.bind(this),
      },
      {
        label: 'Editar',
        icon: iconsBasePath + 'pencil.png',
        canShow: this.isOwner.bind(this),
        action: this.onEditAnimal.bind(this),
      },
      {
        label: 'Excluir',
        icon: iconsBasePath + 'trash.png',
        canShow: this.isOwner.bind(this),
        action: this.openDeleteModal.bind(this),
      },
    ];
  }

  private isOwner(animal: Animal): boolean {
    return this.userService.user()?.id === animal.userId;
  }

  private openDeleteModal(animal: Animal): void {
    const deleteModalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
      size: 'sm',
      modalDialogClass: 'confirm-modal',
    });

    deleteModalRef.componentInstance.config = {
      title: `Deseja realmente excluir o animal ${animal.name}?`,
      message: `Essa ação não pode ser revertida!`,
      type: 'danger',
    };

    from(deleteModalRef.result)
      .pipe(
        take(1),
        catchError((_) => {
          return of(ConfirmModalResult.CANCEL);
        })
      )
      .subscribe((result) => {
        result === ConfirmModalResult.CONFIRM
          ? this.onDeleteAnimal(animal)
          : null;
      });
  }

  private onDeleteAnimal(animal: Animal): void {
    this.animalService.delete(animal.id).subscribe(() => {
      this.animals.set(this.animals().filter((a) => a.id !== animal.id));
    });
  }

  private listenToRouteParams(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          if (!params['id']) return EMPTY;

          const { id } = params;

          return forkJoin([
            this.userService.getById(id),
            this.animalService.getAll({ userId: id }),
          ]);
        })
      )
      .subscribe(([user, animals]) => {
        this.userSignal.set(user);
        this.animals.set(animals);
      });
  }

  private redirectToAnimalPage(animal: Animal): void {
    this.router.navigate(['animals', animal.id]);
  }

  public copyProfileLink(): void {
    const profileLink = window.location.href;
    navigator.clipboard
      .writeText(profileLink)
      .then(() => {
        alert('Link do perfil copiado para a área de transferência!');
      })
      .catch((err) => console.error('Erro ao copiar o link: ', err));
  }

  public formatUsername(user: UserInterfaces.Receive.GetById | null): string {
    let username = '';

    if (user?.name) {
      username += user.name;
    }

    if (user?.surname) {
      username += ` ${user.surname}`;
    }

    return username;
  }

  public formatAnimalDescription(animal: Animal) {
    return `${animal.specie} | ${animal.gender} | ${animal.age} ano(s) | ${animal.size}`;
  }

  public onEditAnimal(animal: Animal): void {
    this.router.navigate(['/animals', animal.id, 'edit']);
  }

  public ngOnInit(): void {
    this.listenToRouteParams();
  }
}
