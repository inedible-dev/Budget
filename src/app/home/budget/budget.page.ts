/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable curly */
/* eslint-disable eqeqeq */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  AnimationController,
  NavController,
  Platform
} from '@ionic/angular';
import {
  Budget
} from './../../budget.model';
import {
  BudgetsServiceService
} from './../../budgets-service.service';
import saveAs from './../../../SaveFile/FileSaver.min.js';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { PurchaseService } from './../../purchase.service'
import { AlertController } from '@ionic/angular';
import { IncomeExpense } from './../../incomeExpense.model'

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.scss'],
})
export class BudgetPage implements OnInit {

  budget: Budget;
  budgetId: string;

  constructor(private activatedRoute: ActivatedRoute, private navController: NavController, public budgetsService: BudgetsServiceService, private animationController: AnimationController, private platform: Platform, private fileOpener: FileOpener, private purchaseService: PurchaseService, private alertController: AlertController) { }
  // ngOnInit() {
  //   console.log('ngOnInit')
  // }

  ngOnInit() {
    console.log('ngOnInit()')
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

  // ionViewWillEnter() {
  //   console.log('ionViewWillEnter')
  //   this.activatedRoute.paramMap.subscribe(e => {
  //     if (!e.get('budgetId')) {
  //       this.navController.navigateBack('/home');
  //       return;
  //     }
  //     this.budget = this.budgetsService.budgets.find(p => {
  //       return p.id === e.get('budgetId');
  //     });
  //     this.budgetId = e.get('budgetId');
  //   });
  // }

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
  async onExportPressed() {
    const newBudget: IncomeExpense[] = this.budget.incomeExpense;
    var banana = newBudget.filter(e => {
      delete e.id;
      delete e.color
      return e;
    })
    console.log(this.convertToCSV([...banana]));
    const dataString = this.budget.title + '\r\n' + this.convertToCSV([...banana]) + '\r\n' + 'TOTAL,' + this.budget.money;
    if (this.purchaseService.isPro == true) {
      if (this.platform.is('desktop')) {
        var blob = new Blob([dataString],
          { type: "text/plain;charset=utf-8" });
        saveAs(blob, "data.csv");
        window.location.replace('/home');
      } else {
        const result = await Filesystem.writeFile({
          path: 'data.csv',
          data: dataString,
          directory: Directory.Documents,
          encoding: Encoding.UTF8
        })

        await this.fileOpener.showOpenWithDialog(result.uri, 'application/csv')
        // this.navController.navigateRoot('/home', { animated: true, animationDirection: 'back' });
        window.location.replace('/home');
        // window.location.reload();

      }
    } else {
      this.alertController.create({
        header: 'Pro upgrade required.',
        message: 'Pro upgrade is required to use export CSV function.',
        buttons: ['Dismiss']
      }).then(a => {
        a.present();
      })
    }
  }

}
