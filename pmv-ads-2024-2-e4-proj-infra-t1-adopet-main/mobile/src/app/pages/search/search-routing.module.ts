import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<<< HEAD:mobile/src/app/pages/search/search-routing.module.ts
import { SearchComponent } from './search.component';
========
import { Tab1Page } from './home.page';
>>>>>>>> d8cde15f072c805534788d6d1e52ab9c8486c153:mobile/src/app/pages/search/home-routing.module.ts

const routes: Routes = [
  {
    path: '',
<<<<<<<< HEAD:mobile/src/app/pages/search/search-routing.module.ts
    pathMatch: 'full',
    component: SearchComponent,
========
    component: Tab1Page,
>>>>>>>> d8cde15f072c805534788d6d1e52ab9c8486c153:mobile/src/app/pages/search/home-routing.module.ts
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
<<<<<<<< HEAD:mobile/src/app/pages/search/search-routing.module.ts
========
  exports: [RouterModule],
>>>>>>>> d8cde15f072c805534788d6d1e52ab9c8486c153:mobile/src/app/pages/search/home-routing.module.ts
})
export class SearchRoutingModule {}
