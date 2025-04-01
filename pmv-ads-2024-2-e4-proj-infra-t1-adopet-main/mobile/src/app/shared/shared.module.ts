import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { ExploreContainerComponentModule } from './components/explore-container/explore-container.module';

import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import { AnimalFilterModalComponent } from './components/animal-filter-modal/animal-filter-modal.component';
import { BadgesListComponent } from './components/badges-list/badges-list.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
  ],
  declarations: [
    BadgesListComponent,
    AnimalListComponent,
    AnimalCardComponent,
    AnimalFilterModalComponent,
  ],
  providers: [],
  exports: [
    BadgesListComponent,
    AnimalListComponent,
    AnimalCardComponent,
    AnimalFilterModalComponent,
    ExploreContainerComponentModule,
  ],
})
export class SharedModule {}
