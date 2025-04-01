import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { SignupComponent } from './signup/signup.component';
import { LayoutComponent } from './layout/layout.component';
import { AnimalsComponent } from './animals/animals.component';
import { UserAnimalsComponent } from './user-animals/user-animals.component';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { AnimalCreationComponent } from './animal-creation/animal-creation.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    NzSkeletonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [HomeComponent, LoginComponent, SignupComponent, LayoutComponent],
  declarations: [
    HomeComponent,
    LoginComponent,
    SignupComponent,
    LayoutComponent,
    AnimalDetailsComponent,
    UserAnimalsComponent,
    AnimalsComponent,
    EditProfileComponent,
    EditPasswordComponent,
    AnimalCreationComponent,
  ],
})
export class PagesModule {}
