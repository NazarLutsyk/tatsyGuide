import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateNewsPage } from './update-news';

@NgModule({
  declarations: [
    UpdateNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateNewsPage),
  ],
})
export class UpdateNewsPageModule {}
