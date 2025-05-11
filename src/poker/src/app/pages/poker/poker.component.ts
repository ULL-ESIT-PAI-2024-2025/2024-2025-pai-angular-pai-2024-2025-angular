import { Component } from '@angular/core';
import { CardComponent } from '@/components/card/card.component';
import { PokerService } from '@/services/poker.service';

@Component({
  selector: 'app-poker',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.css']
})
export class PokerComponent {
  constructor(protected pokerService: PokerService) {}

  dealFlop(): void {
    this.pokerService.dealFlop();
  }

  dealTurn(): void {
    this.pokerService.dealTurn();
  }

  dealRiver(): void {
    this.pokerService.dealRiver();
  }

  evaluateHands(): void {
    this.pokerService.evaluateHands();
  }

  dealNewGame(): void {
    this.pokerService.dealNewGame();
  }
}