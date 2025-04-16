import { Component } from '@angular/core';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
