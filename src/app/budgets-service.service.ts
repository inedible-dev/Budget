/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable curly */
/* eslint-disable eqeqeq */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-var */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Budget } from './budget.model';
import * as localforage from './../localForage/dist/localforage';
import saveAs from './../SaveFile/FileSaver.min';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BudgetsServiceService {

  currency: string = '￡';



  public budgets: Budget[];



  constructor(private platform: Platform) { }

  convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
  }

  convert() {
    if (this.platform.is('desktop')) {
      const csv = this.convertToCSV(this.budgets);
      var blob = new Blob([csv],
        { type: "text/plain;charset=utf-8" });
      saveAs(blob, "data.csv");
    } else {

    }
  }

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
