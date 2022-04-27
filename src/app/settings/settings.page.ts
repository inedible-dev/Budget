import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { BudgetsServiceService } from '../budgets-service.service';

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

  constructor(private budgetsService: BudgetsServiceService, private formBuilder: FormBuilder, private navController: NavController) { }

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

}
