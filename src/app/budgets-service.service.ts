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
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

@Injectable({
  providedIn: 'root'
})
export class BudgetsServiceService {

  currency: string = '£';



  public budgets: Budget[];



  constructor(private platform: Platform, private fileOpener: FileOpener) { }

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

  async convert() {
    if (this.platform.is('desktop')) {
      var blob = new Blob([JSON.stringify(this.budgets)],
        { type: "text/plain;charset=utf-8" });
      saveAs(blob, "data.json");
    } else {
      const result = await Filesystem.writeFile({
        path: 'data.json',
        data: JSON.stringify(this.budgets),
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      })

      this.fileOpener.showOpenWithDialog(result.uri, 'application/json')

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
      localStorage.setItem('currency', '£');
    } else {
      this.currency = await localStorage.getItem('currency');
    }
  }
}
