import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InAppPurchase2 } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
// import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, InAppPurchase2, FileOpener],
  bootstrap: [AppComponent],
})
export class AppModule { }
