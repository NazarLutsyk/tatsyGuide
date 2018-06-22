import {Component} from '@angular/core';
import {InfiniteScroll, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {DrinkApplication} from "../../models/drinkApplication/DrinkApplication";
import {DrinkApplicationProvider} from "../../providers/drinkApplication/drinkApplication-provider";
import {DrinkApplicationCommentProvider} from "../../providers/drinkApplicationComment/drink-application-comment-provider";
import {NgForm} from "@angular/forms";
import {DrinkApplicationComment} from "../../models/drinkApplicationComment/DrinkApplicationComment";
import {AuthProvider} from "../../providers/auth/auth";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-single-drink-application',
  templateUrl: 'single-drink-application.html',
})
export class SingleDrinkApplicationPage {

  showPlaceInfo = true;
  principal;

  drinkApp: DrinkApplication;

  skip = 0;
  pageSize = 7;
  limit = this.pageSize;
  allLoaded = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private drinkApplicationService: DrinkApplicationProvider,
    private drinkAppCommentService: DrinkApplicationCommentProvider,
    private auth: AuthProvider,
    private globalConfig: GlobalConfigsService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang("en");
    this.translate.use("ua");
  }

  ngOnInit() {
    this.showPlaceInfo = this.navParams.data.showPlaceInfo;
    this.auth.loadPrincipal().subscribe((principal) => {
      this.principal = principal;
      this.loadApplication()
        .subscribe((drinkApps) => this.drinkApp = drinkApps[0])
    });
  }

  doRefresh(refresher: Refresher) {
    this.skip = 0;
    this.allLoaded = false;

    this.loadApplication()
      .subscribe((drinkApps) => {
        this.drinkApp = drinkApps[0];
        refresher.complete();
      })
  }

  loadApplication() {
    this.skip = this.pageSize;
    return this.drinkApplicationService
      .find({
        query: {_id: this.navParams.data._id},
        populate: [
          {
            path: 'comments',
            options: {
              sort: {createdAt: -1},
              skip: 0,
              limit: this.pageSize
            },
            populate: [{path: 'sender'}],
          },
          {path: 'organizer'},
          {
            path: 'place',
            populate: [{path: 'multilang', match: {lang: this.globalConfig.getGlobalLang()}}]
          }
        ]
      });
  }

  loadComments() {
    return this.drinkAppCommentService
      .find({
        query: {drinkApplication: (<any>this.drinkApp)._id},
        populate: [{path: 'sender'}],
        sort: {createdAt: -1},
        skip: this.skip,
        limit: this.limit
      });
  }

  loadNextCommentsPage(event: InfiniteScroll) {
    if (this.allLoaded) {
      event.complete();
    } else {
      this.setNextPage();
      this.loadComments()
        .subscribe((comments) => {
          if (comments.length < this.pageSize) this.allLoaded = true;
          this.drinkApp.comments.push(...comments);
          event.complete();
        })
    }
  }

  setNextPage() {
    this.skip += this.pageSize;
  }

  sendComment(ngForm: NgForm) {
    let comment = {
      value: ngForm.form.value.comment,
      drinkApplication: (<any>this.drinkApp)._id,
    };
    ngForm.form.setValue({comment: ''});
    this.drinkAppCommentService
      .create(comment)
      .subscribe((comment) => {
        this.skip = 0;
        this.allLoaded = false;
        this.loadComments()
          .subscribe(comments => {
            this.drinkApp.comments = comments
          })
      });
  }

  removeComment(comment: DrinkApplicationComment) {
    this.drinkAppCommentService
      .remove((<any>comment)._id)
      .subscribe(() => this.drinkApp.comments.splice(this.drinkApp.comments.indexOf(comment), 1));
  }
}
