import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleNewsPage } from './single-news';

@NgModule({
  declarations: [
    SingleNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleNewsPage),
  ],
})
export class SingleNewsPageModule {}
