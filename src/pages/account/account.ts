import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { Usuario } from '../../domain/usuario/usuario';
import { Http } from '@angular/http';
import { Global } from '../../domain/global';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})


export class AccountPage {
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
  private url: string = Global.getUrl();
  public data;
  public http;
  public usuario: Usuario;
  private id_pessoa: string;
  public img;
  constructor(
    public navCtrl: NavController,
    private _alertCtrl: AlertController,
    http: Http,
    private iab: InAppBrowser) {
    this.data = {};
    this.data.response = '';
    this.http = http;
    this.usuario = new Usuario(null, null, null, null, null, null, null, null);
    this.id_pessoa = localStorage.id_pessoa;

  }

  ngOnInit() {

    if (localStorage.id_pessoa) {
      var link = this.url + 'api/setPessoa';
      var data = JSON.stringify({ id: this.id_pessoa });

      this.http.post(link, data)
        .subscribe(data => {
          this.data.response = data._body;
          var res = this.data.response.split("//");
          if (this.data.response) {
            this.usuario.id = res[0];
            this.usuario.nome = res[1];
            this.usuario.email = res[2];
            this.usuario.telefone = res[3];
            this.usuario.rg = res[4];
            this.img = this.url + 'img/' + res[6];
            console.log(this.img);
            console.log(this.data.response);
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
    } else {
      this.goToLogin();
    }

  }

  submit() {
    var link = this.url + 'api/cadastro';
    var data = JSON.stringify({
      id: this.id_pessoa,
      nome: this.usuario.nome,
      email: this.usuario.email,
      telefone: this.usuario.telefone,
      rg: this.usuario.rg,
      password: this.usuario.password
    });

    // Iniciando a conexão HTTP para cadastro via JSON
    this.http.post(link, data)
      .subscribe(data => {
        this.data.response = data._body;
        if (this.data.response) {
          this._alertCtrl
            .create({
              title: 'Sucesso!',
              subTitle: "Dados atualizados com sucesso!",
              buttons: [{ text: 'Ok!' }]
            }).present();
        }
      }, error => {
        this._alertCtrl
          .create({
            title: 'Falha de conexão!',
            subTitle: "Erro ao tentar atualizar os dados!",
            buttons: [{ text: 'Tentar Novamente!' }]
          }).present();
      });
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  logof() {
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }

  goToFoto() {
    let target = "_self";
    this.iab.create(this.url + "imgperfil/img/" + this.id_pessoa, target, this.options);
  }

  /*goToFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.img = base64Image;
      console.log(this.img);
      //
      var link = this.url + 'perfil/base64';
      var data = JSON.stringify({
        id: this.id_pessoa,
        img: this.img
      });
      // Iniciando a conexão HTTP para cadastro via JSON
      this.http.post(link, data)
        .subscribe(data => {
          this.data.response = data._body;
          if (this.data.response) {
            this._alertCtrl
              .create({
                title: 'Sucesso!',
                subTitle: "Imagem atualizada!",
                buttons: [{ text: 'Ok!' }]
              }).present();
          }
        }, error => {
          this._alertCtrl
            .create({
              title: 'Falha de conexão!',
              subTitle: "Erro ao tentar atualizar imagem!",
              buttons: [{ text: 'Tentar Novamente!' }]
            }).present();
        });
    }, (err) => {
      this._alertCtrl
        .create({
          title: 'Falha ao Executar Plugin!',
          subTitle: "Ocorreu um erro ao tentar acionar a câmera!",
          buttons: [{ text: 'Tentar Novamente!' }]
        }).present();
    });
  }*/
}
