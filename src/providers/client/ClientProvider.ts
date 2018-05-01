import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {host1, host2} from "../../configs/GlobalVariables";
import {Client} from "../../models/client/Client";
import {ComplaintProvider} from "../complaint/complaint-provider";
import {DrinkApplicationProvider} from "../drinkApplication/drinkApplication-provider";
import {RatingProvider} from "../rating/rating-provider";
import {DepartmentProvider} from "../department/department-provider";
import {BonuseProvider} from "../bonuse/bonuseProvider";
import {EventProvider} from "../event/EventProvider";
import {NewsProvider} from "../news/NewsProvider";
import {Platform} from "ionic-angular";

/*
  Generated class for the BonuseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientProvider {
  globalHost: string;


  constructor(
    platform: Platform,
    public http: HttpClient,
    private complaintService: ComplaintProvider,
    private drinkApplicationService: DrinkApplicationProvider,
    private ratingService: RatingProvider,
    private departmentService: DepartmentProvider,
    private bonuseService: BonuseProvider,
    private eventService: EventProvider,
    private newsService: NewsProvider,
  ) {

    if (platform.is("android")) {
      this.globalHost = host2;
    } else {
      this.globalHost = host1;
    }


  }


  getClients(target = {}, fetch = {}) {
    let fetchSendedMessages = JSON.stringify({sendedMessages: {}});
    let fetchReceivedMessages = JSON.stringify({receivedMessages: {}});
    this.http.get<Client[]>(this.globalHost + `/api/clients?fetch=[${fetchSendedMessages},${fetchReceivedMessages}]`).subscribe(clients => {
      let clientIds = [];
      for (const client of clients) {
        clientIds.push(client._id);
      }
      this.complaintService.getComplaints({}, [{"place": {}}]).subscribe(complaints => {
        for (const complaint of complaints) {
          for (const client of clients) {
            if (!client.complaints) client.complaints = [];
            if (client._id === complaint.client) {
              client.complaints.push(complaint);
            }
          }
        }
      });
      this.drinkApplicationService.getDrinkApplications({}, [{"place": {}}]).subscribe(drinkApplications => {
        for (const drinkApplication of drinkApplications) {
          for (const client of clients) {
            if (!client.drinkApplications) client.drinkApplications = [];
            if (client._id === drinkApplication.organizer) {
              client.drinkApplications.push(drinkApplication);
            }
          }
        }
      });
      this.ratingService.getRatings({}, [{"place": {}}]).subscribe(ratings => {
        for (const rating of ratings) {
          for (const client of clients) {
            if (!client.ratings) client.ratings = [];
            if (client._id === rating.client) {
              client.ratings.push(rating);
            }
          }
        }
      });
      this.departmentService.getDepartments({}, [{"place": {}}]).subscribe(departments => {
        for (const department of departments) {
          for (const client of clients) {
            if (!client.departments) client.departments = [];
            if (client._id === department.client) {
              client.departments.push(department);
            }
          }
        }
      });
      this.newsService.getNews({}, [{"place": {}}]).subscribe(news => {
        for (const singleNews of news) {
          for (const client of clients) {
            if (!client.promos) client.promos = [];
            if (client._id === singleNews.author) {
              client.promos.push(singleNews);
            }
          }
        }
      });
      this.eventService.getEvents({}, [{"place": {}}]).subscribe(events => {
        for (const event of events) {
          for (const client of clients) {
            if (!client.promos) client.promos = [];
            if (client._id === event.author) {
              client.promos.push(event);
            }
          }
        }
      });
      this.bonuseService.getBonuses({}, [{"place": {}}]).subscribe(bonuses => {
        for (const bonuse of bonuses) {
          for (const client of clients) {
            if (!client.promos) client.promos = [];
            if (client._id === bonuse.author) {
              client.promos.push(bonuse);
            }
          }
        }
      });
      console.log('clients');
      console.log(clients);
    });
  }


  // getCurrentPrincipal() {
  //   console.log(`${this.globalHost}/auth/principal`);
  //   return this.http.get<Client>(`${this.globalHost}/auth/principal`);
  // }
}
