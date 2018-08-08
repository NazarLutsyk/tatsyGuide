import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTopCategoryPage } from './create-top-category';

@NgModule({
  declarations: [
    CreateTopCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTopCategoryPage),
  ],
})
export class CreateTopCategoryPageModule {}
