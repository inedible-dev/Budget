import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddIncomePageRoutingModule } from './add-income-routing.module';

import { AddIncomePage } from './add-income.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddIncomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddIncomePage]
})
export class AddIncomePageModule { }
