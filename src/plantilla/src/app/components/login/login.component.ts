import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.authService.login(this.username, this.password)) {
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
