import { Component, OnInit  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReceiptPage } from '../receipt/receipt';
import { FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms'
import uid from '../../app/uid';

declare var firebase;
/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage implements OnInit {

  cardNo: number;
  cvv: number;
  exDate: Date;
  uid = uid;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  ngOnInit() {

    // this.user = new FormGroup({
    // cvv: new FormControl('', [Validators.required, Validators.maxLength(4)], Validators.minLength(4)]),
    // email: new FormControl('', [Validators.required,Validators.email]),
    // mob: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)])
    // });
    
    }

  pay(){
    console.log(this.uid);
    
    firebase.database().ref('/users/'+this.uid+'/cardDetails/').push({
      cardNo: this.cardNo,
      cvv: this.cvv,
      exDate: this.exDate
    });
    this.navCtrl.push(ReceiptPage);
  }

}
