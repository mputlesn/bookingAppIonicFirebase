import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

declare var firebase;
/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  name: string;
  description: string;
  price: number;
  imgUrl: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  add(){
    firebase.database().ref('rooms/').push({
      name: this.name,
      description: this.description,
      price: this.price,
      image: this.imgUrl
    });
  }


  home(){
    this.navCtrl.push(HomePage);
  }
}
