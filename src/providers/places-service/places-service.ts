import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import {Place} from "../../models/place/Place";
import {FullPlaceDTO} from "../../models/place/FullPlaceDTO";
import {PlacesMultilang} from "../../models/place/PlacesMultilang";


@Injectable()
export class PlacesServiceProvider {
  private host = "https://192.168.1.25:3000/api";
  // private host = "https://localhost:3000/api";

  constructor(public http: HttpClient) {
    console.log('place service run');
  }


  async getAllPlaces(): Promise<FullPlaceDTO[]> {

    let placesList = await this.http.get<Place[]>(`${this.host}/places`).toPromise();
    console.log(placesList);
    let ids = [];
    for (let place of placesList) {
      ids.push(place._id);
    }
    console.log(ids);
    let request = `${this.host}/placeMultilangs?query=` + JSON.stringify({
      place: ids,
      lang: "5abb4e05c5bf611ccc42e8ea"
    });

    let placesMultilang = await this.http.get<PlacesMultilang[]>(request).toPromise();
    console.log(placesMultilang);

    let fullPlacesDTO = [];
    for (let placeX of placesList) {
      for (let multilang of placesMultilang) {
        if (placeX._id === multilang.place) {
          fullPlacesDTO.push(new FullPlaceDTO(placeX, multilang))

        }
      }
    }
    return fullPlacesDTO;


  }

}
