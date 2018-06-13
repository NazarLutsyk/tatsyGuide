import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CreateTopPlacePage} from './create-top-place';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CreateTopPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTopPlacePage),
    FormsModule
  ],
})
export class CreateTopPlacePageModule {
}
