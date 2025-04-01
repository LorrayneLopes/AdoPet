import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { of, switchMap, take } from 'rxjs';

import {
  User,
  UserInterfaces,
} from 'src/app/shared/services/user/user.interface';

import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly userService: UserService = inject(UserService);
  private readonly router: Router = inject(Router);

  public userId: number | null = null;

  private reload(): void {
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  private listenToRouteChanges(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (!params) {
        this.router.navigate(['/login']);
      }

      const userId = params['id'];
      this.loadUserProfile(userId);

      this.userId = parseInt(userId, 10);
    });
  }

  private loadUserProfile(userId: string): void {
    this.userService.fetchAndStore(userId).subscribe();
  }

  public onSubmit(updatedUserData: UserInterfaces.Send.Update): void {
    const payload = { ...updatedUserData, id: String(this.userId) };

    this.userService
      .update(payload)
      .pipe(take(1))
      .subscribe((response) => {
        if (response) {
          this.userService.user.set(updatedUserData);
        }

        this.reload();
      });
  }

  public ngOnInit(): void {
    this.listenToRouteChanges();
  }
}
