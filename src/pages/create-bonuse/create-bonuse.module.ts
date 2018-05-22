import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateBonusePage } from './create-bonuse';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CreateBonusePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateBonusePage),
    FormsModule
  ],
})
export class CreateBonusePageModule {}
