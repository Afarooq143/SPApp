// Angular
import { Component } from '@angular/core';

// Ionic
import { NavController, Events } from "ionic-angular";

// Pages
import { DetailsPage } from "../details/details";

// Side Menu Component
import { SideMenuRedirectEvent, SideMenuRedirectEventData } from './../../shared/side-menu-content/models/side-menu-redirect-events';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

//providers
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils'
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	user: any;
	data: any;
	constructor(
		private navCtrl: NavController,
		public rest: RestProvider,
		public utils: UtilsProvider,
		private eventCtrl: Events
	) {
		this.user = localStorage.getItem('username');
	}

	public goToOption(): void {
		// Since we're redirecting to a page without clicking the option from the
		// side menu, we need to use events to tell the side menu component
		// which option should be marked as selected.
		let redirectData: SideMenuRedirectEventData = {
			displayName: 'Option 1'
		};
		this.eventCtrl.publish(SideMenuRedirectEvent, redirectData);

		// Now we can set that page as root
		this.navCtrl.setRoot(DetailsPage, { title: 'Option 1' });
	}

	public goToSubOption(): void {
		// Since we're redirecting to a page without clicking the option from the
		// side menu, we need to use events to tell the side menu component
		// which option should be marked as selected.
		let redirectData: SideMenuRedirectEventData = {
			displayName: 'Sub Option 2'
		};
		this.eventCtrl.publish(SideMenuRedirectEvent, redirectData);

		// Now we can set that page as root
		this.navCtrl.setRoot(DetailsPage, { title: 'Sub Option 2' });
	}

	ngOnInit() {
		this.utils.showLoader('Loading..');
		this.rest.getAll('api/get_customer').subscribe(
			res => {
				this.utils.hideLoader();
				this.data = res;
				console.log(this.data);
				if (this.data.success) {
					console.log(this.data);
					// var userData = JSON.stringify(this.data);
					// var maindata = JSON.parse(userData);
					// console.log(maindata);
				} else {
					//this.utils.presentToast(this.user);
					console.log(this.user);
				}
				console.log("Successfully Completed");
			}, error => {
				this.utils.presentToast(error, 3000, 'middle');
			});
	}

	getdata(){
		this.utils.showLoader('Loading..');
		this.rest.getAll('api/get_customer').subscribe(
			res => {
				this.utils.hideLoader();
				this.data = res;
				console.log(this.data);
				if (this.data.success) {
					console.log(this.data);
					// var userData = JSON.stringify(this.data);
					// var maindata = JSON.parse(userData);
					// console.log(maindata);
				} else {
					//this.utils.presentToast(this.user);
					console.log(this.user);
				}
				console.log("Successfully Completed");
			}, error => {
				this.utils.presentToast(error, 3000, 'middle');
			});
	}
}
