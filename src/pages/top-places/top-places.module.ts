import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopPlacesPage } from './top-places';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    TopPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(TopPlacesPage),
    ComponentsModule
  ],
})
export class TopPlacesPageModule {}
