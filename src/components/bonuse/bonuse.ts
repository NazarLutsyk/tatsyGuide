import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AlertController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'bonuse',
  templateUrl: 'bonuse.html'
})
export class BonuseComponent {

  @Input() bonuse;
  @Input() showControlButtons;
  @Input() globalHost;

  @Output() onRemovePromo = new EventEmitter();
  @Output() onUpdatePromo = new EventEmitter();

  constructor(private alert: AlertController,
              private translate: TranslateService) {
    this.translate.setDefaultLang("en");
    this.translate.use("ua");
  }

  removePromo(bonuse, $event) {
    $event.stopPropagation();
    this.translate.get([
      "placeInfo.cancel",
      "placeInfo.confirm",
      "placeInfo.delete",
    ]).subscribe(translations => {
      let alertWindow = this.alert.create({
        enableBackdropDismiss: true,
        title: translations['placeInfo.delete'] + "?",
        buttons: [
          {
            text: translations['placeInfo.confirm'],
            handler: () => {
              this.onRemovePromo.emit(this.bonuse);


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

  updatePromo(bonuse, $event) {
    $event.stopPropagation();
    this.onUpdatePromo.emit(this.bonuse);
  }
}
