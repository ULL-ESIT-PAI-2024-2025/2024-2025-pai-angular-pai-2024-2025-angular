import { Component, ViewChild } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AuthComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorLoginMessage: string = 'Username or password incorrect';

  @ViewChild('auth') auth!: AuthComponent;
  
  /**
   * Show an error message if the login was not successful.
   * @param succes If the login was successful
   */
  public login(succes: boolean): void {
    if (!succes) {
      this.errorLoginMessage;
    }
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }

  public getErrorLoginMessage(): string {
    return this.errorLoginMessage;
  }
}
