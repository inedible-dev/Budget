/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { BudgetsServiceService } from './budgets-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private budgetsService: BudgetsServiceService) { }

  ngOnInit() {
    StatusBar.setStyle({ style: Style.Light });
    this.budgetsService.checkCurrency();
  }
}
