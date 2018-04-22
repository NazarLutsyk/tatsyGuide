import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import {Place} from "../../models/place/Place";
import {Platform} from "ionic-angular";
import {host1, host2, lang} from "../../configs/GlobalVariables";
import {BonuseProvider} from "../bonuse/bonuseProvider";
import {PlaceTypeProvider} from "../place-type/place-type";
import {EventProvider} from "../event/EventProvider";
import {NewsProvider} from "../news/NewsProvider";
import {ComplaintProvider} from "../complaint/complaint-provider";
import {DrinkApplicationProvider} from "../drinkApplication/drinkApplication-provider";
import {RatingProvider} from "../rating/rating-provider";
import {DepartmentProvider} from "../department/department-provider";
import {PlaceType} from "../../models/placeType/PlaceType";
import {switchMap} from "rxjs/operators";
import {zip} from "rxjs/observable/zip";
import _ from 'lodash';

declare var window: any;
declare var position: any;

@Injectable()
export class PlacesProvider {

  private globalHost: string;
  private myCurrentPosition: any;


  constructor(
    public http: HttpClient, plt: Platform,
    private bonuseProvider: BonuseProvider,
    private eventProvider: EventProvider,
    private newsProvider: NewsProvider,
    private placeTypeService: PlaceTypeProvider,
    private complaintProvider: ComplaintProvider,
    private drinkApplicationProvider: DrinkApplicationProvider,
    private ratingService: RatingProvider,
    private departmentService: DepartmentProvider,
    platform: Platform
  ) {
    if (platform.is("android")) {
      this.globalHost = host2;
    } else {
      this.globalHost = host1;
    }
  }


