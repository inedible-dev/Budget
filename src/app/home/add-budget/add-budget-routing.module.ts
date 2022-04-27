import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBudgetPage } from './add-budget.page';

const routes: Routes = [
  {
    path: '',
    component: AddBudgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBudgetPageRoutingModule {}
