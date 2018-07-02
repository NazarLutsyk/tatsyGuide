import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AlertController} from "ionic-angular";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@Component({
  selector: 'drink-application',
  templateUrl: 'drink-application.html'
})
export class DrinkApplicationComponent {

  @Input() drinkApp;
  @Input() pm;
  @Input() showControlButtons;

  @Output() onOpenDrinkApplication = new EventEmitter();
  @Output() onRemoveDrinkApplication = new EventEmitter();
  @Output() onUpdateDrinkApplication = new EventEmitter();

  constructor(private translate: TranslateService, private alert: AlertController,private globalConfig : GlobalConfigsService) {
    // this.translate.setDefaultLang("en");
    // this.translate.use(this.globalConfig.deviceLang);
  }

  openDrinkApplication(drinkApp) {
    this.onOpenDrinkApplication.emit(this.drinkApp);
  }

  removeDrinkApp(drinkApp, event) {
    event.stopPropagation();
    this.translate.get([
        'placeInfo.delete',
        'placeInfo.confirm',
        'placeInfo.cancel',
      ]
    ).subscribe(translations => {


      let alertWindow = this.alert.create({
        enableBackdropDismiss: true,
        title: translations['placeInfo.delete'] + "?",
        buttons: [
          {
            text: translations['placeInfo.confirm'],
            handler: () => {

              event.stopPropagation();
              this.onRemoveDrinkApplication.emit(this.drinkApp);


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

  updateDrinkApp(drinkApp, event) {
    event.stopPropagation();
    this.onUpdateDrinkApplication.emit(this.drinkApp);
  }


}
