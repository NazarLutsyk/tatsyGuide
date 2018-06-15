import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleBonusePage } from './single-bonuse';

@NgModule({
  declarations: [
    SingleBonusePage,
  ],
  imports: [
    IonicPageModule.forChild(SingleBonusePage),
  ],
})
export class SingleBonusePageModule {}
