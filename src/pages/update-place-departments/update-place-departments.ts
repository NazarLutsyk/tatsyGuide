import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {DepartmentProvider} from "../../providers/department/department-provider";
import {ProfilePage} from "../profile/profile";
import {NgForm} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-update-place-departments',
  templateUrl: 'update-place-departments.html',
})
export class UpdatePlaceDepartmentsPage {

  departments: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private departmentService: DepartmentProvider,
    private app: App
  ) {
  }

  ngOnInit() {
    this.loadDepartments();
  }


  openProfile(admin) {
    this.app.getRootNav().push(ProfilePage, admin.client);
  }

  addAdminToPlace(newAdminForm: NgForm) {
    let department: any = {
      client: newAdminForm.form.value.client,
      place: this.navParams.data._id,
      roles: [newAdminForm.form.value.role],
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
    this.departmentService
      .remove(department._id)
      .subscribe(() => this.loadDepartments());
  }

  updateDepartment(department) {
    this.departmentService.update(
      department._id,
      {roles: department.roles}
    ).subscribe();
  }
}
