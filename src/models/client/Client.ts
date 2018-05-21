import {Place} from "../place/Place";
import {Complaint} from "../complaint/Complaint";
import {DrinkApplication} from "../drinkApplication/DrinkApplication";
import {Rating} from "../rating/Rating";
import {Department} from "../department/Department";
import {Message} from "../message/Message";
import {Event} from "../promo/event/Event";
import {News} from "../promo/news/News";
import {Bonuse} from "../promo/bonuse/Bonuse";

export class Client {
  constructor(public id: string = '',
              public name: string = '',
              public surname: string = '',
              public login: string = '',
              public password: string = '',
              public facebookId: string = '',
              public googleId: string = '',
              public city: string = '',
              public phone: string = '',
              public email: string = '',
              public avatar: string = '',
              public roles: string[] = [],
              public favoritePlaces: Place[] = [],
              public complaints: Complaint[] = [],
              public drinkApplications: DrinkApplication[] = [],
              public ratings: Rating[] = [],
              public departments: Department[] = [],
              public events: Event[] = [],
              public news: News[] = [],
              public bonuses: Bonuse[] = [],
              // public sendedMessages: Message[] = [],
              // public receivedMessages: Message[] = []
  ) {
  }
}
