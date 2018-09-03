import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewRoomPage } from '../view-room/view-room'
import uid from '../../app/uid';

declare var firebase;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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

  view(key){
    var obj ={
      key:key
    }
    this.navCtrl.push(ViewRoomPage, obj);
  }

}
