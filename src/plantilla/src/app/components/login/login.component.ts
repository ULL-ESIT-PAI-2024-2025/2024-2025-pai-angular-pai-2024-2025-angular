import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AuthComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
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

  public ngAfterViewInit(): void {
    if (this.auth) {
      console.log('AuthComponent is initialized:', this.auth);
    } else {
      console.error('AuthComponent failed to initialize.');
    }
  }

  onSubmit(): void {
    if (this.auth) {
      this.auth.login(this.username, this.password);
    }
  }

  handleLoginStatus(isLoggedIn: boolean): void {
    if (isLoggedIn) {
      console.log('User is logged in');
    } else {
      console.log('Login failed');
    }
  }
}
