import {Bonuse} from "../promo/bonus/Bonuse";
import {HashTag} from "../hashTag/HashTag";
import {TopPlace} from "../tops/TopPlace";
import {PlaceType} from "../placeType/PlaceType";
import {PlaceMultilang} from "./PlaceMultilang";
import {Complaint} from "../complaint/Complaint";
import {DrinkApplication} from "../drinkApplication/DrinkApplication";
import {Rating} from "../rating/Rating";
import {Department} from "../department/Department";
import {Promo} from "../promo/Promo";


export class Place {
  _id: string; //+
  phone: string; //+
  email: string; //+
  averagePrice: number;//+
  reviews: number;//+
  rating: number;//+
  allowed: boolean; //+
  avatar: string;//??????? откуда берется вообще?
  location: { lat: number, lng: number }; // +- todo add map cursor when create this option
  features: { wifi: boolean, parking: boolean, vipRoom: boolean, karaoke: boolean }; //+
  topCategories: string[]; //+
  images: string[]; //+
  days: { //+
    1: { start: string, end: string };
    2: { start: string, end: string };
    3: { start: string, end: string };
    4: { start: string, end: string };
    5: { start: string, end: string };
    6: { start: string, end: string };
    7: { start: string, end: string };
  };
  promos: Promo[]; //+
  distance: number;
  hashTags: HashTag[];
  tops: TopPlace[];
  types: PlaceType[];
  multilang: PlaceMultilang;
  complaints: Complaint[];
  drinkApplications: DrinkApplication[];
  ratings: Rating[];
  departments: Department[];



  constructor(id: string, phone: string, email: string, averagePrice: number, reviews: number, rating: number, allowed: boolean, avatar: string,  location: { lat: number; lng: number }, features: { wifi: boolean; parking: boolean; vipRoom: boolean; karaoke: boolean }, topCategories: string[], images: string[], days, promos: Bonuse[], hashTags: HashTag[], tops: TopPlace[], types: PlaceType[], multilang: PlaceMultilang, complaints: Complaint[], drinkApplications: DrinkApplication[], ratings: Rating[], departments: Department[]) {

    this._id = id;
    this.phone = phone;
    this.email = email;
    this.averagePrice = averagePrice;
    this.reviews = reviews;
    this.rating = rating;
    this.allowed = allowed;
    this.avatar = avatar;
    this.location = location;
    this.features = features;
    // this.features = {wifi:true , karaoke:true, parking:true,vipRoom:true};
    this.topCategories = topCategories;
    this.images = images;
    this.days = days;
    this.promos = promos;
    this.hashTags = hashTags;
    this.tops = tops;
    this.types = types;
    this.multilang = multilang;
    this.complaints = complaints;
    this.drinkApplications = drinkApplications;
    this.ratings = ratings;
    this.departments = departments;
  }

  generateArray(obj) {
    return Object.keys(obj).map((key) => {
      return {key: key, value: obj[key]}
    });
  }
}
