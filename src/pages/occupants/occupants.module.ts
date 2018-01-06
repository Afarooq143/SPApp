import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OccupantsPage } from './occupants';

@NgModule({
  declarations: [
    OccupantsPage,
  ],
  imports: [
    IonicPageModule.forChild(OccupantsPage),
  ],
})
export class OccupantsPageModule {}
