import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AlertController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'event',
  templateUrl: 'event.html'
})
export class EventComponent {
  @Input() event;
  @Input() pm;
  @Input() showControlButtons;
  @Input() globalHost;

  @Output() onRemovePromo = new EventEmitter();
  @Output() onUpdatePromo = new EventEmitter();

  constructor(private alert: AlertController,
              private translate: TranslateService
  ) {
    this.translate.setDefaultLang("en");
    this.translate.use("ua");
  }

  removePromo(event, $event) {
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
              this.onRemovePromo.emit(this.event);


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

  updatePromo(event, $event) {
    $event.stopPropagation();
    this.onUpdatePromo.emit(this.event);
  }
}
