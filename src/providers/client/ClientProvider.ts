import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Client} from "../../models/client/Client";
import {ComplaintProvider} from "../complaint/complaint-provider";
import {DrinkApplicationProvider} from "../drinkApplication/drinkApplication-provider";
import {RatingProvider} from "../rating/rating-provider";
import {DepartmentProvider} from "../department/department-provider";
import {BonuseProvider} from "../bonuse/bonuseProvider";
import {EventProvider} from "../event/EventProvider";
import {NewsProvider} from "../news/NewsProvider";
import {GlobalConfigsService} from "../../configs/GlobalConfigsService";
import {Bonuse} from "../../models/promo/bonuse/Bonuse";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ClientProvider {

  constructor(
    private http: HttpClient,
    private complaintService: ComplaintProvider,
    private drinkApplicationService: DrinkApplicationProvider,
    private ratingService: RatingProvider,
    private departmentService: DepartmentProvider,
    private bonuseService: BonuseProvider,
    private eventService: EventProvider,
    private newsService: NewsProvider,
    private globalConfig: GlobalConfigsService
  ) {
  }


  getClients(target = {}, fetch = {}) {
    let fetchSendedMessages = JSON.stringify({sendedMessages: {}});
    let fetchReceivedMessages = JSON.stringify({receivedMessages: {}});
    this.http.get<Client[]>(this.globalConfig.getGlobalHost() + `/api/clients?fetch=[${fetchSendedMessages},${fetchReceivedMessages}]`).subscribe(clients => {
      let clientIds = [];
      for (const client of clients) {
        clientIds.push(client.id);
      }
      this.complaintService.getComplaints({}, [{"place": {}}]).subscribe(complaints => {
        for (const complaint of complaints) {
          for (const client of clients) {
            if (!client.complaints) client.complaints = [];
            if (client.id === complaint.client) {
              client.complaints.push(complaint);
            }
          }
        }
      });
      this.drinkApplicationService.getDrinkApplications({}, [{"place": {}}]).subscribe(drinkApplications => {
        for (const drinkApplication of drinkApplications) {
          for (const client of clients) {
            if (!client.drinkApplications) client.drinkApplications = [];
            if (client.id === drinkApplication.organizer) {
              client.drinkApplications.push(drinkApplication);
            }
          }
        }
      });
      this.ratingService.getRatings({}, [{"place": {}}]).subscribe(ratings => {
        for (const rating of ratings) {
          for (const client of clients) {
            if (!client.ratings) client.ratings = [];
            if (client.id === (<any>rating).client) {
              client.ratings.push(rating);
            }
          }
        }
      });
      this.departmentService.getDepartments({}, [{"place": {}}]).subscribe(departments => {
        for (const department of departments) {
          for (const client of clients) {
            if (!client.departments) client.departments = [];
            if (client.id === department.client) {
              client.departments.push(department);
            }
          }
        }
      });
      this.newsService.getNews({}, [{"place": {}}]).subscribe(news => {
        for (const singleNews of news) {
          for (const client of clients) {
            if (!client.promos) client.promos = [];
            if (client.id === singleNews.author) {
              client.promos.push(singleNews);
            }
          }
        }
      });
      this.eventService.getEvents({}, [{"place": {}}]).subscribe(events => {
        for (const event of events) {
          for (const client of clients) {
            if (!client.promos) client.promos = [];
            if (client.id === event.author) {
              client.promos.push(event);
            }
          }
        }
      });
      this.bonuseService.getBonuses({}, [{"place": {}}]).subscribe(bonuses => {
        for (const bonuse of bonuses) {
          for (const client of clients) {
            if (!client.promos) client.promos = [];
            if (client.id === bonuse.author) {
              client.promos.push(bonuse);
            }
          }
        }
      });
    });
  }
  update(id:string, client: any): Observable<Client>{
    return this.http.put<Client>(`${this.globalConfig.getGlobalHost()}/api/clients/${id}`, client);
  }
}
