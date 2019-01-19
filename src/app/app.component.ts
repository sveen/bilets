import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, Events } from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginPage } from "../pages/login/login";
import { Usuario } from "../domain/usuario/usuario";
import { Http } from '@angular/http';
import { HomePage } from "../pages/home/home";
import { AccountPage } from "../pages/account/account";
import { MeusIngressosPage } from "../pages/meus-ingressos/meus-ingressos";
import { PedidosPage } from "../pages/pedidos/pedidos";
import { ConversasPage } from "../pages/conversas/conversas";
import { Global } from "../domain/global";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  public usuario: Usuario;
  private url: string = Global.getUrl();
  public data;
  public http;
  public img;
  public id_pessoa: string;
  public id_p: null;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    http: Http,
    public events: Events
  ) {
    this.http = http;
    this.data = {};
    this.data.response = '';
    this.usuario = new Usuario(null, 'nome completo', 'email', 'telefone', 'rg', 'saldo_ct', 'password', 'status');
    this.id_p = localStorage.id_pessoa;
    if (this.id_p) {
      this.id_pessoa = this.id_p;
      this.setUsuario(this.id_pessoa);
      this.initializeApp();
    }
    events.subscribe('user:created', (user, time) => {
      this.id_pessoa = user;
      this.setUsuario(this.id_pessoa);
      this.initializeApp();
    });

  }

  setUsuario(id) {
    var link = this.url + 'api/setPessoa';
    var data = JSON.stringify({ id: id });

    if (id = null) {
      this.nav.setRoot(LoginPage);
    }
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
          this.usuario.saldo_ct = res[5];
          this.img = this.url + 'img/' + res[6];
        } else {
          this.nav.setRoot(HomePage);
        }
      }, error => {
        this.nav.setRoot(HomePage);
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  doRefresh() {
    this.nav.setRoot(this.nav.getActive().component);
  }

  goToLogout() {
    sessionStorage.clear();
    localStorage.clear();
    this.doRefresh();
    this.nav.setRoot(LoginPage);
  }

  goToHome(params) {
    if (!params) params = {};
    this.nav.setRoot(HomePage);
  }
  goToMeusIngressos(params) {
    if (!params) params = {};
    this.nav.setRoot(MeusIngressosPage);
  }
  goToPedidos(params) {
    if (!params) params = {};
    this.nav.setRoot(PedidosPage);
  }
  goToComprarCredito(params) {
    if (!params) params = {};
    this.nav.setRoot(HomePage);
  }
  goToMinhaConta(params) {
    if (!params) params = {};
    this.nav.setRoot(HomePage);
  }
  goToAjuda(params) {
    if (!params) params = {};
    this.nav.setRoot(HomePage);
  }
  goToAccount(params) {
    if (!params) params = {};
    this.nav.push(AccountPage);
  }
  goToConversas(params) {
    if (!params) params = {};
    this.nav.setRoot(ConversasPage);
  }


}


