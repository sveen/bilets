import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { LoginPage } from "../login/login";
import { HomePage } from "../home/home";
import { Http } from '@angular/http';
import { Usuario } from '../../domain/usuario/usuario';
import { Global } from '../../domain/global';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  private g_url: string = Global.getUrl();
  orderForm: any;
  public data;
  public http;
  public usuario: Usuario;
  constructor(
    public nav: NavController,
    private _alertCtrl: AlertController,
    http: Http) {
      this.data = {};
    this.data.response = '';
    this.http = http;
    this.usuario = new Usuario(null, null, null, null, null, null, null, null);
  }

  // register and go to home page
  register() {
    var link = this.g_url + 'api/cadastro';
    var data = JSON.stringify({
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
              subTitle: "Cadastro efetuado com sucesso!",
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    this.nav.setRoot(HomePage);
                  }
                }
              ]
            }).present();
          //this.navCtrl.setRoot(FestasPage);
        }
      }, error => {
        this._alertCtrl
            .create({
              title: 'Erro!',
              subTitle: "Não foi possível efetuar o seu cadastro!",
              buttons: [{  text: 'Tentar Novamente' }]
            }).present();
      });
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
