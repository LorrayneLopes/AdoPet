import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AnimalsComponent } from './pages/animals/animals.component';
import { UserAnimalsComponent } from './pages/user-animals/user-animals.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { EditPasswordComponent } from './pages/edit-password/edit-password.component';
import { AnimalDetailsComponent } from './pages/animal-details/animal-details.component';
import { AnimalCreationComponent } from './pages/animal-creation/animal-creation.component';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'user',
    children: [
      {
        path: 'edit/:id',
        component: EditProfileComponent,
      },
      {
        path: 'edit-password',
        component: EditPasswordComponent,
      },
      {
        path: ':id/animals',
        component: UserAnimalsComponent,
      },
    ],
  },
  {
    path: 'animals',
    children: [
      {
        path: '',
        component: AnimalsComponent,
      },
      {
        path: 'create',
        component: AnimalCreationComponent,
      },
      {
        path: ':id',
        component: AnimalDetailsComponent,
      },
      {
        path: ':id/edit',
        component: AnimalCreationComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
