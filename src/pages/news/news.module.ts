import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsPage } from './news';
import {MatExpansionModule} from "@angular/material";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    NewsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsPage),
    MatExpansionModule,
    ComponentsModule
  ],
})
export class NewsPageModule {}
