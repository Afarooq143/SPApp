//package controllers imort
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { Camera, CameraOptions } from '@ionic-native/camera';

//service providers
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { regexValidators } from '../validator/validator';

//pages import
import { LoginPage } from '../login/login';
import { MenuPage } from '../menu/menu';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  //declarations
  imageURI: any;
  imageFileName: any;
  responseData: any;
  loading: any;
  userData = { "name": "", "email": "", "username": "", "password": "" };
  obj = '';

  signupForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public utils: UtilsProvider,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fb: FormBuilder
    // private transfer: FileTransfer,
    // private camera: Camera
  ) {
    this.signupForm = this.fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(regexValidators.email)])],
      'username': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]

    });
  }

  //signup function to use auth service
  doSignup() {
    // console.log(this.userData);
    this.utils.showLoader('Signing Up...');
    this.rest.signup('api/usersignup', this.userData).subscribe(
      userData => {
        console.log(userData);
        this.utils.hideLoader();
        this.responseData = userData;
        var resdata = JSON.stringify(this.responseData);
        var obj = JSON.parse(resdata);

      }, error => {
        this.utils.presentToast(error, 3000, 'middle');
      });
  }



  //go to login if already have account
  goLogin() {
    this.navCtrl.setRoot(LoginPage);
  }


  // getImage() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  //   }

  //   this.camera.getPicture(options).then((imageData) => {
  //     this.imageURI = imageData;
  //   }, (err) => {
  //     console.log(err);
  //     this.presentToast(err);
  //   });
  // }

  // uploadFile() {
  //   let loader = this.loadingCtrl.create({
  //     content: "Uploading..."
  //   });
  //   loader.present();
  //   const fileTransfer: FileTransferObject = this.transfer.create();

  //   let options: FileUploadOptions = {
  //     fileKey: 'ionicfile',
  //     fileName: 'ionicfile',
  //     chunkedMode: false,
  //     mimeType: "image/jpeg",
  //     headers: {}
  //   }

  //   fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
  //     .then((data) => {
  //       console.log(data + " Uploaded Successfully");
  //       this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
  //       loader.dismiss();
  //       this.presentToast("Image uploaded successfully");
  //     }, (err) => {
  //       console.log(err);
  //       loader.dismiss();
  //       this.presentToast(err);
  //     });
  // }


}
