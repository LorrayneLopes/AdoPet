import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [IonicModule, ReactiveFormsModule, LoginRoutingModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
