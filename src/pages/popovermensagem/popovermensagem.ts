import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Global } from '../../domain/global';
import { Http } from '@angular/http';
import { Sala } from '../../domain/chat/sala';

@Component({
  selector: 'page-popovermensagem',
  templateUrl: 'popovermensagem.html',

})

export class PopovermensagemPage {
  private g_url: string = Global.getUrl();
  public sala: Sala;
  public url: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private _http: Http
  ) {
    this.sala = new Sala(null, null, null, null, null);
    this.sala = this.navParams.get('sala');
  }

  ngOnInit() {

  }

  bloquear() {
    let alert = this.alertCtrl.create({
      title: 'Confirma?',
      message: 'Deseja realmente bloquear essa conversa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            //cancelou o bloqueio
          }
        },
        {
          text: 'Bloquear',
          handler: () => {
            //confirmou o bloqueio
            this.url = this.g_url + "chat/bloquear/" + this.sala.id_chat;
            this._http
              .get(this.url)
              .map(res => res.json())
              .toPromise()
              .then(response => {
                this.alertCtrl
                  .create({
                    title: 'Conversa bloqueada!',
                    subTitle: "Você não conversará mais com essa pessoa!",
                    buttons: [{ text: 'Estou ciente' }]
                  }).present();
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      ]
    });
    alert.present();
  }

  excluir() {
    let alert = this.alertCtrl.create({
      title: 'Confirma?',
      message: 'Ninguém poderá rever esta conversa, deseja realmente apagar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            //cancelou a exclusão
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            //confirmou o bloqueio
            this.url = this.g_url + "chat/excluir/" + this.sala.id_chat;
            this._http
              .get(this.url)
              .map(res => res.json())
              .toPromise()
              .then(response => {
                this.alertCtrl
                  .create({
                    title: 'Conversa excluída!',
                    subTitle: "Nem você nem niguém poderá ver mais essa conversa!",
                    buttons: [{ text: 'Tranquilo' }]
                  }).present();
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      ]
    });
    alert.present();
  }

}
