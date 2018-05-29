import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopPlaceManagePage } from './top-place-manage';

@NgModule({
  declarations: [
    TopPlaceManagePage,
  ],
  imports: [
    IonicPageModule.forChild(TopPlaceManagePage),
  ],
})
export class TopPlaceManagePageModule {}
