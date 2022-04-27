/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Budget } from './budget.model';
import * as localforage from './../localForage/dist/localforage';

@Injectable({
  providedIn: 'root'
})
export class BudgetsServiceService {

  currency: string = '￡';

  public budgets: Budget[] = JSON.parse('[{"id":"b1","title":"April","money":120.87,"color":"green-500","incomeExpense":[{"id":"i1","money":120.87,"title":"Gift","color":"green-500"}]}]');

  constructor() { }

  async getLocalForage() {
    console.error(this.budgets);
    console.warn(await localforage.getItem('budgets') as unknown as string);
    let cacheBudget = await localforage.getItem('budgets') as unknown as string;
    this.budgets = JSON.parse(cacheBudget);
    console.log(this.budgets);
    // this._budget = JSON.parse(localforage.getItem('budgets') as unknown as string)
  }
  setLocalForage() {
    localforage.setItem('budgets', JSON.stringify(this.budgets));
    console.error('setLocalStorage');
  }

  async checkCurrency() {
    if (!localStorage.getItem('currency')) {
      localStorage.setItem('currency', '￡');
    } else {
      this.currency = await localStorage.getItem('currency');
    }
  }
}
