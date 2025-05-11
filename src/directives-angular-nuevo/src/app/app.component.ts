import { Component } from '@angular/core';
import { DirectivesDemoComponent } from '../components/directives-demo/directives-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DirectivesDemoComponent],  // Add the component here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'directives-angular';
}
