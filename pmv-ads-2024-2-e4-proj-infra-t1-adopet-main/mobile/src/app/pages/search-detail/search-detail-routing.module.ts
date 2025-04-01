import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchDetailComponent } from './search-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SearchDetailComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class SearchDetailRoutingModule {}
