import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import uid from '../../app/uid';
import { parseDate } from 'ionic-angular/umd/util/datetime-util';

declare var firebase;
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  userID = uid;
  checkIn: Date;
  checkOut: Date;
  room: number;
  adult: number;
  child: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  search(){
    let d = new Date() ;
     var day = d.getDate();
     var month = d.getMonth() + 1;
     var year = d.getFullYear();
     var today =  year + "-"+ '0' + month + "-" + "0"+ day;

     var parts = today.split("-");
     console.log(parts);
    //  var mydate = new Date(parts[0], parts[1], parts[2]);
     
    console.log("year"+today);

    // var strToday = parseDate(today);

    

    // if(this.checkIn >= strToday && this.checkOut > this.checkIn){

    // }else{

    // }
    


    console.log(this.checkIn) ;
    firebase.database().ref('/users/'+this.userID[0]+'/search/').push({
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      room: this.room,
      adult: this.adult,
      child: this.child
    });
    this.navCtrl.push(HomePage);
  }

}
