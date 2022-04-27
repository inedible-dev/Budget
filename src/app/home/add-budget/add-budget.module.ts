import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBudgetPageRoutingModule } from './add-budget-routing.module';

import { AddBudgetPage } from './add-budget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBudgetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddBudgetPage]
})
export class AddBudgetPageModule { }
