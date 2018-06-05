import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalChooseLangPage } from './modal-choose-lang';

@NgModule({
  declarations: [
    ModalChooseLangPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalChooseLangPage),
  ],
})
export class ModalChooseLangPageModule {}
