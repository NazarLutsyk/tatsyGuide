import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BonusePage } from './bonuse';

@NgModule({
  declarations: [
    BonusePage,
  ],
  imports: [
    IonicPageModule.forChild(BonusePage),
  ],
})
export class BonusePageModule {}
