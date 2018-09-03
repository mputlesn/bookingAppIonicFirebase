import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SearchPage } from '../pages/search/search';
import { AdminPage } from '../pages/admin/admin';
import { ViewRoomPage } from '../pages/view-room/view-room';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { PaymentPage } from '../pages/payment/payment';
import { ReceiptPage } from '../pages/receipt/receipt';
import { BookingsPage } from '../pages/bookings/bookings';
import { Home2Page } from '../pages/home2/home2';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    AdminPage,
    ViewRoomPage,
    SignInPage,
    SignUpPage,
    PaymentPage,
    ReceiptPage,
    BookingsPage,
    Home2Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    AdminPage,
    ViewRoomPage,
    SignInPage,
    SignUpPage,
    PaymentPage,
    ReceiptPage,
    BookingsPage,
    Home2Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
