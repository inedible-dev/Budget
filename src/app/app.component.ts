/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { BudgetsServiceService } from './budgets-service.service';
import { InAppPurchase2, IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { Platform } from '@ionic/angular';
import { PurchaseService } from './purchase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private budgetsService: BudgetsServiceService, private store: InAppPurchase2, public platform: Platform, private purchaseService: PurchaseService) {
    platform.ready().then(() => {
      store.verbosity = this.store.DEBUG;
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

  async ngOnInit() {
    console.warn('ngOnInit()');
    StatusBar.setStyle({ style: Style.Light });
    this.budgetsService.checkCurrency();
    // if (this.platform.is('desktop')) {
    //   this.purchaseService.isPro = true;
    // }
    const localStoragePro = await localStorage.getItem('isPro');
    if (localStoragePro === 'true') {
      console.log('isPro = true');
      this.purchaseService.isPro = true;
    }
  }
}
