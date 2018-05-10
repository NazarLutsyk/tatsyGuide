import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BonusePage } from './bonuse';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    BonusePage,
  ],
  imports: [
    IonicPageModule.forChild(BonusePage),
    MatExpansionModule
  ],
})
export class BonusePageModule {}
