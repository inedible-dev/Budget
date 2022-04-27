import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'add-budget',
    loadChildren: () => import('./add-budget/add-budget.module').then(m => m.AddBudgetPageModule)
  },
  {
    path: 'add-income/:budgetId',
    loadChildren: () => import('./add-income/add-income.module').then(m => m.AddIncomePageModule)
  },
  {
    path: 'add-expense/:budgetId',
    loadChildren: () => import('./add-expense/add-expense.module').then(m => m.AddExpensePageModule)
  },
  {
    path: ':budgetId',
    loadChildren: () => import('./budget/budget.module').then(m => m.BudgetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
