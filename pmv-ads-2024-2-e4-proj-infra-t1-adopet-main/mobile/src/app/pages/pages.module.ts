import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { LoginModule } from './login/login.module';

import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [IonicModule, LoginModule, PagesRoutingModule, SharedModule],
  declarations: [PagesComponent],
  exports: [PagesComponent],
})
export class PagesModule {}
