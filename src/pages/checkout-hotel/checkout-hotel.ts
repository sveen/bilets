import {Component} from "@angular/core";
import {NavController, LoadingController, ToastController} from "ionic-angular";
import {HotelService} from "../../services/hotel-service";
import {HomePage} from "../home/home";


@Component({
  selector: 'page-checkout-hotel',
  templateUrl: 'checkout-hotel.html'
})
export class CheckoutHotelPage {
  // hotel info
  public hotel: any;
  // room info
  public room: any;
  // number of nights
  public nights = 7;
  // number of guests
  public guests = 3;
  // date from
  public dateFrom = new Date();
  // date to
  public dateTo = new Date();

  constructor(public nav: NavController, public hotelService: HotelService, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    // set sample data
    this.hotel = hotelService.getItem(1);
    this.room = this.hotel.rooms[0];
  }

  // process send button
  send() {
    // send booking info
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    // show message
    let toast = this.toastCtrl.create({
      cssClass: 'primary-bg',
      message: 'Booking Success!',
      duration: 3000,
      position: 'top'
    });

    loader.present();

    setTimeout(() => {
      loader.dismiss();
      toast.present();
      // back to home page
      this.nav.setRoot(HomePage);
    }, 3000)

  }
}
