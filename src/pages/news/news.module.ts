import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsPage } from './news';
import {MatExpansionModule} from "@angular/material";

@NgModule({
  declarations: [
    NewsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsPage),
    MatExpansionModule
  ],
})
export class NewsPageModule {}
