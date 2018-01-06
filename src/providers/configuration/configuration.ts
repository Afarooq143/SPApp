
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationProvider {
   public serverApi = 'https://myaccount-rkapur.spartan-net.com/';
   //public serverApi = 'https://myaccount-pbajpayee.spartan-net.com/'
  constructor() {
    console.log('Hello ConfigurationProvider Provider');
  }

}
