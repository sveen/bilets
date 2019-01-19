import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Ingresso } from '../../domain/ingresso/ingresso';
import { MeusIngressosPage } from '../meus-ingressos/meus-ingressos';
import { Global } from '../../domain/global';

@Component({
  selector: 'page-enviar-ingresso',
  templateUrl: 'enviar-ingresso.html'
})
export class EnviarIngressoPage {
  private g_url: string = Global.getUrl();
  public ingresso: Ingresso;
  public data;
  public http;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    http: Http
  ) {
    this.data = {};
    this.data.response = '';
    this.http = http;
    this.ingresso = this.navParams.get('ingressoSelecionado');
  }

  submit() {
    var link = this.g_url + 'api/doarIngresso/';
    var data = JSON.stringify({
      pessoa: this.ingresso.id_pessoa, amigo: this.ingresso.amigo, ingresso: this.ingresso.id_ingresso
    });

    this._alertCtrl
      .create({
        title: 'Atenção!',
        subTitle: "Tem certeza que deseja enviar este ingresso para um amigo? Não será possível reaver este ingresso novamente.",
        buttons: [
          {
            text: 'Sim, quero enviar!',
            handler: () => {
              this.http.post(link, data)
                .subscribe(data => {
                  this.data.response = data._body;
                  if (this.data.response) {
                    this._alertCtrl
                      .create({
                        title: 'Alerta!',
                        buttons: [{ text: 'Ok!' }],
                        subTitle: this.data.response
                      }).present();
                    this.navCtrl.setRoot(MeusIngressosPage);
                  } else {
                    this._alertCtrl
                      .create({
                        title: 'Falha na conexão',
                        buttons: [{ text: 'Tentar Novamente!' }],
                        subTitle: 'Não foi possível enviar o ingresso!'
                      }).present();
                  }
                }, error => {
                  this._alertCtrl
                    .create({
                      title: 'Falha na conexão',
                      buttons: [{ text: 'Tentar Novamente!' }],
                      subTitle: "Não foi possível enviar o ingresso!"
                    }).present();
                });
            }
          }
        ]
      }).present();
  }

}
