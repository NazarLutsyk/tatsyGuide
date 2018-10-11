import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PlaceInfoPage} from './place-info';
import {MatExpansionModule} from "@angular/material/expansion";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";
import {CallNumber} from "@ionic-native/call-number";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

@NgModule({
  declarations: [
    PlaceInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceInfoPage),
    MatExpansionModule,
    ionicGalleryModal.GalleryModalModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),

  ],
  providers: [
    CallNumber,
    PhotoViewer,
    InAppBrowser,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
  ]
})
export class PlaceInfoPageModule {
}
