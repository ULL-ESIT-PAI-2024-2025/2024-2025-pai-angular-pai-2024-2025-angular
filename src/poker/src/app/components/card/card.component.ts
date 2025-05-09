import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {

  @Input() faceDown: boolean = false;
  @Input() interactive: boolean = false;
  @Input() backStyle: string = 'blue_back';
  @Input() imagePath: string = '';

  imageError: boolean = false;

  cardImagePath(): string {
    if (this.faceDown) {
      return `assets/images/${this.backStyle}.png`;
    }

    if (this.imagePath) {
      return this.imagePath;
    }

    return `assets/images/${this.backStyle}.png`;
  }

  get cardAlt(): string {
    if (this.faceDown) {
      return 'Card face down';
    }

    const suitName = this.getSuitName();
    const valueName = this.getValueName();
    return `${valueName} of ${suitName}`;
  }

  getSuitName(): string {
    return this.imagePath.split('/').pop()?.split('.')[0] || 'Unknown';
  }

  private getValueName(): string {
    return this.imagePath.split('/').pop()?.split('.')[0] || 'Unknown';
  }

  handleImageError(event: any): void {
    console.error('Error loading card image:', this.cardImagePath);
    this.imageError = true;
  }
}
