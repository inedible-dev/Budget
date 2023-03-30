/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
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
import { PurchaseService } from './../purchase.service';
import { InAppPurchase2, IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  budgets: Budget[];
  budgetReversed: Budget[];
  isPro: boolean;



  constructor(public budgetsService: BudgetsServiceService, private animationController: AnimationController, private platform: Platform, public purchaseService: PurchaseService, private store: InAppPurchase2, private navController: NavController) {
    platform.ready().then(() => {
      this.store.register({
        id: "BUDJET1PRO",
        type: this.store.NON_CONSUMABLE,
      });
      this.store.when("BUDJET1PRO")
        .owned(() => {
          console.log('owned');
          purchaseService.isPro = true;
        })
        .valid(() => {
          console.log('valid');
        });
      this.store.ready(() => {
        this.store.when("product").approved((p: IAPProduct) => p.finish());
        this.store.when("BUDJET1PRO").owned((p: IAPProduct) => {
          purchaseService.isPro = true;
          navController.navigateRoot('/home', { animated: true, animationDirection: 'back' });

        });
      });
      this.store.refresh();
    });
  }

  async ngOnInit() {
    this.budgetsService.getLocalForage();
    console.log('ngOnInit');
    let cacheData = await localforage.getItem('budgets') as unknown as string;
    this.budgets = JSON.parse(cacheData);
    this.budgetReversed = this.budgets.reverse();
    console.log(this.budgets);
    this.isPro = this.purchaseService.isPro;

  }
  ionViewDidEnter() {
    this.budgets = this.budgetsService.budgets as Budget[];
    console.log('ionView', this.budgets);
    // this.budgetReversed = this.budgets.reverse();
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    this.budgetReversed = this.budgets.sort(function(a: Budget, b: Budget){return b.money-a.money});

  }

  ionViewWillEnter() {
    this.isPro = this.purchaseService.isPro;
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
