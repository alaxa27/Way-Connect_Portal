import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  segment: 'login/:authaction/:tok/:mac/:ip'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.data)
  }

  facebookLogin() {
    window.location.href = this.navParams.data.authaction + "?tok=" + this.navParams.data.tok
  }

  goToForm()  {
    this.navCtrl.push('FormPage', { inputData: "test" })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
