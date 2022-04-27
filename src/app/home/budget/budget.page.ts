/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController, NavController, Platform } from '@ionic/angular';
import { Budget } from './../../budget.model';
import { BudgetsServiceService } from './../../budgets-service.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {

  budget: Budget;
  budgetId: string;

  constructor(private activatedRoute: ActivatedRoute, private navController: NavController, public budgetsService: BudgetsServiceService, private animationController: AnimationController, private platform: Platform) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(e => {
      if (!e.get('budgetId')) {
        this.navController.navigateBack('/home');
        return;
      }
      this.budget = this.budgetsService.budgets.find(p => {
        return p.id === e.get('budgetId');
      });
      this.budgetId = e.get('budgetId');
    });
  }

  addIncomePressed() {
    console.log('add Income.');
  }
  addExpensePressed() {
    console.log('add Expense.');
  }
  track(id, budget) {
    return budget.id;
  }
  async onDelete(id: string, amount: number) {
    let element = document.getElementById(id);
    const animation = this.animationController.create()
      .addElement(element)
      .duration(100)
      .fromTo('transform', 'translateX(0px)', `translateX(-${this.platform.width()}px)`);
    await animation.play();
    this.budget.incomeExpense = this.budget.incomeExpense.filter(p => {
      return p.id !== id;
    });
    this.budget.money = this.budget.money - amount;
    if (this.budget.money > 0) {
      this.budget.color = 'green-500';
    } else if (this.budget.money < 0) {
      this.budget.color = 'red-500';
    } else {
      this.budget.color = 'yellow-500';
    }
    this.budgetsService.budgets = this.budgetsService.budgets.filter(p => {
      return p.id !== this.budgetId;
    });
    this.budgetsService.budgets = this.budgetsService.budgets.concat(...[this.budget]);

  }

}
