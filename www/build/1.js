webpackJsonp([1],{

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormPageModule", function() { return FormPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form__ = __webpack_require__(453);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FormPageModule = (function () {
    function FormPageModule() {
    }
    FormPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__form__["a" /* FormPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__form__["a" /* FormPage */]),
            ],
        })
    ], FormPageModule);
    return FormPageModule;
}());

//# sourceMappingURL=form.module.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FormPage = (function () {
    function FormPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.age = 10;
        this.gender = "female";
        this.inputData = this.navParams.data;
    }
    FormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FormPage');
    };
    FormPage.prototype.formLogin = function () {
        console.log(this.inputData);
        this.navCtrl.setRoot("ProfilePage", { "data": this.navParams.data });
    };
    FormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-form',template:/*ion-inline-start:"/home/alaxa/Projects/Way-Connect/src/pages/form/form.html"*/'<ion-header>\n\n  <ion-navbar>\n    <img src="assets/imgs/header.png" class="header" />\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="way-background" padding>\n  <h2>\n    Gender:\n  </h2>\n  <ion-segment [(ngModel)]="gender" color="white">\n    <ion-segment-button value="male">\n      Male\n    </ion-segment-button>\n    <ion-segment-button value="female">\n      Female\n    </ion-segment-button>\n  </ion-segment>\n\n  <h2>\n    Age:\n  </h2>\n  <ion-range min="0" max="60" pin="true" [(ngModel)]="age" color="way-yellow">\n  </ion-range>\n  <h2>\n    Relationship Status\n  </h2>\n  <div class="item">\n    <ion-select [(ngModel)]="relationship">\n      <ion-option value="single">Single</ion-option>\n      <ion-option value="married">Married</ion-option>\n      <ion-option value="engaged">Engaged</ion-option>\n      <ion-option value="divorced">Divorced</ion-option>\n      <ion-option value="foreveralone">Forever Alone</ion-option>\n    </ion-select>\n  </div>\n  <h2>\n    Profession\n  </h2>\n  <div class="item">\n    <ion-select [(ngModel)]="profession">\n      <ion-option value="lesdihar">Lesdiar</ion-option>\n      <ion-option value="rich">Rich</ion-option>\n      <ion-option value="poor">Poor</ion-option>\n    </ion-select>\n  </div>\n  <button ion-button round block color="way-gray-dark" class="submit" (click)="formLogin()">\n    Submit\n  </button>\n</ion-content>\n'/*ion-inline-end:"/home/alaxa/Projects/Way-Connect/src/pages/form/form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], FormPage);
    return FormPage;
}());

//# sourceMappingURL=form.js.map

/***/ })

});
//# sourceMappingURL=1.js.map