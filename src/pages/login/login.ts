import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

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
  public authaction: string;
  public tok: string;
  public mac: string;
  public ip: string;
  language= "english";

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public navParams: NavParams) {
    console.log(navParams.data)
    this.goToForm = this.goToForm.bind(this)
    this.afAuth.authState.subscribe((auth) => {
      if (auth !== null) {
        this.navCtrl.setRoot("ProfilePage", { "user": auth, "data": this.navParams.data})
        // window.location.href = this.navParams.data.authaction + "?tok=" + this.navParams.data.tok
      }
    }, (err) => {
      console.error("Error")
    });

  }

  facebookLogin() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

  goToForm()  {
    this.navCtrl.push('FormPage', this.navParams.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
