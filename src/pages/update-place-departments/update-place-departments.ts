import {Component} from '@angular/core';
import {AlertController, App, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {DepartmentProvider} from "../../providers/department/department-provider";
import {ProfilePage} from "../profile/profile";
import {NgForm} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ClientsPage} from "../clients/clients";

@IonicPage()
@Component({
  selector: 'page-update-place-departments',
  templateUrl: 'update-place-departments.html',
})
export class UpdatePlaceDepartmentsPage {

  departments: any[] = [];
  newAdmin = {_id: '', name: '', surname: ''};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private departmentService: DepartmentProvider,
    private app: App,
    private translate: TranslateService,
    private events: Events,
    private alert: AlertController
  ) {
    this.translate.setDefaultLang("en");
    this.translate.setDefaultLang("ua");
  }

  ngOnInit() {
    this.events.subscribe('select:administrator', client => this.newAdmin = client);
    this.loadDepartments();
  }


  openProfile(admin) {
    this.app.getRootNav().push(ProfilePage, admin.client);
  }

  addAdminToPlace(newAdminForm: NgForm) {
    let department: any = {
      client: this.newAdmin._id,
      place: this.navParams.data._id,
      roles: newAdminForm.form.value.role,
    };
    this.departmentService
      .create(department)
      .subscribe(deparment => {
        this.loadDepartments();
      });
  }

  loadDepartments() {
    this.departmentService.find({
      query: {place: this.navParams.data._id},
      populate: [{path: 'client'}]
    })
      .subscribe(departments => {
        this.departments = departments;
      });
  }

  removeDepartment(department, event) {

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

              this.departmentService
                .remove(department._id)
                .subscribe(() => this.loadDepartments());


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

  updateDepartment(department) {
    this.departmentService.update(
      department._id,
      {roles: department.roles}
    ).subscribe();
  }

  selectClient() {
    this.app.getRootNav().push(ClientsPage, {getId: true});
  }
}
