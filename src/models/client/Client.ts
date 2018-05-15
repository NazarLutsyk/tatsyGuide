import {Place} from "../place/Place";
import {Complaint} from "../complaint/Complaint";
import {DrinkApplication} from "../drinkApplication/DrinkApplication";
import {Rating} from "../rating/Rating";
import {Department} from "../department/Department";
import {Promo} from "../promo/Promo";
import {Message} from "../message/Message";

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
              public promos: Promo[] = [],
              public sendedMessages: Message[] = [],
              public receivedMessages: Message[] = []) {
  }
}
