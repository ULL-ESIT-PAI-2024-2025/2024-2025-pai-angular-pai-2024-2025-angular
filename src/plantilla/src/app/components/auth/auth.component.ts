import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  private isLoggedIn: boolean = false;

  // Método que notifica de cambios cuando el usuario inicia o cierra sesión.
  @Output() loginStatus = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  /**
   * Attempts to log in the user with the provided credentials.
   * If the username and password match the 'admin' credentials,
   * the user is marked as logged in, a login status event is emitted,
   * and the user is redirected to the home page.
   * 
   * @param {string} username - The username of the user trying to log in.
   * @param {string} password - The password of the user trying to log in.
   * @returns {boolean} True if login is successful, otherwise false.
   */
  public login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isLoggedIn = true;
      this.loginStatus.emit(this.isLoggedIn);
      this.router.navigate(['/home']);
      return true;
    }
    this.loginStatus.emit(false);
    return false;
  }

  /**
   * Logs out the user.
   * The user is marked as not logged in,
   * a login status event is emitted,
   * and the user is redirected to the login page.
   */
  public logout(): void {
    this.isLoggedIn = false;
    this.loginStatus.emit(this.isLoggedIn);
    this.router.navigate(['/login']);
  }

  /**
   * Checks if the user is logged in.
   * 
   * @returns {boolean} True if the user is logged in, otherwise false.
   */
  public isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
