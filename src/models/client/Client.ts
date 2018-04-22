import {Place} from "../place/Place";
import {Complaint} from "../complaint/Complaint";
import {DrinkApplication} from "../drinkApplication/DrinkApplication";
import {Rating} from "../rating/Rating";
import {Department} from "../department/Department";
import {Promo} from "../promo/Promo";
import {Message} from "../message/Message";

export class Client {
  _id:String;
  name: string;
  surname: string;
  login: string;
  password: string;
  facebookId: string;
  googleId: string;
  city: string;
  phone: string;
  email: string;
  avatar: string;
  roles: string[];
  favoritePlaces: Place[];
  complaints: Complaint[];
  drinkApplications: DrinkApplication[];
  ratings: Rating[];
  departments: Department[];
  promos: Promo[];
  sendedMessages: Message[];
  receivedMessages: Message[];


  constructor(id: String, name: string, surname: string, login: string, password: string, facebookId: string, googleId: string, city: string, phone: string, email: string, avatar: string, roles: string[], favoritePlaces: Place[], complaints: Complaint[], drinkApplications: DrinkApplication[], ratings: Rating[], departments: Department[], promos: Promo[], sendedMessages: Message[], receivedMessages: Message[]) {
    this._id = id;
    this.name = name;
    this.surname = surname;
    this.login = login;
    this.password = password;
    this.facebookId = facebookId;
    this.googleId = googleId;
    this.city = city;
    this.phone = phone;
    this.email = email;
    this.avatar = avatar;
    this.roles = roles;
    this.favoritePlaces = favoritePlaces;
    this.complaints = complaints;
    this.drinkApplications = drinkApplications;
    this.ratings = ratings;
    this.departments = departments;
    this.promos = promos;
    this.sendedMessages = sendedMessages;
    this.receivedMessages = receivedMessages;
  }
}
