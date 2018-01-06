/*
* This component is for all the general/common 
* featurs needed like loader, toast etc
*/


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class UtilsProvider {
  loading: any;
  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
  }
  
  /*
  *pass message parameter
  */
  showLoader(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });

    this.loading.present();
  }

  /*
  *hide loader
  */
  hideLoader() {
    this.loading.dismiss();
  }

  /*
  * pass 4 parameters
  * message to dispaly
  * duration of toast
  * position(top, middle, bottom)
  */
  presentToast(msg, time: number, position: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: time,
      position: position,
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      //setTimeout(() => {
      this.loading.dismiss();
      //}, 1000);
    });

    toast.present();
  }

}
