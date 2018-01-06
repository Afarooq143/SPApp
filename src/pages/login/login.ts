//pckage controllers
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//provider
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';

//pages
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: any;
  user: any;
  loginData = { "username": "", "password": "" };
  userData : any;
  loginForm: FormGroup

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestProvider,
    public utils: UtilsProvider,
    fb: FormBuilder
  ) {

    this.loginForm = fb.group({
      'username': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });
  }

  doLogin() {
    this.utils.showLoader('Authenticating..');
    localStorage.clear();
    this.rest.login('api/userlogin', this.loginData).subscribe(
      res => {
        this.utils.hideLoader();
        this.user = res;
       console.log(this.user);
        if (this.user.success) {
          this.userData = JSON.stringify(this.user.msg.userAuth);
          var data = JSON.parse(this.userData);
          //console.log(data);
          localStorage.setItem('id', data.id);
          localStorage.setItem('username', data.username);
          localStorage.setItem('email', data.email_address);
          localStorage.setItem('token', data.token);
          this.navCtrl.push(MenuPage, {}, { animate: true });
        } else {
          this.utils.presentToast(this.user.msg, 3000, 'middle');
          console.log(this.user.msg);
        }
        console.log("Successfully Completed");
      }, error => {
       // alert('Not connected');
        console.log(error);
        this.utils.presentToast('Server connection failed. Check internet connection and try again..',3000, 'middle');
      });
  }

  // doSignup(){
  //   this.navCtrl.setRoot('SignupPage');
  // }

  goSignup(){
    this.navCtrl.setRoot(SignupPage);
  }

 
}
