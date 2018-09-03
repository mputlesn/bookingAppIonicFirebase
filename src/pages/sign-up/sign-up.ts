import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in';
import { HomePage } from '../home/home';
import {user} from '../../app/user';
import uid from '../../app/uid';
import { Home2Page } from '../home2/home2';

declare var firebase ;

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {


  user = {} as user ;
  userID = uid
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signUp(user:user){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(()=>{
      firebase.auth().signInWithEmailAndPassword(user.email , user.password).then(()=>{
        var uid = firebase.auth().currentUser.uid;
          this.userID[0] = uid;
          firebase.database().ref('users/'+uid).set({
            email: user.email,
            name: user.name,
            phone: user.phone,
            surname: user.surname
          })
          this.navCtrl.push(Home2Page)
          const loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 1000
          });
          loader.present();
      }, (error)=>{
        const toast = this.toastCtrl.create({
          message: error,
           duration: 3000
         });
        toast.present();
      })
    }, (error)=>{
      const toast = this.toastCtrl.create({
        message: error,
         duration: 3000
       });
      toast.present();
    })
  }

  back(){
    this.navCtrl.push(SignInPage);
  }
}
