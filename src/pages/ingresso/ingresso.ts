import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { EnviarIngressoPage } from '../enviar-ingresso/enviar-ingresso';
import { Ingresso } from '../../domain/ingresso/ingresso';
import { MeusIngressosPage } from '../meus-ingressos/meus-ingressos';
import { Http } from '@angular/http';
import { Festa } from '../../domain/festa/festa';
import { CheckinPage } from '../checkin/checkin';
import { Global } from '../../domain/global';

@Component({
  selector: 'page-ingresso',
  templateUrl: 'ingresso.html'
})
export class IngressoPage {
  private g_url: string = Global.getUrl();
  public ingresso: Ingresso;
  public festa: Festa;
  public data;
  public http;
  public img;

  public no_lote;
  public lo_descricao;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    http: Http
  ) {
    this.ingresso = this.navParams.get('ingressoSelecionado');
    this.data = {};
    this.data.response = '';
    this.http = http;
    this.festa = new Festa(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  }

  ngOnInit() {
    if (this.ingresso.id_checkin) {
        this._alertCtrl
        .create({
          title: 'Atenção!',
          subTitle: "Você já fez checkin neste Ingresso!",
          buttons: [
            {
              text: 'Ok!',
            }
          ]
        }).present();
        this.navCtrl.push(MeusIngressosPage);
    }
    var link = this.g_url + 'api/festa';
    var data = JSON.stringify({ id: this.ingresso.id_lote });

    this.http.post(link, data)
      .subscribe(data => {
        this.data.response = data._body;
        var res = this.data.response.split("//");
        if (this.data.response) {
          this.festa.no_nome = res[0];
          this.festa.dt_festa = res[1];
          this.festa.dc_hora = res[2];
          this.festa.dc_local = res[3];
          this.festa.imagem = res[4];
          this.no_lote = res[5];
          this.lo_descricao = res[6];
          this.img = this.g_url + "img/festa/"+this.festa.imagem;
        } else {
          this._alertCtrl
            .create({
              title: 'Falha na conexão',
              buttons: [{ text: 'Tentar Novamente!' }],
              subTitle: "Parrece que não há conexão de internet"
            }).present();
        }
      }, error => {
        this._alertCtrl
          .create({
            title: 'Falha na conexão',
            buttons: [{ text: 'Tentar Novamente!' }],
            subTitle: "Não foi possível conectar ao banco de dados"
          }).present();
      });

  }

  goToEnviarIngresso(ingresso) {
    if (!ingresso) ingresso = {};
    this.navCtrl.push(EnviarIngressoPage, { ingressoSelecionado: ingresso });
  }

  goToCheckin(ingresso){
    if (!ingresso) ingresso = {};
    this.navCtrl.push(CheckinPage, { ingresso: ingresso });
  }

}