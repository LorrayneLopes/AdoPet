import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

import { GenericAnimalModalComponent } from '../generic-animal-modal/generic-animal-modal.component';

@Component({
  selector: 'app-avatar-menu',
  templateUrl: './avatar-menu.component.html',
  styleUrls: ['./avatar-menu.component.css'],
})
export class AvatarMenuComponent {
  private readonly authService: AuthService = inject(AuthService);
  private readonly userService: UserService = inject(UserService);
  private readonly modalService: NgbModal = inject(NgbModal);
  private readonly router: Router = inject(Router);

  constructor() {}

  public logout(): void {
    this.authService.logout();
  }

  private redirectTo(route: string): void {
    const user = this.userService.user();

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate([route]);
  }

  public redirectToPasswordEdition(): void {
    this.redirectTo('user/edit-password');
  }

  public redirectToEditProfile(): void {
    this.redirectTo('user/edit');
  }

  public redirectToAnimalCreation(): void {
    this.redirectTo('animals/create');
  }

  public redirectToMyAnimals(): void {
    const user = this.userService.user();
    if (user) {
      this.router.navigate(['/user', user.email, 'animals']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
