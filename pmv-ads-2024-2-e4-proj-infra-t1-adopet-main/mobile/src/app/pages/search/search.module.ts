import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { ExploreContainerComponentModule } from 'src/app/shared/components/explore-container/explore-container.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    SearchRoutingModule,
    ExploreContainerComponentModule,
  ],
  declarations: [SearchComponent],
  providers: [],
  exports: [],
})
export class SearchModule {}
