import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @Input('user') user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.user)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
