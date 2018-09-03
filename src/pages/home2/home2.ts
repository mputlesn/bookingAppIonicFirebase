import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import uid from '../../app/uid';
declare var firebase;
/**
 * Generated class for the Home2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home2',
  templateUrl: 'home2.html',
})
export class Home2Page {

  roomList: any = [];
  uid = uid;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    firebase.database().ref('rooms/').on('value',(data)=>{
      var rooms = data.val();
      var keys = Object.keys(rooms)

      for(var i = 0; i < keys.length; i++){
        var k = keys[i];
        console.log(keys[i]);
        
        var name = rooms[k].name;
        var description = rooms[k].description
        var price = rooms[k].price
        var img = rooms[k].image

        let obj = {
          key: k,
          name: name,
          description: description,
          price: price,
          imgUrl: img
        }
  
        this.roomList.push(obj);
  
        console.log(obj);
        console.log(this.roomList);
      }
  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home2Page');
  }

}
