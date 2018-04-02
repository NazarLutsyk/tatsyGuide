export class Place {
  location: { lat: number, lng: number };
  averagePrice: number;
  rating: number;
  reviews: number;
  allowed: boolean;
  images: [string];
  types: [string];
  hashTags: [string];
  _id: string;
  phone: string;
  email: string;
  createdAt: string; //todo change to date
  updatedAt: string; //todo change to date
  __v: number;


}
