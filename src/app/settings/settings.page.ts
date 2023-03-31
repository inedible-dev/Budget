/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { BudgetsServiceService } from '../budgets-service.service';
import { InAppPurchase2, IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { PurchaseService } from '../purchase.service';
import { Budget } from '../budget.model';
import { IncomeExpense } from '../incomeExpense.model';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  currency: string;
  product: IAPProduct;
  dataSource: [
    { x: 'Food&Drink'; y: number; color: string },
    { x: 'Transportation'; y: number; color: string },
    { x: 'Entertainment'; y: number; color: string },
    { x: 'Shopping'; y: number; color: string },
    { x: 'Health'; y: number; color: string },
    { x: 'Education'; y: number; color: string },
    { x: 'Other'; y: number; color: string }
  ];
  numberOfFood: number;
  numberOfTransportation: number;
  numberOfEntertainment: number;
  numberOfShopping: number;
  numberOfHealth: number;
  numberOfEducation: number;
  numberOfOther: number;
  budgetFiltered: Budget[];
  budgetIncomeExpenseFiltered: IncomeExpense[];
  public chart: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  dataLabel: Object;
  // eslint-disable-next-line @typescript-eslint/ban-types
  public legendSettings: Object;
  // eslint-disable-next-line @typescript-eslint/ban-types
  toolTip: Object;
  public pointColorMapping: string;
  total: number;
  percentFood: number;
  percentTransportation: number;
  percentEntertainment: number;
  percentShopping: number;
  percentHealth: number;
  percentEducation: number;
  percentOther: number;

  currencyForm = this.formBuilder.group({
    data: this.budgetsService.currency
  });

  constructor(public budgetsService: BudgetsServiceService, private formBuilder: FormBuilder, private navController: NavController, public store: InAppPurchase2, public purchaseService: PurchaseService, private platform: Platform) {
    // platform.ready().then(() => {
    //   this.store.register({
    //     id: "BUDJET1PRO",
    //     type: this.store.NON_CONSUMABLE,
    //   });
    //   this.store.when("BUDJET1PRO")
    //     .owned(() => {
    //       console.log('owned');
    //       purchaseService.isPro = true;
    //       localStorage.setItem('isPro', 'true');
    //     })
    //     .valid(() => {
    //       console.log('valid');
    //     });
    //   this.store.ready(() => {
    //     this.store.when("product").approved((p: IAPProduct) => p.finish());
    //     this.store.when("BUDJET1PRO").owned((p: IAPProduct) => {
    //       purchaseService.isPro = true;
    //       localStorage.setItem('isPro', 'true');
    //     });
    //   });
    //   this.store.refresh();
    // });
  }

  ngOnInit() {
    this.currency = this.budgetsService.currency;
    this.product = this.store.get('BUDJET1PRO');
    this.legendSettings = {
      visible: true,
      position:'Top',
      alignment:'Near'
    };
  }

  ionViewWillEnter() {
    this.product = this.store.get('BUDJET1PRO');
    // count Food
    this.budgetIncomeExpenseFiltered = [];
    this.numberOfFood = 0;
    this.numberOfTransportation = 0;
    this.numberOfEntertainment = 0;
    this.numberOfShopping = 0;
    this.numberOfHealth = 0;
    this.numberOfEducation = 0;
    this.numberOfOther = 0;
    for (let budget of this.budgetsService.budgets) {
      // this.budgetIncomeExpenseFiltered = budget.incomeExpense.filter(incomeExpense => incomeExpense.type === 'Food&Drink');
      this.budgetIncomeExpenseFiltered.push(...budget.incomeExpense.filter(incomeExpense => incomeExpense.type === 'Food&Drink'));
    }
    // this.numberOfFood = this.budgetIncomeExpenseFiltered.length;
    for (let incomeExpense of this.budgetIncomeExpenseFiltered) {
      this.numberOfFood += incomeExpense.money;
    }
    // count Transportation
    this.budgetIncomeExpenseFiltered = [];
    for (let budget of this.budgetsService.budgets) {
      this.budgetIncomeExpenseFiltered.push(...budget.incomeExpense.filter(incomeExpense => incomeExpense.type === 'Transportation'));
    }
    // this.numberOfTransportation = this.budgetIncomeExpenseFiltered.length;
    for (let incomeExpense of this.budgetIncomeExpenseFiltered) {
      this.numberOfTransportation += incomeExpense.money;
    }
    // count Entertainment
    this.budgetIncomeExpenseFiltered = [];
    for (let budget of this.budgetsService.budgets) {
      this.budgetIncomeExpenseFiltered.push(...budget.incomeExpense.filter(incomeExpense => incomeExpense.type === 'Entertainment'));
    }
    // this.numberOfEntertainment = this.budgetIncomeExpenseFiltered.length;
    for (let incomeExpense of this.budgetIncomeExpenseFiltered) {
      this.numberOfEntertainment += incomeExpense.money;
    }
    // count Shopping
    this.budgetIncomeExpenseFiltered = [];
    for (let budget of this.budgetsService.budgets) {
      this.budgetIncomeExpenseFiltered.push(...budget.incomeExpense.filter(incomeExpense => incomeExpense.type === 'Shopping'));
    }
    // this.numberOfShopping = this.budgetIncomeExpenseFiltered.length;
    for (let incomeExpense of this.budgetIncomeExpenseFiltered) {
      this.numberOfShopping += incomeExpense.money;
    }
    // count Health
    this.budgetIncomeExpenseFiltered = [];
    for (let budget of this.budgetsService.budgets) {
      this.budgetIncomeExpenseFiltered.push(...budget.incomeExpense.filter(incomeExpense => incomeExpense.type === 'Health'));
    }
    // this.numberOfHealth = this.budgetIncomeExpenseFiltered.length;
    for (let incomeExpense of this.budgetIncomeExpenseFiltered) {
      this.numberOfHealth += incomeExpense.money;
    }
    // count Education
    this.budgetIncomeExpenseFiltered = [];
    for (let budget of this.budgetsService.budgets) {
      this.budgetIncomeExpenseFiltered.push(...budget.incomeExpense.filter(incomeExpense => incomeExpense.type === 'Education'));
    }
    // this.numberOfEducation = this.budgetIncomeExpenseFiltered.length;
    for (let incomeExpense of this.budgetIncomeExpenseFiltered) {
      this.numberOfEducation += incomeExpense.money;
    }
    // count Other
    this.budgetIncomeExpenseFiltered = [];
    for (let budget of this.budgetsService.budgets) {
      this.budgetIncomeExpenseFiltered.push(...budget.incomeExpense.filter(incomeExpense => incomeExpense.type === 'Other'));
    }
    // this.numberOfOther = this.budgetIncomeExpenseFiltered.length;
    for (let incomeExpense of this.budgetIncomeExpenseFiltered) {
      this.numberOfOther += incomeExpense.money;
    }
    this.dataSource = [
      { x: 'Food&Drink', y: this.numberOfFood, color: '#4287f5' },
      { x: 'Transportation', y: this.numberOfTransportation, color: '#f54242' },
      { x: 'Entertainment', y: this.numberOfEntertainment, color: '#5df542' },
      { x: 'Shopping', y: this.numberOfShopping, color: '#f5d742' },
      { x: 'Health', y: this.numberOfHealth, color: '#f57e42' },
      { x: 'Education', y: this.numberOfEducation, color: '#9e42f5' },
      { x: 'Other', y: this.numberOfOther, color: '#f5428d' }
    ];
    this.dataLabel = { visible: true};

    this.toolTip = { enable: true, header: 'Browser', format: '${point.x}:<b> ${point.y}%<b>' };
    this.pointColorMapping = 'color';

    // percent calculation
    this.total = this.numberOfFood + this.numberOfTransportation + this.numberOfEntertainment + this.numberOfShopping + this.numberOfHealth + this.numberOfEducation + this.numberOfOther;
    this.percentFood = Math.round((this.numberOfFood / this.total) * 100);
    this.percentTransportation = Math.round((this.numberOfTransportation / this.total) * 100);
    this.percentEntertainment = Math.round((this.numberOfEntertainment / this.total) * 100);
    this.percentShopping = Math.round((this.numberOfShopping / this.total) * 100);
    this.percentHealth = Math.round((this.numberOfHealth / this.total) * 100);
    this.percentEducation = Math.round((this.numberOfEducation / this.total) * 100);
    this.percentOther = Math.round((this.numberOfOther / this.total) * 100);
    this.chart = new Chart("MyChart", {
        type: 'pie', //this denotes tha type of chart

        data: {// values on X-Axis
          labels: [`Food ${this.percentFood}%`, `Transportation ${this.percentTransportation}%`,`Entertainment ${this.percentEntertainment}%`,`Shopping ${this.percentShopping}%`,`Health ${this.percentHealth}%`,`Education ${this.percentEducation}%`,`Others ${this.percentOther}%` ],
          datasets: [{
      label: 'Ratio',
      data: [this.numberOfFood, this.numberOfTransportation, this.numberOfEntertainment, this.numberOfShopping, this.numberOfHealth, this.numberOfEducation, this.numberOfOther],
      backgroundColor: [
        'red',
        'pink',
        'green',
        'yellow',
        'orange',
        'blue',
        'purple'
      ],
      hoverOffset: 4
    }],
        },
        options: {
          aspectRatio:2
        }

      });
  }

  onCurrencyFormSubmitted() {
    this.currency = this.currencyForm.value.data;
    this.budgetsService.currency = this.currencyForm.value.data;
    localStorage.setItem('currency', this.currencyForm.value.data);
    console.log(this.currencyForm.value.data);
    this.navController.navigateBack('/home');
  }

  onUpgradePressed() {
    if (this.platform.is('desktop')) {
      alert('Buying...');
      this.purchaseService.isPro = true;
    }
    this.store.order("BUDJET1PRO");
    // this.navController.navigateRoot('/home', { animated: true, animationDirection: 'back' });
  }

  onExportPressed() {
    this.budgetsService.convert();
  }

}
