import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import uid from '../../app/uid';
import { SearchPage } from '../search/search';
import { empty } from 'rxjs/Observer';

declare var firebase;

/**
 * Generated class for the BookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookings',
  templateUrl: 'bookings.html',
})
export class BookingsPage {

  choosenRooms: any = [];
  totalPrice : number = 0;
  adult: number;
  child: number;
  room: number;
  checkIn: Date;
  checkOut: Date;
  uid = uid[0]

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingsPage');
  }

  ionViewWillEnter(){
    this.retreiveBookings();
  }

  retreiveBookings(){
    firebase.database().ref('/users/'+this.uid+'/choosenRooms/').on('value',(data)=>{
      var rooms = data.val();
      
      if(rooms != null){
        var keys = Object.keys(rooms);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          var name = rooms[k].name;
          var price = parseInt(rooms[k].price);
          console.log(price);
          
          
          this.totalPrice += price;

          let obj = {
            key: k,
            name: name,
            price: price
          }

          this.choosenRooms.push(obj);
          console.log(this.choosenRooms);
          
        }
      }
            
    });

        firebase.database().ref('/users/'+this.uid+'/search/').on('value',(data)=>{
          var search = data.val();
          if(search != null){
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
          }
          
        })

  }

  cancel(){
    
     firebase.database().ref('/users/'+this.uid+'/search/').remove();
     firebase.database().ref('/users/'+this.uid+'/choosenRooms/').remove();
     firebase.database().ref('/users/'+this.uid+'/cardDetails/').remove();
  }

  update(){
    firebase.database().ref('/users/'+this.uid+'/search/').remove();
     firebase.database().ref('/users/'+this.uid+'/choosenRooms/').remove();
     firebase.database().ref('/users/'+this.uid+'/cardDetails/').remove();
     this.navCtrl.push(SearchPage);
  }

}
