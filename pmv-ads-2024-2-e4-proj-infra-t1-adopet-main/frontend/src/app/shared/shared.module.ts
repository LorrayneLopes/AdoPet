import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutCardComponent } from './components/about-card/about-card.component';
import { AvatarMenuComponent } from './components/avatar-menu/avatar-menu.component';
import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { BadgesListComponent } from './components/badges-list/badges-list.component';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { GenericUserFormComponent } from './components/generic-user-form/generic-user-form.component';
import { AnimalFilterModalComponent } from './components/animal-filter-modal/animal-filter-modal.component';
import { GenericAnimalModalComponent } from './components/generic-animal-modal/generic-animal-modal.component';
import { InstallBannerComponent } from './components/install-banner/install-banner.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzIconModule,
    NzMenuModule,
    NzAvatarModule,
    NzDropDownModule,
    NzSkeletonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HeaderComponent,
    LoaderComponent,
    FooterComponent,
    AboutCardComponent,
    AnimalCardComponent,
    AnimalListComponent,
    AvatarMenuComponent,
    BadgesListComponent,
    ContactModalComponent,
    ConfirmModalComponent,
    InstallBannerComponent,
    GenericUserFormComponent,
    AnimalFilterModalComponent,
    GenericAnimalModalComponent,
  ],
  providers: [],
  exports: [
    HeaderComponent,
    LoaderComponent,
    FooterComponent,
    AboutCardComponent,
    AvatarMenuComponent,
    AnimalCardComponent,
    AnimalListComponent,
    BadgesListComponent,
    ContactModalComponent,
    InstallBannerComponent,
    GenericUserFormComponent,
    GenericAnimalModalComponent,
  ],
})
export class SharedModule {}
