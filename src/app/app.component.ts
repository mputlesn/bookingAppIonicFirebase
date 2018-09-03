import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { AdminPage } from '../pages/admin/admin'; 
import { SignUpPage } from '../pages/sign-up/sign-up';
import {SignInPage} from '../pages/sign-in/sign-in';
import { ReceiptPage } from '../pages/receipt/receipt';
import { BookingsPage } from '../pages/bookings/bookings';

declare var firebase;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SignInPage;

  
  pages: Array<{title: string, component: any}>;
  pages2: any;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Search', component: SearchPage },
      { title: 'Bookings', component: BookingsPage },
      { title: 'Logout', component: null}
    ];

    this.pages2 = {
      homePage: HomePage,
      searchPage: SearchPage,
      bookingsPage: BookingsPage,
      logout: null

    } 
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component){
      this.nav.setRoot(page.component);
    }else if(page.component == null){
      firebase.auth().signOut()
      this.nav.setRoot(SignInPage);
    }
    
  }

  signOut(){
    firebase.auth().signOut()
      this.nav.push(SignInPage);
      
  }
}
