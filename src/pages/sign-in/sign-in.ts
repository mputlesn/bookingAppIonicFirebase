import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {user} from '../../app/user';
import { HomePage } from '../home/home';
import { SignUpPage } from '../sign-up/sign-up';
import uid from '../../app/uid';
import { ToastController, AlertController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { Home2Page } from '../home2/home2';

declare var firebase;
/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  user ={} as user ;
  count: number = 1;
  userID = uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  ionViewWillEnter(){

  }

  signIn(user:user){

    firebase.auth().signInWithEmailAndPassword(user.email , user.password).then(()=>{
      var uid = firebase.auth().currentUser.uid;
        this.userID[0] = uid;
        this.navCtrl.push(Home2Page)
        const loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 3000
        });
        loader.present();
    } , (error)=>{
     // alert(error)
       const toast = this.toastCtrl.create({
         message: error,
          duration: 1000
        });
       toast.present();
    })                                                                    
      
  }
      
  forgot(){
    const prompt = this.alertCtrl.create({
      title: 'Forgot Password',
      message: "Enter your Email Address",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            firebase. auth().sendPasswordResetEmail(data.email).then(()=>{
              const toast = this.toastCtrl.create({
                message: "An email was sent to you, to reset password.",
                 duration: 1000
               });
              toast.present();
            } , (e)=>{
              const toast = this.toastCtrl.create({
                message: e,
                 duration: 1000
               });
              toast.present();
            })
          }
        }
      ]
    });
    prompt.present();
    
  }

  signUpPage(){
    this.navCtrl.push(SignUpPage);
  }

}
