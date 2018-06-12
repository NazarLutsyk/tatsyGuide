import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BonusePage} from './bonuse';
import {MatExpansionModule} from '@angular/material/expansion';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    BonusePage,
  ],
  imports: [
    IonicPageModule.forChild(BonusePage),
    MatExpansionModule,
    ComponentsModule
  ],

})
export class BonusePageModule {}
