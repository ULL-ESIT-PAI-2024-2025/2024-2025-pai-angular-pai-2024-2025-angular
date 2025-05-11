import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) price!: number;
  @Output() quantityChange = new EventEmitter<number>();

  // Signal para la cantidad de este producto
  quantity = signal(0);

  addItem() {
    this.quantity.update(current => current + 1);
    this.quantityChange.emit(this.quantity());
  }

  removeItem() {
    this.quantity.update(current => Math.max(0, current - 1));
    this.quantityChange.emit(this.quantity());
  }
}
