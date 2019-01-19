import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {HotelService} from "../services/hotel-service";
import {PlaceService} from "../services/place-service";
import {ActivityService} from "../services/activity-service";
import {TripService} from "../services/trip-service";

import {MyApp} from "./app.component";

import {AccountPage} from "../pages/account/account";
import {CheckoutHotelPage} from "../pages/checkout-hotel/checkout-hotel";
import {CheckoutTripPage} from "../pages/checkout-trip/checkout-trip";
import {HomePage} from "../pages/home/home";
import {HotelPage} from "../pages/hotel/hotel";
import {HotelDetailPage} from "../pages/hotel-detail/hotel-detail";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RegisterPage} from "../pages/register/register";
import {ReviewsPage} from "../pages/reviews/reviews";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {SearchTripsPage} from "../pages/search-trips/search-trips";
import {TabReviewsPage} from "../pages/tab-reviews/tab-reviews";
import {TripDetailPage} from "../pages/trip-detail/trip-detail";
import {TripsPage} from "../pages/trips/trips";

//minhas páginas criadas por mim mesmo
import { FestaPage } from "../pages/festa/festa";
import { LotePage } from "../pages/lote/lote";
import { MeusIngressosPage } from "../pages/meus-ingressos/meus-ingressos";
import { IngressoPage } from "../pages/ingresso/ingresso";
import { EnviarIngressoPage } from "../pages/enviar-ingresso/enviar-ingresso";
import { CheckoutPage } from "../pages/checkout/checkout";
import { PedidosPage } from "../pages/pedidos/pedidos";
import { SalaPage } from "../pages/sala/sala";
import { MensagemPage } from "../pages/mensagem/mensagem";
import { ConversasPage } from "../pages/conversas/conversas";
import { CheckinPage } from "../pages/checkin/checkin";
import { PopovermensagemPage } from "../pages/popovermensagem/popovermensagem";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpModule } from '@angular/http';
//import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FirebaseProvider } from '../providers/firebase/firebase';

// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    CheckoutHotelPage,
    CheckoutTripPage,
    HomePage,
    HotelPage,
    HotelDetailPage,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    ReviewsPage,
    SearchLocationPage,
    SearchTripsPage,
    TabReviewsPage,
    TripDetailPage,
    TripsPage,
    FestaPage,
    LotePage,
    MeusIngressosPage,
    IngressoPage,
    EnviarIngressoPage,
    CheckoutPage,
    PedidosPage,
    SalaPage,
    MensagemPage,
    ConversasPage,
    CheckinPage,
    PopovermensagemPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      // mode: 'md', --> uncomment in case you'll do an Web App (PWA) build.
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
      BrowserModule
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    CheckoutHotelPage,
    CheckoutTripPage,
    HomePage,
    HotelPage,
    HotelDetailPage,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    ReviewsPage,
    SearchLocationPage,
    SearchTripsPage,
    TabReviewsPage,
    TripDetailPage,
    TripsPage,
    FestaPage,
    LotePage,
    MeusIngressosPage,
    IngressoPage,
    EnviarIngressoPage,
    CheckoutPage,
    PedidosPage,
    SalaPage,
    MensagemPage,
    ConversasPage,
    CheckinPage,
    PopovermensagemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    HotelService,
    PlaceService,
    ActivityService,
    TripService,
    TripService,
    InAppBrowser,
    FirebaseProvider
    //Geolocation
  ]
})

export class AppModule {
}
