import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchDetailRoutingModule } from './search-detail-routing.module';
import { SearchDetailComponent } from './search-detail.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, SearchDetailRoutingModule, IonicModule, SharedModule],
  declarations: [SearchDetailComponent],
  exports: [SearchDetailComponent],
})
export class SearchDetailModule {}
