import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAvatarAndPhotosPage } from './add-avatar-and-photos';

@NgModule({
  declarations: [
    AddAvatarAndPhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAvatarAndPhotosPage),
  ],
})
export class AddAvatarAndPhotosPageModule {}
