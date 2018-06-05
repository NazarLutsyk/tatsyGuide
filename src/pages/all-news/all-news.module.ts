import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllNewsPage } from './all-news';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AllNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllNewsPage),
    ComponentsModule
  ],
})
export class AllNewsPageModule {}
