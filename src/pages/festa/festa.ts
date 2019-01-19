import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LotePage } from '../lote/lote';
import { SalaPage } from '../sala/sala';
import { Festa } from '../../domain/festa/festa';
import { Lote } from '../../domain/lote/lote';
import { Http } from '@angular/http';
import { Global } from '../../domain/global';

@Component({
  selector: 'page-festa',
  templateUrl: 'festa.html'
})
export class FestaPage {
  private g_url: string = Global.getUrl();
  public festa: Festa;
  public url: string;
  public lote: Lote[];
  public atracoes = [];
  constructor(
    public navCtrl: NavController,
    private _http: Http,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    public navParams: NavParams
  ) {
    this.festa = this.navParams.get('item');
    this.url = this.g_url + "api/lote/" + this.festa.id_festa;
  }

  setAtracoes(){
    var res = this.festa.dc_atracoes.split(",");
    this.atracoes = res;
  }

  ngOnInit() {
    let loader = this._loadingCtrl.create({
      content: "Carregando Lote de Ingressos, aguarde...!"
    });
    loader.present();
    this._http
      .get(this.url)
      .map(res => res.json())
      .toPromise()
      .then(lote => {
        this.lote = lote;
        loader.dismiss();
      })
      .catch(err => {
        console.log(err);
        this._alertCtrl
          .create({
            title: 'Falha na conexão',
            buttons: [{ text: 'Estou ciente!' }],
            subTitle: 'Não foi possível obter o lote de Ingressos para esta festa. Tente novamente mais tarde.'
          }).present();
      });
  }

  submit(lote) {
    console.log(lote.no_nome);;
  }

  
  goToLote(params,festa){
    if (!params) params = {};
    this.navCtrl.push(LotePage, { loteSelecionado: params, festaSelecionada: festa });
  }

  goToChat(festa){
    if (!festa) festa = {};
    this.navCtrl.setRoot(SalaPage, { festa: festa });
  }
}
