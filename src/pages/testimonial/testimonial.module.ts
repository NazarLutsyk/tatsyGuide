import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestimonialPage } from './testimonial';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    TestimonialPage,
  ],
  imports: [
    IonicPageModule.forChild(TestimonialPage),
    ComponentsModule
  ],
})
export class TestimonialPageModule {}
