/* eslint-disable no-var */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Budget } from './../../budget.model';
import { BudgetsServiceService } from 'src/app/budgets-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.page.html',
  styleUrls: ['./add-budget.page.scss'],
})
export class AddBudgetPage implements OnInit {

  addBudgetForm = this.formBuilder.group({
    name: ''
  });

  budget: Budget;

  constructor(private formBuilder: FormBuilder, private budgetsService: BudgetsServiceService, private navController: NavController) { }

  ngOnInit() {
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

  async onSubmit() {
    if (!this.addBudgetForm.value.name) {
      console.error('No data provided!');
      return;
    }
    this.budget = {
      id: this.makeid(24),
      title: this.addBudgetForm.value.name,
      color: 'yellow-500',
      money: 0,
    };
    console.log(this.budget);
    if (this.budgetsService.budgets === null) {
      this.budgetsService.budgets = [];
    }
    this.budgetsService.budgets = this.budgetsService.budgets?.concat(...[this.budget]);
    this.budgetsService.setLocalForage();
    console.log(this.budgetsService.budgets);
    this.navController.navigateBack('/home');
    // banana
  }

}