  // getAllPlaces(target = {}) {
  //   target = JSON.stringify(target);
  //   let fetchHahTags = JSON.stringify({hashTag: {}});
  //   let fetchTopPlaces = JSON.stringify({topPlace: {}});
  //   let fetchTypes = JSON.stringify({placeType: {}});
  //   // let fetchTypes = JSON.stringify({placeType: {query: {lang: lang}}});
  //
  //   let fetchPlaceMultilang = JSON.stringify({placeMultilang: {query: {lang: lang}}});
  //   return this.http.get<Place[]>(this.globalHost + `/api/places?target=${target}&fetch=[${fetchHahTags},${fetchTopPlaces},${fetchTypes},${fetchPlaceMultilang}]`).map(places => {
  //     // all places
  //     let placeIds = [];
  //     for (const place of places) {
  //       placeIds.push(place._id);
  //     }
  //     let targetToBonuses = {
  //       query: {
  //         place: placeIds
  //       }
  //     };
  //     let fetchToBonuses = [
  //       {
  //         bonuseMultilang: {
  //           query: {
  //             lang: lang
  //           }
  //         },
  //       },
  //       {
  //         client: {}
  //       }
  //     ];
  //     let targetToEvents = {
  //       query: {
  //         place: placeIds
  //       }
  //     };
  //     let fetchToEvents = [
  //       {
  //         eventMultilang: {
  //           query: {
  //             lang: lang
  //           }
  //         },
  //
  //       },
  //       {
  //         client: {}
  //       }
  //     ];
  //     let targetToNews = {
  //       query: {
  //         place: placeIds
  //       }
  //     };
  //     let fetchToNews = [
  //       {
  //         newsMultilang: {
  //           query: {
  //             lang: lang
  //           }
  //         },
  //
  //       },
  //       {
  //         client: {}
  //       }
  //     ];
  //     let targetToComplaints = {
  //       query: {
  //         place: placeIds
  //       }
  //     };
  //     let fetchToComplaints = [
  //       {
  //         client: {}
  //       }
  //     ];
  //     let targetToDrinkApp = {
  //       query: {
  //         place: placeIds
  //       }
  //     };
  //     let fetchToDrinkApp = [
  //       {
  //         client: {}
  //       }
  //     ];
  //     let targetToRating = {
  //       query: {
  //         place: placeIds
  //       }
  //     };
  //     let fetchToRating = [
  //       {
  //         client: {}
  //       }
  //     ];
  //     let targetToDepartment = {
  //       query: {
  //         place: placeIds
  //       }
  //     };
  //     let fetchToDepartment = [
  //       {
  //         client: {}
  //       }
  //     ];
  //     let fetchToPlaceType = [
  //       {
  //         placeTypeMultilang: {query: {lang: "5acf2559ab842f11f8362409"}}
  //       }
  //     ];
  //
  //
  //     this.bonuseProvider.getBonuses(targetToBonuses, fetchToBonuses).subscribe((bonuses) => {
  //       for (const bonuse of bonuses) {
  //         for (const place of places) {
  //           if (bonuse.place === place._id) {
  //             if (!place.promos) place.promos = [];
  //             place.promos.push(bonuse);
  //           }
  //         }
  //       }
  //     });
  //     // add events
  //     this.eventProvider.getEvents(targetToEvents, fetchToEvents).subscribe((events) => {
  //       for (const event of events) {
  //         for (const place of places) {
  //           if (event.place === place._id) {
  //             if (!place.promos) place.promos = [];
  //             place.promos.push(event);
  //           }
  //         }
  //       }
  //     });
  //     this.newsProvider.getNews(targetToNews, fetchToNews).subscribe((news) => {
  //       for (const singleNews of news) {
  //         for (const place of places) {
  //           if (singleNews.place === place._id) {
  //             if (!place.promos) place.promos = [];
  //             place.promos.push(singleNews);
  //           }
  //         }
  //       }
  //     });
  //     this.placeTypeService.getPlaceTypes({}, fetchToPlaceType).subscribe((placeTypesWithMultilang: PlaceType[]) => {
  //       console.log(places[0]);
  //       // console.log(places[0]['types']);
  //       // console.log(JSON.stringify(places[0]));
  //       // console.log(JSON.parse(JSON.stringify(places[0])));
  //
  //       for (const place of places) {
  //         let newTypes: PlaceType[] = [];
  //         for (const oldType of place.types) {
  //           for (const newType of placeTypesWithMultilang) {
  //             if (oldType._id === newType._id) {
  //               newTypes.push(newType);
  //             }
  //           }
  //         }
  //         place.types = newTypes;
  //         console.log(places[0].types.hasOwnProperty("multilang"));
  //       }
  //       console.log(places[0].types.hasOwnProperty("multilang"));
  //       console.log(places[0].types[0]);
  //
  //     });
  //     this.complaintProvider.getComplaints(targetToComplaints, fetchToComplaints).subscribe(complaints => {
  //       for (const complaint of complaints) {
  //         for (const place of places) {
  //           if (!place.complaints) place.complaints = [];
  //           if (place._id === complaint.place)
  //             place.complaints.push(complaint)
  //         }
  //       }
  //     });
  //     this.drinkApplicationProvider.getDrinkApplications(targetToDrinkApp, fetchToDrinkApp).subscribe(drinkApplications => {
  //       for (const drinkApp of drinkApplications) {
  //         for (const place of places) {
  //           if (!place.drinkApplications) place.drinkApplications = [];
  //           if (place._id === drinkApp.place)
  //             place.drinkApplications.push(drinkApp)
  //         }
  //       }
  //     });
  //     this.ratingService.getRatings(targetToRating, fetchToRating).subscribe(ratings => {
  //       for (const rating of ratings) {
  //         for (const place of places) {
  //           if (!place.ratings) place.ratings = [];
  //           if (place._id === rating.place)
  //             place.ratings.push(rating)
  //         }
  //       }
  //     });
  //     this.departmentService.getDepartments(targetToDepartment, fetchToDepartment).subscribe(departments => {
  //       for (const department of departments) {
  //         for (const place of places) {
  //           if (!place.departments) place.departments = [];
  //           if (place._id === department.place)
  //             place.departments.push(department);
  //         }
  //       }
  //     });
  //
  //     // add distance
  //     for (const place of places) {
  //       this.findDistanceToPlace(place).then(value => {
  //         place.distance = value;
  //       })
  //     }
  //
  //     console.log(JSON.stringify(places[0]));
  //     console.log(places[0]);
  //
  //     return places;
  //   });
  // }

