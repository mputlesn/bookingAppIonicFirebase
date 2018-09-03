import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PaymentPage } from '../payment/payment';
import uid from '../../app/uid';
declare var firebase;
/**
 * Generated class for the ViewRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-room',
  templateUrl: 'view-room.html',
})
export class ViewRoomPage {

  key = this.navParams.get('key');
  uid = uid;
  name : string;
  description: string;
  price: number;
  image: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
    firebase.database().ref('rooms/').child(this.key).on('value',(data)=>{
        var room = data.val();
        console.log(room);
        console.log(room.price);
        this.price = room.price;
        this.name = room.name;
        this.image = room.image;
        this.description = room.description;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewRoomPage');
  }

  alert(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Do you wanna?',
      buttons: [
        {
          text: 'Book Another',
          handler: () => {
            firebase.database().ref('/users/'+this.uid+'/choosenRooms/').push({
              name: this.name,
              price: this.price,
            });
            this.navCtrl.push(HomePage);
          }
        },{
          text: 'Continue',
          handler: () => {
            firebase.database().ref('/users/'+this.uid+'/choosenRooms/').push({
              name: this.name,
              price: this.price,
            });
            this.navCtrl.push(PaymentPage);
          }
        },{
          text: 'Cancel',
          handler: () => {
              firebase.database().ref('/users/'+this.uid+'/search/').remove();
              firebase.database().ref('/users/'+this.uid+'/choosenRooms/').remove();
              firebase.database().ref('/users/'+this.uid+'/cardDetails/').remove();
              this.navCtrl.push(HomePage);
          }
        }
      ]
    });
    actionSheet.present();
  }
   

}
