import {Component} from "@angular/core";
import {NavController, MenuController, ModalController, PopoverController, LoadingController, AlertController} from "ionic-angular";
import {HotelService} from "../../services/hotel-service";
import {FestaPage} from '../festa/festa';
import {MeusIngressosPage} from '../meus-ingressos/meus-ingressos';
import {Festas} from '../../domain/festas/festas';
import {Http} from '@angular/http';
import {Global} from '../../domain/global';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private g_url: string = Global.getUrl();
    public festas: Festas[];

    constructor(
        public nav: NavController,
        public menuCtrl: MenuController,
        public modalCtrl: ModalController,
        public popoverCtrl: PopoverController,
        public hotelService: HotelService,
        private _http: Http,
        private _loadingCtrl: LoadingController,
        private _alertCtrl: AlertController
    ) {
        this.menuCtrl.swipeEnable(true, 'authenticated');
    }

    ngOnInit() {

        let loader = this._loadingCtrl.create({
            content: 'Listando Festas da Região. Aguarde ...'
        });
        loader.present();
        this._http
            .get(this.g_url + 'api/festas')
            .map(res => res.json())
            .toPromise()
            .then(festas => {
                this.festas = festas;
                loader.dismiss();
            })
            .catch(err => {
                console.log(err);
                this._alertCtrl
                    .create({
                        title: 'Falha na conexão',
                        buttons: [
                            {
                                text: 'Estou ciente!',
                                handler: () => {
                                    this.ingressos();
                                }
                            }
                        ],
                        subTitle: 'Não foi possível obter a lista de festas.'
                    }).present();
                loader.dismiss();
            });
    }

    ingressos() {
        this.nav.setRoot(MeusIngressosPage);
    }

    goToFesta(params) {
        this.nav.push(FestaPage, {item: params});
    }

}

// 