  /*async */
  // sortingAndFiltering(places: Place[], searchObject: {
  //   direction?: boolean, range?: { lower: number, upper: number }, sort?: string, filterFeature: { karaoke?: boolean, parking?: boolean, vip?: true, wifi?: true }
  // }): Place[] {
  //
  //
  //   let sort = places.sort((a, b) => {
  //     if (!searchObject.direction) {
  //       if (searchObject.sort == "averagePrice") {
  //         return a.averagePrice - b.averagePrice;
  //       } else if (searchObject.sort == "rating") {
  //         return a.rating - b.rating;
  //       } else if (searchObject.sort == "name") {
  //         console.log("name", searchObject.direction);
  //         if (a.multilang[0].name > b.multilang[0].name) {
  //           return 1;
  //         } else {
  //           return -1;
  //         }
  //
  //       } else if (searchObject.sort == "location") {
  //         return a.distance - b.distance;
  //       }
  //     } else {
  //
  //       if (searchObject.sort == "averagePrice") {
  //         return b.averagePrice - a.averagePrice;
  //       } else if (searchObject.sort == "rating") {
  //         return b.rating - a.rating;
  //       } else if (searchObject.sort == "name") {
  //         console.log("name", searchObject.direction);
  //         if (b.multilang[0].name > a.multilang[0].name) {
  //           return 1;
  //         } else {
  //           return -1;
  //         }
  //       } else if (searchObject.sort == "location") {
  //         return b.distance - a.distance;
  //       }
  //
  //     }
  //   });
  //
  //   let filterFeatures = searchObject.filterFeature;
  //   // console.log(filterFeatures);
  //   let filterObject = {};
  //   for (const filterFeaturesKey in filterFeatures) {
  //     if (filterFeatures[filterFeaturesKey]) {
  //       filterObject[filterFeaturesKey] = filterFeatures[filterFeaturesKey];
  //     }
  //   }
  //
  //   console.log(filterObject);
  //
  //
  //   if (_.includes(_.values(filterObject), true)) {
  //     console.log(sort);
  //     return _.filter(places, {features: filterObject});
  //   }
  //   return sort;
  //
  //
  // }


  sortingAndFiltering(places: Place[], searchObject: {
    direction?: boolean, range?: { lower: number, upper: number }, sort?: string, filterFeature: { karaoke?: boolean, parking?: boolean, vip?: true, wifi?: true }
  }) {

    return this.getAllPlaces().map(places => {

      let sort = places.sort((a, b) => {
        if (!searchObject.direction) {
          if (searchObject.sort == "averagePrice") {
            return a.averagePrice - b.averagePrice;
          } else if (searchObject.sort == "rating") {
            return a.rating - b.rating;
          } else if (searchObject.sort == "name") {
            console.log("name", searchObject.direction);
            if (a.multilang[0].name > b.multilang[0].name) {
              return 1;
            } else {
              return -1;
            }

          } else if (searchObject.sort == "location") {
            return a.distance - b.distance;
          }
        } else {

          if (searchObject.sort == "averagePrice") {
            return b.averagePrice - a.averagePrice;
          } else if (searchObject.sort == "rating") {
            return b.rating - a.rating;
          } else if (searchObject.sort == "name") {
            console.log("name", searchObject.direction);
            if (b.multilang[0].name > a.multilang[0].name) {
              return 1;
            } else {
              return -1;
            }
          } else if (searchObject.sort == "location") {
            return b.distance - a.distance;
          }

        }
      });

      let filterFeatures = searchObject.filterFeature;
      let filterObject = {};
      for (const filterFeaturesKey in filterFeatures) {
        if (filterFeatures[filterFeaturesKey]) {
          filterObject[filterFeaturesKey] = filterFeatures[filterFeaturesKey];
        }
      }

      console.log(filterObject);


      if (_.includes(_.values(filterObject), true)) {
        console.log("sort", sort);
        console.log("filter", _.filter(places, {features: filterObject}))
        return _.filter(places, {features: filterObject});
      }

      return sort;

    });
  }


  promisefyMyPosition(): Promise<any> {
    return new Promise(resolve => {
      window.navigator.geolocation.getCurrentPosition(position => {
        resolve(position);
      });

    })
  }


  async findDistanceToPlace(place: Place): Promise<number> {
    let position = await this.promisefyMyPosition();
    let myPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    function findDistance() {

      let lat1 = myPosition.lat;
      let lon1 = myPosition.lng;
      let lat2 = place.location.lat;
      let lon2 = place.location.lng;
      let p = 0.017453292519943295;
      let a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 + Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((lon2 - lon1) * p)) / 2;
      return 12742 * Math.asin(Math.sqrt(a));

    }

