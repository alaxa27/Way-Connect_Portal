import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  age: number = 10;
  gender: string = "female";
  relationship: string;
  profession: string;
  inputData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.inputData = this.navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

  formLogin() {
    console.log(this.inputData)
    this.navCtrl.setRoot("ProfilePage", {"data": this.navParams.data})

  }

}
