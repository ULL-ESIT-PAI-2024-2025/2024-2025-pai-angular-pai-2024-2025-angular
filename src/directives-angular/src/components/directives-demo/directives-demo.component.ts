import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-directives-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './directives-demo.component.html',
  styleUrls: ['./directives-demo.component.scss']
})
export class DirectivesDemoComponent {
  isVisible: boolean = true;
  items: string[] = ['Manzana', 'Plátano', 'Naranja'];
  deferredContent: string = 'Este contenido se carga de forma diferida';
}