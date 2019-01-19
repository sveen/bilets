import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { MensagemPage } from '../mensagem/mensagem';
import { Festa } from '../../domain/festa/festa';
import { Chat } from '../../domain/chat/chat';
import { Sala } from '../../domain/chat/sala';
import { Http } from '@angular/http';
import { Global } from '../../domain/global';

@Component({
  selector: 'page-sala',
  templateUrl: 'sala.html',
})
export class SalaPage {
  private g_url: string = Global.getUrl();
  public festa: Festa;
  public url: string;
  public url_chat: string;
  public chat: Chat[];
  public sala: Sala;
  public img;
  public pessoa: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _http: Http,
    private _loadingCtrl: LoadingController,
    public _alertCtrl: AlertController
  ) {
    this.sala = new Sala(null, null, null, null, null);
    this.festa = this.navParams.get('festa');
    this.url = this.g_url + "chat/pessoas/" + this.festa.id_festa;

  }

  ngOnInit() {
    let loader = this._loadingCtrl.create({
      content: "Carregando pessoas, aguarde...!"
    });
    loader.present();
    this._http
      .get(this.url)
      .map(res => res.json())
      .toPromise()
      .then(chat => {
        this.chat = chat;
        loader.dismiss();
      })
      .catch(err => {
        console.log(err);
        this._alertCtrl
          .create({
            title: 'Falha na conexão',
            buttons: [{ text: 'Estou ciente!' }],
            subTitle: 'Não foi possível obter a lista de pessoas nesta festa. Tente novamente mais tarde.'
          }).present();
        loader.dismiss();
      });
  }

  conversa(params) {
    //buscar a conversa para enviar o id_chat
    this.pessoa = localStorage.getItem('id_pessoa');
    this.url_chat = this.g_url + "chat/buscarChat/" + this.pessoa + 'e' + params;
    this._http
      .get(this.url_chat)
      .map(res => res.json())
      .toPromise()
      .then(sala => {
        this.sala = sala;
        if (this.sala.id_bloqueio) {
          this._alertCtrl
            .create({
              title: 'Opà',
              buttons: [{ text: 'Estou ciente!' }],
              subTitle: 'Esta conversa não está disponível, Bloqueado pelo usuário.'
            }).present();
        } else {
          this.navCtrl.push(MensagemPage, { item: this.sala });
        }

      })
      .catch(err => {
        console.log(err);
      });
  }

}
