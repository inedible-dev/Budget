import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddIncomePage } from './add-income.page';

const routes: Routes = [
  {
    path: '',
    component: AddIncomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddIncomePageRoutingModule {}
