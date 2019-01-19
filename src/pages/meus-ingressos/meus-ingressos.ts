import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { IngressoPage } from '../ingresso/ingresso';
import { Ingresso } from '../../domain/ingresso/ingresso';
import { Http } from '@angular/http';
import { Global } from '../../domain/global';

@Component({
  selector: 'page-meus-ingressos',
  templateUrl: 'meus-ingressos.html',
})

export class MeusIngressosPage {
  private g_url: string = Global.getUrl();
  public url: string;
  public ingresso: Ingresso[];
  public id_pessoa: null;
  public status_rede: string;

  constructor(
    public navCtrl: NavController,
    private _http: Http,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
    this.id_pessoa = localStorage.id_pessoa;
    this.url = this.g_url + "api/setIngPessoa/" + this.id_pessoa;
  }
  ngOnInit() {
    let loader = this._loadingCtrl.create({
      content: "Carregando seus ingressos, por favor aguarde...!"
    });
    loader.present();
    this._http
      .get(this.url)
      .map(res => res.json())
      .toPromise()
      .then(ingresso => {
        this.ingresso = ingresso;
        loader.dismiss();
        this.status_rede = "rede conectada";
        this.salvaIngressos(ingresso);
        this.showToast('top', 'Ingressos carregados com sucesso!');
      })
      .catch(err => {
        loader.dismiss();
        this.status_rede = null;
        this._alertCtrl
          .create({
            title: 'Falha na conexão',
            subTitle: 'Não foi possível obter os ingressos online. Mostraremos seus ingressos offline.',
            buttons: [
              {
                text: 'Ok, carregar ingressos salvos!',
                handler: () => {
                  if (typeof localStorage.ingresso != 'undefined') {
                    this.ingresso = JSON.parse(localStorage.ingresso);
                    this.showToast('top', 'Ingressos carregados com sucesso!');
                  }
                }
              }
            ]
          }).present();
        loader.dismiss();
      });
  }

  salvarIngressos(ingresso) {
    if (!ingresso) ingresso = {};

    this._alertCtrl
      .create({
        title: 'Atenção!',
        subTitle: "Os ingressos salvos em seu celular, deverão ser apresentados juntamente com o "
          + "documento de Identificação com foto!",
        buttons: [
          {
            text: 'Salvar assim mesmo!',
            handler: () => {
              this.salvaIngressos(ingresso);
              this.showToast('top', 'Ingressos salvos com sucesso!');
            }
          }
        ]
      }).present();
  }

  showToast(position: string, msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: position
    });
    toast.present(toast);
  }

  goToIngresso(ingresso) {
    if (!ingresso) ingresso = {};
    this.navCtrl.push(IngressoPage, { ingressoSelecionado: ingresso });
  }

  salvaIngressos(ingresso) {
    if (typeof localStorage.ingresso != 'undefined') {
      localStorage.removeItem('ingresso');
    }
    localStorage.setItem('ingresso', JSON.stringify(ingresso));
  }

}
