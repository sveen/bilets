import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";

@Component({
  selector: 'page-search-trips',
  templateUrl: 'search-trips.html'
})
export class SearchTripsPage {
  // search condition
  public search = {
    name: "Location",
    date: new Date().toISOString()
  }

  constructor(public nav: NavController) {
  }

  // go to result page
  doSearch() {
    this.nav.push(TripsPage);
  }

  // choose place
  choosePlace() {
    this.nav.push(SearchLocationPage);
  }
}
