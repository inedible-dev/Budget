/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Budget } from './../../budget.model';
import { BudgetsServiceService } from './../../budgets-service.service';
import { IncomeExpense } from './../../incomeExpense.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.page.html',
  styleUrls: ['./add-income.page.scss'],
})
export class AddIncomePage implements OnInit {

  income: string;
  budget: Budget;
  theId: string;

  incomeForm = this.formBuilder.group({
    name: '',
    amount: 0
  });

  constructor(private navController: NavController, private activatedRoute: ActivatedRoute, private budgetsService: BudgetsServiceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(e => {
      if (!e.get('budgetId')) {
        this.navController.navigateBack('/home');
        return;
      }
      this.budget = this.budgetsService.budgets.find(p => {
        return p.id === e.get('budgetId');
      });
      this.theId = e.get('budgetId');
    });
  }
  makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  onSubmitted() {
    if (!this.budget.incomeExpense) {
      this.budget.incomeExpense = [];
    }
    if (!this.incomeForm.valid && this.incomeForm.value.amount < 0) {
      return;
    }

    let cacheBuilder: IncomeExpense = { id: this.makeid(24), color: 'green-500', title: this.incomeForm.value.name, money: this.incomeForm.value.amount };
    this.budget.incomeExpense = this.budget.incomeExpense.concat(...[cacheBuilder]);
    this.budgetsService.budgets = this.budgetsService.budgets.filter(p => {
      return p.id !== this.theId;
    });
    this.budget.money = this.budget.money + +this.incomeForm.value.amount;
    if (this.budget.money > 0) {
      this.budget.color = 'green-500';
    } else if (this.budget.money < 0) {
      this.budget.color = 'red-500';
    } else {
      this.budget.color = 'yellow-500';
    }
    this.budgetsService.budgets = this.budgetsService.budgets.concat(...[this.budget]);
    this.budgetsService.setLocalForage();
    this.navController.navigateBack(['/', 'home', this.theId]);
  }

}
