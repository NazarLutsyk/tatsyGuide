import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateKitchenPage } from './create-kitchen';

@NgModule({
  declarations: [
    CreateKitchenPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateKitchenPage),
  ],
})
export class CreateKitchenPageModule {}
