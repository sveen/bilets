import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Venda } from '../../domain/venda/venda';
import { Http } from '@angular/http';
import { Global } from '../../domain/global';

@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})

export class PedidosPage {
  private g_url: string = Global.getUrl();
  public url: string;
  public venda: Venda[];
  public id_pessoa: null;
  public status_rede: string;
  constructor(
    public navCtrl: NavController,
    private _http: Http,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    public navParams: NavParams,
    public toastCtrl: ToastController) {
    this.id_pessoa = localStorage.id_pessoa;
    this.url = this.g_url + "api/setPedidosPessoa/" + this.id_pessoa;
  }


  ngOnInit() {
    let loader = this._loadingCtrl.create({
      content: "Carregando seus pedidos, por favor aguarde...!"
    });
    loader.present();
    this._http
      .get(this.url)
      .map(res => res.json())
      .toPromise()
      .then(venda => {
        this.venda = venda;
        loader.dismiss();
        this.status_rede = "rede conectada";
      })
      .catch(err => {
        loader.dismiss();
        this.status_rede = null;
        this._alertCtrl
          .create({
            title: 'Falha na conexão',
            subTitle: 'Não foi possível obter os pedidos online.',
            buttons: [
              {
                text: 'Ok, estou ciente!'
              }
            ]
          }).present();
        loader.dismiss();
      });
  }

}