    return findDistance();

  }


  getAllPlaces(target = {}) {
    target = JSON.stringify(target);
    let fetchHahTags = JSON.stringify({hashTag: {}});
    let fetchTopPlaces = JSON.stringify({topPlace: {}});
    let fetchTypes = JSON.stringify({placeType: {}});
    let fetchPlaceMultilang = JSON.stringify({placeMultilang: {query: {lang: lang}}});
    // let fetchTypes = JSON.stringify({placeType: {query: {lang: lang}}});

    let placesRequest = this
      .http
      .get<Place[]>(this.globalHost + `/api/places?target=${target}&fetch=[${fetchHahTags},${fetchTopPlaces},${fetchTypes},${fetchPlaceMultilang}]`);
    console.log(this.globalHost + `/api/places?target=${target}&fetch=[${fetchHahTags},${fetchTopPlaces},${fetchTypes},${fetchPlaceMultilang}]`);
    return placesRequest.pipe(switchMap((places) => {
        let placeIds = [];
        for (const place of places) {
          placeIds.push(place._id);
        }
        let targetToBonuses = {
          query: {
            place: placeIds
          }
        };
        let fetchToBonuses = [
          {
            bonuseMultilang: {
              query: {
                lang: lang
              }
            },
          },
          {
            client: {}
          }
        ];
        let targetToEvents = {
          query: {
            place: placeIds
          }
        };
        let fetchToEvents = [
          {
            eventMultilang: {
              query: {
                lang: lang
              }
            },

          },
          {
            client: {}
          }
        ];
        let targetToNews = {
          query: {
            place: placeIds
          }
        };
        let fetchToNews = [
          {
            newsMultilang: {
              query: {
                lang: lang
              }
            },

          },
          {
            client: {}
          }
        ];
        let targetToComplaints = {
          query: {
            place: placeIds
          }
        };
        let fetchToComplaints = [
          {
            client: {}
          }
        ];
        let targetToDrinkApp = {
          query: {
            place: placeIds
          }
        };
        let fetchToDrinkApp = [
          {
            client: {}
          }
        ];
        let targetToRating = {
          query: {
            place: placeIds
          }
        };
        let fetchToRating = [
          {
            client: {}
          }
        ];
        let targetToDepartment = {
          query: {
            place: placeIds
          }
        };
        let fetchToDepartment = [
          {
            client: {}
          }
        ];
        let fetchToPlaceType = [
          {
            placeTypeMultilang: {query: {lang: "5acf2559ab842f11f8362409"}}
          }
        ];
        let bonuses = this.bonuseProvider.getBonuses(targetToBonuses, fetchToBonuses);
        let events = this.eventProvider.getEvents(targetToEvents, fetchToEvents);
        let news = this.newsProvider.getNews(targetToNews, fetchToNews);
        let placeTypes = this.placeTypeService.getPlaceTypes({}, fetchToPlaceType);
        let complaints = this.complaintProvider.getComplaints(targetToComplaints, fetchToComplaints);
        let drinkApplications = this.drinkApplicationProvider.getDrinkApplications(targetToDrinkApp, fetchToDrinkApp);
        let ratings = this.ratingService.getRatings(targetToRating, fetchToRating);
        let departments = this.departmentService.getDepartments(targetToDepartment, fetchToDepartment);
        return zip(bonuses, events, news, placeTypes, complaints, drinkApplications, ratings, departments,
          (bonuses, events, news, placeTypesWithMultilang, complaints, drinkApplications, ratings, departments) => {
            for (const bonuse of bonuses) {
              for (const place of places) {
                if (bonuse.place === place._id) {
                  if (!place.promos) place.promos = [];
                  place.promos.push(bonuse);
                }
              }
            } // bonuses merge loop
            for (const event of events) {
              for (const place of places) {
                if (event.place === place._id) {
                  if (!place.promos) place.promos = [];
                  place.promos.push(event);
                }
              }
            }
            for (const singleNews of news) {
              for (const place of places) {
                if (singleNews.place === place._id) {
                  if (!place.promos) place.promos = [];
                  place.promos.push(singleNews);
                }
              }
            }
            for (const place of places) {
              let newTypes: PlaceType[] = [];
              for (const oldType of place.types) {
                for (const newType of placeTypesWithMultilang) {
                  if (oldType._id === newType._id) {
                    newTypes.push(newType);
                  }
                }
              }
              place.types = newTypes;
            }
            for (const complaint of complaints) {
              for (const place of places) {
                if (!place.complaints) place.complaints = [];
                if (place._id === complaint.place)
                  place.complaints.push(complaint)
              }
            }
            for (const drinkApp of drinkApplications) {
              for (const place of places) {
                if (!place.drinkApplications) place.drinkApplications = [];
                if (place._id === drinkApp.place)
                  place.drinkApplications.push(drinkApp)
              }
            }
            for (const rating of ratings) {
              for (const place of places) {
                if (!place.ratings) place.ratings = [];
                if (place._id === rating.place)
                  place.ratings.push(rating)
              }
            }
            for (const department of departments) {
              for (const place of places) {
                if (!place.departments) place.departments = [];
                if (place._id === department.place)
                  place.departments.push(department);
              }
            }

            for (const place of places) {
              this.findDistanceToPlace(place).then(value => {
                place.distance = value;
              });

            }
            return places;

          } // in zip magic functions
        ) // zip


      }
      )
    );

  }
}


