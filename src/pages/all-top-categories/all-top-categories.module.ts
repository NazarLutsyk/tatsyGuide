import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllTopCategoriesPage } from './all-top-categories';

@NgModule({
  declarations: [
    AllTopCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllTopCategoriesPage),
  ],
})
export class AllTopCategoriesPageModule {}
