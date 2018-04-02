import {Place} from "./Place";
import {PlacesMultilang} from "./PlacesMultilang";

export class FullPlaceDTO {
  location: { lat: number, lng: number };
  avaragePrice: number;
  reviews: number;
  rating: number;
  allowed: boolean;
  images: [string];
  types: [string];
  hashTags: [string];
  _id: string;
  phone: string;
  email: string;
  createdAt: string; //todo change to date
  updatedAt: string; //todo change to date
  /**/
  kind: string;
  _idOfMultilang: string;
  name: string;
  description: string;
  placeIdfromMultilang: string;
  langId: string;
  multilangCreatedAt: string; //todo change to date
  multilangUpdatedAt: string; // todo change to date


  constructor(place: Place, placeMultiLang: PlacesMultilang) {
    this.location = place.location;
    this.avaragePrice = place.averagePrice;
    this.rating = place.rating;
    this.reviews = place.reviews;
    this.allowed = place.allowed;
    this.images = place.images;
    this.types = place.types;
    this.hashTags = place.hashTags;
    this._id = place._id;
    this.phone = place.phone;
    this.email = place.email;
    this.createdAt = place.createdAt;
    this.updatedAt = place.updatedAt;
    this.kind = placeMultiLang.kind;
    this._idOfMultilang = placeMultiLang._id;
    this.name = placeMultiLang.name;
    this.description = placeMultiLang.description;
    this.placeIdfromMultilang = placeMultiLang.place;
    this.langId = placeMultiLang.lang;
    this.multilangCreatedAt = placeMultiLang.createdAt;
    this.multilangUpdatedAt = placeMultiLang.updatedAt;
  }


}
