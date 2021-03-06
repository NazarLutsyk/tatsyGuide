import {Bonuse} from "../promo/bonuse/Bonuse";
import {TopPlace} from "../tops/TopPlace";
import {PlaceType} from "../placeType/PlaceType";
import {PlaceMultilang} from "../multilang/PlaceMultilang";
import {Complaint} from "../complaint/Complaint";
import {DrinkApplication} from "../drinkApplication/DrinkApplication";
import {Rating} from "../rating/Rating";
import {Department} from "../department/Department";
import {News} from "../promo/news/News";
import {Event} from "../promo/event/Event";
import {Review} from "../review/Review";
import {TopCategory} from "../topCategory/TopCategory";
import {Kitchen} from "../kitchen/Kitchen";

export class Place {

  constructor(
    public _id: string = '',
    public phones: string[] = [],
    public emails: string[] = [],
    public site: string = '',
    public averagePrice: number = 0,
    public reviews: number = 0,
    public rating: number = 0,
    public allowed: boolean = false,
    public avatar: string = '',
    public city: string = '',
    public distance: number = 0,
    public location: {
      lat: number;
      lng: number;
    } = {lat: 0, lng: 0},
    // public features: {
    //   wifi: boolean;
    //   parking: boolean;
    //   vipRoom: boolean;
    //   karaoke: boolean,
    //   businessLunch: boolean,
    //   dayAndNight: boolean
    // } = {wifi: false, parking: false, vipRoom: false, karaoke: false, businessLunch: false, dayAndNight: false},
    public images: string[] = [],
    public days: {
      1: { start: string, end: string };
      2: { start: string, end: string };
      3: { start: string, end: string };
      4: { start: string, end: string };
      5: { start: string, end: string };
      6: { start: string, end: string };
      7: { start: string, end: string };
    } = {
      1: {start: "", end: ""},
      2: {start: "", end: ""},
      3: {start: "", end: ""},
      4: {start: "", end: ""},
      5: {start: "", end: ""},
      6: {start: "", end: ""},
      7: {start: "", end: ""},
    },
    public topCategories: TopCategory[] = [],
    public kitchens: Kitchen[] = [],
    public news: News[] = [],
    public events: Event[] = [],
    public bonuses: Bonuse[] = [],
    public hashTags: string[] = [],
    public tops: TopPlace[] = [],
    public types: PlaceType[] = [],
    public multilang: PlaceMultilang[] = [],
    public complaints: Complaint[] = [],
    public drinkApplications: DrinkApplication[] = [],
    public ratings: Rating[] = [],
    public departments: Department[] = [],
    public statistic: Review[] = [],
  ) {
  }
}
