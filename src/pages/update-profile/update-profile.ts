import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Client} from "../../models/client/Client";
import {ClientProvider} from "../../providers/client/ClientProvider";
import {NgForm} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {

  client: Client;
  clientId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientService: ClientProvider,
    private translate : TranslateService,
    private globalConfig : GlobalConfigsService
  ) {
    // this.translate.setDefaultLang("en");
    // this.translate.use(this.globalConfig.deviceLang);
    this.client = this.navParams.data.client;
    this.clientId = (<any>this.client)._id;
  }

  updateProfile(updateForm: NgForm) {
    this.client = updateForm.form.value.client;
    this.clientService.update(this.clientId, this.client)
      .subscribe((client) => this.navCtrl.pop());
  }


}
