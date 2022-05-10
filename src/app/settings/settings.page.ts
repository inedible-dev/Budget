/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { BudgetsServiceService } from '../budgets-service.service';
import { InAppPurchase2, IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  currency: string;

  currencyForm = this.formBuilder.group({
    data: this.budgetsService.currency
  });

  constructor(public budgetsService: BudgetsServiceService, private formBuilder: FormBuilder, private navController: NavController, private store: InAppPurchase2, public purchaseService: PurchaseService, private platform: Platform) {
    platform.ready().then(() => {
      this.store.register({
        id: "BUDJET1PRO",
        type: this.store.NON_CONSUMABLE,
      });
      this.store.when("BUDJET1PRO")
        .owned(() => {
          console.log('owned');
          purchaseService.isPro = true;
          localStorage.setItem('isPro', 'true');
        })
        .valid(() => {
          console.log('valid');
        });
      this.store.ready(() => {
        this.store.when("product").approved((p: IAPProduct) => p.finish());
        this.store.when("BUDJET1PRO").owned((p: IAPProduct) => {
          purchaseService.isPro = true;
          localStorage.setItem('isPro', 'true');
        });
      });
      this.store.refresh();
    });
  }

  ngOnInit() {
    this.currency = this.budgetsService.currency;
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
    this.navController.navigateRoot('/home', { animated: true, animationDirection: 'back' });
  }

  onExportPressed() {
    this.budgetsService.convert();
  }

}
