import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientPlacesPage } from './client-places';

@NgModule({
  declarations: [
    ClientPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientPlacesPage),
  ],
})
export class ClientPlacesPageModule {}
