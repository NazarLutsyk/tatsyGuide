import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllNewsPage } from './all-news';

@NgModule({
  declarations: [
    AllNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllNewsPage),
  ],
})
export class AllNewsPageModule {}
