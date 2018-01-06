//Angular
import { Component, ViewChild } from '@angular/core';

//Ionic-Angular
import { Nav, Platform, MenuController, AlertController } from 'ionic-angular';

//Ionic
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Pages
import { HomePage } from '../home/home';
import { DetailsPage } from '../details/details';
import { ProfilePage } from '../profile/profile';
import { OccupantsPage } from '../occupants/occupants';
import { FilesPage } from '../files/files';
import { RenewPage } from '../renew/renew';
import { TransferPage } from '../transfer/transfer';
import { CancelPage } from '../cancel/cancel';
import { LoginPage } from '../login/login';

// Side Menu Component
import { SideMenuContentComponent } from '../../shared/side-menu-content/side-menu-content.component';
import { SideMenuSettings } from '../../shared/side-menu-content/models/side-menu-settings';
import { MenuOptionModel } from '../../shared/side-menu-content/models/menu-option-model';



@Component({
	selector: 'page-menu',
	templateUrl: 'menu.html',
})
export class MenuPage {
	user: any;
	@ViewChild(Nav) navCtrl: Nav;

	// Get the instance to call the public methods
	@ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

	rootPage: any = HomePage;

	// Options to show in the SideMenuComponent
	public options: Array<MenuOptionModel>;

	// Settings for the SideMenuComponent
	public sideMenuSettings: SideMenuSettings = {
		accordionMode: true,
		showSelectedOption: true,
		selectedOptionClass: 'active-side-menu-option',
		subOptionIndentation: {
			md: '56px',
			ios: '64px',
			wp: '56px'
		}

	};

	constructor(
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private alertCtrl: AlertController,
		private menuCtrl: MenuController
	) {
		this.user = localStorage.getItem('username');
		this.initializeApp();
	}


	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleLightContent();
			this.splashScreen.hide();

			// Initialize some options
			this.initializeOptions();
		});
	}

	private initializeOptions(): void {
		this.options = new Array<MenuOptionModel>();

		// Load simple menu options
		// ------------------------------------------
		this.options.push({
			iconName: 'ios-apps',
			displayName: 'Dashboard',
			component: HomePage,

			// This option is already selected
			selected: true,
		});


		// Load options with nested items (without icons)
		// -----------------------------------------------
		this.options.push({
			iconName: 'ios-contact',
			displayName: 'My Account',
			subItems: [
				{
					displayName: 'Profile & Location',
					component: ProfilePage
				},
				{
					displayName: 'Occupants',
					component: OccupantsPage
				},
				{
					displayName: 'Files',
					component: FilesPage
				},
				{
					displayName: 'Renew',
					component: RenewPage
				},
				{
					displayName: 'Transfer',
					component: TransferPage
				},
				{
					displayName: 'Cancel',
					component: CancelPage
				}
			]
		});

		this.options.push({
			iconName: 'logo-xbox',
			displayName: 'My Services',
			subItems: [
				{
					displayName: 'Service 1',
					component: ProfilePage
				},
				{
					displayName: 'Service 2',
					component: OccupantsPage
				}
			]
		});

		this.options.push({
			iconName: 'ios-card',
			displayName: 'Billing',
			subItems: [
				{
					displayName: 'Billing 1',
					component: ProfilePage
				},
				{
					displayName: 'Billing 2',
					component: OccupantsPage
				}
			]
		});

		this.options.push({
			iconName: 'ios-cube',
			displayName: 'Orders',
			subItems: [
				{
					displayName: 'Order 1',
					component: ProfilePage
				},
				{
					displayName: 'Order 2',
					component: OccupantsPage
				}
			]
		});

		this.options.push({
			iconName: 'ios-help-buoy',
			displayName: 'Support',
			subItems: [
				{
					displayName: 'Support 1',
					component: ProfilePage
				},
				{
					displayName: 'Support 2',
					component: OccupantsPage
				}
			]
		});
	}

	//this functions are not yet in use however don't remove 
	public selectOption(option: MenuOptionModel): void {
		this.menuCtrl.close().then(() => {
			if (option.custom && option.custom.isLogin) {
				this.presentAlert('You\'ve clicked the login option!');
			} else if (option.custom && option.custom.isLogout) {
				this.presentAlert('You\'ve clicked the logout option!');
			} else if (option.custom && option.custom.isExternalLink) {
				let url = option.custom.externalUrl;
				window.open(url, '_blank');
			} else {
				// Redirect to the selected page
				this.navCtrl.setRoot(option.component || DetailsPage, { 'title': option.displayName });
			}
		});
	}



	//this functions are not yet in use however don't remove 
	public presentAlert(message: string): void {
		let alert = this.alertCtrl.create({
			title: 'Information',
			message: message,
			buttons: ['Ok']
		});
		alert.present();
	}

	public collapseMenuOptions(): void {
		console.log('clicked');
		this.sideMenu.collapseAllOptions();
	}
}

