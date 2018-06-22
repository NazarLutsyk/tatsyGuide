import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AlertController} from "ionic-angular";

@Component({
  selector: 'rating',
  templateUrl: 'rating.html'
})
export class RatingComponent {

  @Input() showRemoveButton;
  @Input() showUpdateButton;
  @Input() rating;

  @Output() onRemoveRating = new EventEmitter();
  @Output() onUpdateRating = new EventEmitter();

  constructor(private translate: TranslateService,
              private alert: AlertController) {
    this.translate.setDefaultLang("en");
    this.translate.use("ua");
  }

  removeRating(rating, event) {
    event.stopPropagation();
    this.translate.get([
        'placeInfo.delete',
        'placeInfo.confirm',
        'placeInfo.cancel',
      ]
    ).subscribe(translations => {

      event.stopPropagation();

      let alertWindow = this.alert.create({
        enableBackdropDismiss: true,
        title: translations['placeInfo.delete'] + "?",
        buttons: [
          {
            text: translations['placeInfo.confirm'],
            handler: () => {

              this.onRemoveRating.emit(this.rating);

            }
          },
          {
            text: translations['placeInfo.cancel']
          }
        ]

      });

      alertWindow.present();
    });
  }

  updateRating(rating) {
    this.onUpdateRating.emit(this.rating);
  }

}
