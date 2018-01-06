// Angular references
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Ionic references
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// App
import { MyApp } from './app.component';

// Pages
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { ProfilePage } from '../pages/profile/profile';
import { OccupantsPage } from '../pages/occupants/occupants';
import { FilesPage } from '../pages/files/files';
import { RenewPage } from '../pages/renew/renew';
import { TransferPage } from '../pages/transfer/transfer';
import { CancelPage } from '../pages/cancel/cancel';
import { MenuPage } from '../pages/menu/menu';

// Custom components
import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';
import { RestProvider } from '../providers/rest/rest';
import { AuthInterceptor } from '../providers/interceptor/interceptor';
import { UtilsProvider } from '../providers/utils/utils';
import { ConfigurationProvider } from '../providers/configuration/configuration';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    MenuPage,
    HomePage,
    DetailsPage,
    ProfilePage,
    OccupantsPage,
    FilesPage,
    RenewPage,
    TransferPage,
    CancelPage,
    
    // Side menu custom component
    SideMenuContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    MenuPage,
    HomePage,
    DetailsPage,
    ProfilePage,
    OccupantsPage,
    FilesPage,
    RenewPage,
    TransferPage,
    CancelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, //interceptor    
    ConfigurationProvider,
    RestProvider,
    UtilsProvider,
  ]
})
export class AppModule { 
  user:any;
  constructor(){
    this.user = localStorage.getItem('username');
  }
}
