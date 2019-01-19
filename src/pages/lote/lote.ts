import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Lote } from '../../domain/lote/lote';
import { Festa } from '../../domain/festa/festa';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Http } from '@angular/http';
import { CheckoutPage } from '../checkout/checkout';
import { Global } from '../../domain/global';

@Component({
  selector: 'page-lote',
  templateUrl: 'lote.html',
})
export class LotePage {
  private g_url: string = Global.getUrl();
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'no',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };
  public url1: string;
  public lote: Lote;
  public festa: Festa;
  public img;
  public url_venda;
  public p;
  public data;
  public http;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private iab: InAppBrowser,
    private _loadingCtrl: LoadingController,
    http: Http,
    public _alertCtrl: AlertController
  ) {
    this.lote = this.navParams.get('loteSelecionado');
    this.festa = this.navParams.get('festaSelecionada');
    this.url1 = this.g_url + "api/setLote/" + this.lote.id_lote;
    this.img = this.g_url + "img/festa/" + this.festa.imagem;
    this.url_venda = this.g_url + "venda/";
    this.p = localStorage.id_pessoa;
    this.data = {};
    this.data.response = '';
    this.http = http;
  }

  goToPagamento(chave) {
    let target = "_self";
    this.iab.create(this.url_venda + "formVenda/" + chave, target, this.options);
  }

  goToCheckout(params) {
    if (!params) params = {};
    this.navCtrl.push(CheckoutPage, { item: params });
  }

  goToCompra(lote: string) {
    let loader = this._loadingCtrl.create({
      content: "Criptografando sua compra, aguarde...!"
    });
    loader.present();
    //checar se o usuario está logado
    this.checkLogado();
    //salvar a compra no banco de dados e retornar a chave
    var link = this.g_url + 'venda/validaCompra';
    //var link = 'http://localhost/Bilets/public/venda/validaCompra';
    var data = JSON.stringify({ lote: lote, pessoa: this.p });
    console.log(data);
    this.http.post(link, data)
      .subscribe(data => {
        this.data.response = data._body;
        var res = this.data.response.split("||");
        if (res[1] == "sucesso") {
          loader.dismiss();
          this.goToPagamento(res[0]);
        } else
          if (this.data.response != "sucesso") {
            this._alertCtrl
              .create({
                title: 'Falha na conexão',
                buttons: [{ text: 'Tentar Novamente!' }],
                subTitle: "Erro inesperado"
              }).present();
            loader.dismiss();
          }
      }, error => {
        this._alertCtrl
          .create({
            title: 'Falha na conexão',
            buttons: [{ text: 'Tentar Novamente!' }],
            subTitle: "Alguma coisa deu errado ao enviar os dados"
          }).present();
        loader.dismiss();
      });
  }

  checkLogado() {
    if (!this.p) {
      this._alertCtrl
        .create({
          title: 'Usuário não reconhecido',
          buttons: [{ text: 'Ok' }],
          subTitle: "Você precisa logar antes de comprar um ingresso!"
        }).present();
    }
  }

}
