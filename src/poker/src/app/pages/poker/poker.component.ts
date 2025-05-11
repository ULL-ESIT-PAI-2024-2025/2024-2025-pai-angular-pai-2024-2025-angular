import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@/components/card/card.component';
import { Deck } from '@/class/deck';
import { TexasDeck } from '@/class/texasDeck';
import { Hand } from '@/class/hand';
import { TexasHand } from '@/class/texasHand';

@Component({
  selector: 'app-poker',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.css']
})
export class PokerComponent {
  private deck: Deck;
  protected communityCards: Hand;
  protected rivalsHands: Hand[];
  protected playerHand: Hand;
  protected disabledButtons: boolean[];
  protected faceDown: boolean[] = [true, true, true, true, true];
  protected faceUp: boolean = false;
  protected winnerMessage: string = "";

  constructor() {
    this.disabledButtons = [false, true, true, true];
    this.deck = new TexasDeck();
    this.deck.shuffle();
    this.playerHand = new TexasHand("player 1");
    this.rivalsHands = [];
    this.communityCards = new TexasHand("communityCards");
    this.initializePlayers();
  }

  protected getFaceDown(index: number): boolean {
    return this.faceDown[index];
  }

  protected dealFlop() {
    this.faceDown[0] = false;
    this.faceDown[1] = false;
    this.faceDown[2] = false;
    this.disabledButtons[0] = true;
    this.disabledButtons[1] = false;
  }

  protected dealTurn() {
    this.faceDown[3] = false;
    this.disabledButtons[1] = true;
    this.disabledButtons[2] = false;
  }

  protected dealRiver() {
    this.faceDown[4] = false;
    this.disabledButtons[2] = true;
    this.disabledButtons[3] = false;
  }

  protected evaluateHands() {
    this.faceUp = true;
    this.disabledButtons[3] = true;
    const winners = this.setWinner();
    this.setWinnerMessage(winners);
  }

  protected dealNewGame() {
    this.deck = new TexasDeck();
    this.deck.shuffle();
    this.playerHand = new TexasHand("player 1");
    this.rivalsHands = [];
    this.communityCards = new TexasHand("communityCards");
    this.faceDown = [true, true, true, true, true];
    this.disabledButtons = [false, true, true, true];
    this.faceUp = false;
    this.winnerMessage = "";
    this.initializePlayers();
  }

  private setWinner(): Hand[] {
    let winners: Hand[] = [this.playerHand];
    for (let i = 0; i < this.rivalsHands.length; i++) {
      const comparision = this.rivalsHands[i].compareTo(winners[0], this.communityCards);
      if (comparision > 0) {
        winners = [this.rivalsHands[i]];
      } else if (comparision === 0) {
        winners.push(this.rivalsHands[i]);
      }
    }
    return winners;
  }

  private setWinnerMessage(winners: Hand[]) {
    console.log(winners);
    if (winners.length > 1) {
      this.winnerMessage = "It's a tie!";
    }
    else {
      this.winnerMessage = `${winners[0].getLabel()} wins with ${winners[0].classify(this.communityCards)}!`;
    }
  }

  private initializePlayers() {
    this.deck.moveCardsToHand(this.communityCards, 5);
    this.deck.moveCardsToHand(this.playerHand, 2);
    for (let i = 0; i < 3; i++) {
      this.rivalsHands[i] = new TexasHand(`player ${i + 2}`);
      this.deck.moveCardsToHand(this.rivalsHands[i], 2);
    }
  }
}
