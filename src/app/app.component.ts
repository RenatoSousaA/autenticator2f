import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'autenticator2f';
  user: any = '';
  pass: any = '';
  message: any = 'Usuário não conectado';
  typeColorMessage: any = 'normal';

  constructor(private msalService: MsalService) {

  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null
  }

  login() {
    if (this.user != "renato" && this.pass != "123") {
      this.message = "Usuário ou Senha incorretos";
      this.typeColorMessage = "error";
    } else {
      this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(response.account)
        console.log(response)
        this.message = "Usuário conectado";
        this.typeColorMessage = "success";
      });
    }
  }

  logout() {
    this.msalService.logout();
    this.message = "Usuário não conectado";
    this.typeColorMessage = "normal";
  }
}
