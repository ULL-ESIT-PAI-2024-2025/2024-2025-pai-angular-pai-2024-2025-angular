import { Component, computed, effect, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ ProductComponent],
  templateUrl: './carrito-compra.component.html',
  styleUrl: './carrito-compra.component.scss',
})
export class carritoCompraComponent {
  // Lista de productos con ID, nombre y precio
  products = [
    { id: 1, name: 'Awesome Book', price: 10 },
    { id: 2, name: 'Cool Gadget', price: 25 },
    { id: 3, name: 'Fancy Mug', price: 8 },
  ];

  // Signal para las cantidades por producto (clave: ID del producto, valor: cantidad)
  quantities = signal<{ [key: number]: number }>({});

  // Computed signal para el precio total
  totalPrice = computed(() => {
    return this.products.reduce((total, product) => {
      const quantity = this.quantities()[product.id] || 0;
      return total + quantity * product.price;
    }, 0);
  });

  // Mensaje dinámico del carrito
  cartMessage = 'Add items to your cart!';

  constructor() {
    // Effect para actualizar el mensaje según el total
    effect(() => {
      const total = this.totalPrice();
      this.cartMessage = total >= 50
        ? 'Great! You qualify for a 10% discount!'
        : total > 0
        ? 'Keep adding items to unlock discounts!'
        : 'Your cart is empty.';
    });
  }

  // Actualiza la cantidad de un producto en el carrito
  updateCart(quantity: number, productId: number) {
    this.quantities.update(current => ({
      ...current,
      [productId]: quantity,
    }));
  }
}
