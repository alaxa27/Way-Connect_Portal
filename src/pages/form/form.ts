import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  @Input('inputData') inputData: any;
  age: number = 10;
  gender: string = "female";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.inputData)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
    console.log(this.inputData)
  }

  formLogin() {
    window.location.href = this.inputData.authaction + "?tok=" + this.inputData.tok
    console.log(this.inputData)

  }

}
