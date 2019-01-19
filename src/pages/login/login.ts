import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController, Events} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import {Usuario} from "../../domain/usuario/usuario";
import { Http } from '@angular/http';
import { Global } from '../../domain/global';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private g_url: string = Global.getUrl();
  public data;
  public http;
  public usuario: Usuario;
  public usuarioLogado: Usuario;

  constructor(
    public nav: NavController, 
    public _alertCtrl: AlertController, 
    public menu: MenuController, 
    public toastCtrl: ToastController,
    http: Http,
    public events: Events
  ) {
    this.menu.swipeEnable(false);
    this.data = {};
    this.data.response = '';
    this.http = http;
    this.usuario = new Usuario(null, null, null, null, null, null, null, null);
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  ngOnInit(){
    this.userLogado();
  }

  login() {
    var link = this.g_url + 'api/login';
    var data = JSON.stringify({ email: this.usuario.email, password: this.usuario.password });

    this.http.post(link, data)
      .subscribe(data => {
        this.data.response = data._body;
        var res = this.data.response.split("|");
        if (res[1] == "sucesso") {
          sessionStorage.setItem("usuarioId", res[0]);
          sessionStorage.setItem("usuarioLogado", this.usuario.email);
          sessionStorage.setItem("flagLogado", "sim");
          localStorage.setItem("id_pessoa",res[0]);
          this.events.publish('user:created', res[0], Date.now());
          this.nav.setRoot(HomePage);
        } else
          if (this.data.response != "sucesso") {
            this._alertCtrl
              .create({
                title: 'Falha no Login',
                buttons: [{ text: 'Tentar Novamente!' }],
                subTitle: this.data.response
              }).present();
          }
      }, error => {
        this._alertCtrl
          .create({
            title: 'Falha no Login',
            buttons: [{ text: 'Tentar Novamente!' }],
            subTitle: "Alguma coisa deu errado ao enviar os dados"
          }).present();
      });
  }

  forgotPass() {
    let forgot = this._alertCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

  userLogado(){
    if (localStorage.usuarioId != null) {
      this.nav.setRoot(HomePage);
    }
  }
}
