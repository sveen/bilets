import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, PopoverController } from 'ionic-angular';
import { Mensagem } from '../../domain/chat/mensagem';
import { Sala } from '../../domain/chat/sala';
import { Http } from '@angular/http';
import { Global } from '../../domain/global';
import { PopovermensagemPage } from '../popovermensagem/popovermensagem';


@Component({
  selector: 'page-mensagem',
  templateUrl: 'mensagem.html',

})

export class MensagemPage {
  private g_url: string = Global.getUrl();
  public pessoa;
  public sala: Sala;
  public url: string;
  public mensagens: Mensagem[];
  //para cadastro de mensagens
  public data;
  public mensagem: string = '';
  public http;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private _http: Http,
    private _alertCtrl: AlertController,
  ) {
    this.pessoa = localStorage.getItem('id_pessoa');
    this.sala = new Sala(null, null, null, null, null);
    this.sala = this.navParams.get('item');
    //para cadastro de mensagens
    this.data = {};
    this.data.response = '';
    this.http = _http;
    //carregar as mensagens de um em um segundo
    setInterval(() => {
      this.carregarMensagens();
    }, 1000);
  }

  ngOnInit() {
    this.carregarMensagens();
  }

  carregarMensagens() {
    this.url = this.g_url + "chat/setMensagem/" + this.sala.id_chat;
    this._http
      .get(this.url)
      .map(res => res.json())
      .toPromise()
      .then(mensagens => {
        this.mensagens = mensagens;
      })
      .catch(err => {
        console.log(err);
      });
  }

  sendMensagem() {
    //this.nav.setRoot(HomePage);
    var link = this.g_url + 'chat/enviarMensagem';
    var data = JSON.stringify({
      chat: this.sala.id_chat,
      pessoa: this.pessoa,
      mensagem: this.mensagem
    });
    // Iniciando a conexão HTTP para cadastro via JSON
    if (this.mensagem.length > 0) {
      this.http.post(link, data)
        .subscribe(data => {
          this.data.response = data._body;
          if (this.data.response) {
            this.ngOnInit();
          }
        }, error => {
          this._alertCtrl
            .create({
              title: 'Falha na conexão!',
              subTitle: "Não foi possível enviar a mensagem!",
              buttons: [{ text: 'Tentar Novamente' }]
            }).present();
        });
    }

    this.mensagem = '';
  }

  presentPopover(myEvent) {
    //let popover = this.popoverCtrl.create(PopovermensagemPage);
    let popover = this.popoverCtrl.create(PopovermensagemPage, { sala: this.sala });
    popover.present({
      ev: myEvent
    });
  }

  bloquear() {
    console.log(this.mensagens);
  }

}
