/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable space-before-function-paren */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import * as localforage from './../../localForage/dist/localforage.min.js';
import { Budget } from '../budget.model';
import { BudgetsServiceService } from '../budgets-service.service';
import { AnimationController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  budgets: Budget[];
  budgetReversed: Budget[];



  constructor(public budgetsService: BudgetsServiceService, private animationController: AnimationController, private platform: Platform) { }

  async ngOnInit() {
    this.budgetsService.getLocalForage();
    console.log('ngOnInit');
    let cacheData = await localforage.getItem('budgets') as unknown as string;
    this.budgets = JSON.parse(cacheData);
    this.budgetReversed = this.budgets.reverse();
    console.log(this.budgets);
  }
  ionViewDidEnter() {
    this.budgets = this.budgetsService.budgets as Budget[];
    console.log('ionView', this.budgets);
    this.budgetReversed = this.budgets.reverse();
  }
  track(id, budget) {
    return budget.id;
  }
  addBudgetPressed() {
    console.log('addPressed');
  }
  async onDeletePressed(id: string) {
    let slide = document.getElementById(id);
    const animation = this.animationController.create()
      .addElement(slide)
      .duration(100)
      .fromTo('transform', 'translateX(0px)', `translateX(-${this.platform.width()}px)`);
    await animation.play();
    this.budgetsService.budgets = this.budgetsService.budgets.filter(p => {
      return p.id !== id;
    });
    this.budgets = this.budgetsService.budgets as Budget[];
    this.budgetsService.setLocalForage();
  }

}
