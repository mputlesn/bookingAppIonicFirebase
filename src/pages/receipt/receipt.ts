import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import uid from '../../app/uid';

/**
 * Generated class for the ReceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {
 
  choosenRooms: any = [];
  totalPrice : number = 0;
  adult: number;
  child: number;
  room: number;
  checkIn: Date;
  checkOut: Date;
  uid = uid;
  name :string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    firebase.database().ref('/users/'+this.uid+'/choosenRooms/').on('value',(data)=>{
      var rooms = data.val();
      console.log(rooms)
      var keys = Object.keys(rooms);

      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var name = rooms[k].name;
        var price = parseInt(rooms[k].price);
        this.totalPrice += price;

        let obj = {
          key: k,
          name: name,
          price: price
        }

        this.choosenRooms.push(obj);
        console.log(this.choosenRooms);
        
      } 
  });

  firebase.database().ref('/users/'+this.uid+'/search/').on('value',(data)=>{
    var search = data.val();
    var keys = Object.keys(search);

    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      this.adult = search[k].adult;
      this.child = search[k].child;
      this.room = search[k].room;
      this.checkIn = search[k].checkIn;
      this.checkOut = search[k].checkOut;
      console.log('check out' + this.checkOut);
      
    } 
});

firebase.database().ref('/users/'+this.uid).on('value', (data)=>{
    var user = data.val();
    this.name = user.name;
    console.log(user);
    
})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');
  }

  

  finish(){
    const confirm = this.alertCtrl.create({
      title: 'Booking Reserved',
      message: 'Enjoy your stay with us '+this.name,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.navCtrl.push(HomePage)
          }
        }
      ]
    });
    confirm.present();
  }

}
