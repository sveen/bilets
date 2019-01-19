import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Ingresso } from '../../domain/ingresso/ingresso';
import { IngressoPage } from '../ingresso/ingresso';
import { Http } from '@angular/http';
import { Global } from '../../domain/global';

@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {
  private g_url: string = Global.getUrl();
  public ingresso: Ingresso;
  public msg: string;
  public url: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _http: Http,
    private _alertCtrl: AlertController
  ) {
    this.ingresso = this.navParams.get('ingresso');
    if(this.ingresso.id_checkin){
      this.navCtrl.setRoot(IngressoPage, { ingressoSelecionado: this.ingresso });
    }
    this.url = this.g_url + "ingresso/checkin/" + this.ingresso.id_ingresso;
  }

  ngOnInit() {
    console.log(this.ingresso);
  }

  goToCheckin(){
    this._http
      .get(this.url)
      .map(res => res.json())
      .toPromise()
      .then(msg => {
        this._alertCtrl
        .create({
          title: msg.title,
          buttons: [{ text: 'Estou ciente!' }],
          subTitle: msg.message
        }).present();
      })
      .catch(err => {
        console.log(err);
        this._alertCtrl
          .create({
            title: 'Falha no checking',
            buttons: [{ text: 'Estou ciente!' }],
            subTitle: 'Não foi possível fazer o checkin. Tente novamente mais tarde.'
          }).present();
      });
  }

}
