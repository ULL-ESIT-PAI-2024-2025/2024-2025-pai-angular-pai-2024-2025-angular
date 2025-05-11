import { Injectable, signal } from '@angular/core';
import { TexasDeck } from '@/class/texasDeck';
import { Hand } from '@/class/hand';
import { TexasHand } from '@/class/texasHand';

@Injectable({
  providedIn: 'root',
})
export class PokerService {
  private deck = new TexasDeck();
  private communityCards = signal<TexasHand>(new TexasHand('communityCards'));
  private playerHand = signal<TexasHand>(new TexasHand('player 1'));
  private rivalsHands = signal<TexasHand[]>([]);
  private faceDown = signal<boolean[]>([true, true, true, true, true]);
  private faceUp = signal<boolean>(false);
  private winnerMessage = signal<string>('');
  private disabledButtons = signal<boolean[]>([false, true, true, true]);

  readonly communityCardsSignal = this.communityCards.asReadonly();
  readonly playerHandSignal = this.playerHand.asReadonly();
  readonly rivalsHandsSignal = this.rivalsHands.asReadonly();
  readonly faceDownSignal = this.faceDown.asReadonly();
  readonly faceUpSignal = this.faceUp.asReadonly();
  readonly winnerMessageSignal = this.winnerMessage.asReadonly();
  readonly disabledButtonsSignal = this.disabledButtons.asReadonly();

  constructor() {
    this.initializeGame();
  }

  dealFlop(): void {
    this.faceDown.update((current) => {
      const newFaceDown = [...current];
      newFaceDown[0] = false;
      newFaceDown[1] = false;
      newFaceDown[2] = false;
      return newFaceDown;
    });
    this.disabledButtons.update((current) => {
      const newButtons = [...current];
      newButtons[0] = true;
      newButtons[1] = false;
      return newButtons;
    });
  }

  dealTurn(): void {
    this.faceDown.update((current) => {
      const newFaceDown = [...current];
      newFaceDown[3] = false;
      return newFaceDown;
    });
    this.disabledButtons.update((current) => {
      const newButtons = [...current];
      newButtons[1] = true;
      newButtons[2] = false;
      return newButtons;
    });
  }

  dealRiver(): void {
    this.faceDown.update((current) => {
      const newFaceDown = [...current];
      newFaceDown[4] = false;
      return newFaceDown;
    });
    this.disabledButtons.update((current) => {
      const newButtons = [...current];
      newButtons[2] = true;
      newButtons[3] = false;
      return newButtons;
    });
  }

  evaluateHands(): void {
    this.faceUp.set(true);
    this.disabledButtons.update((current) => {
      const newButtons = [...current];
      newButtons[3] = true;
      return newButtons;
    });
    const winners = this.setWinner();
    this.setWinnerMessage(winners);
  }

  dealNewGame(): void {
    this.initializeGame();
  }

  private initializeGame(): void {
    this.deck = new TexasDeck();
    this.deck.shuffle();
    this.playerHand.set(new TexasHand('player 1'));
    this.rivalsHands.set([]);
    this.communityCards.set(new TexasHand('communityCards'));
    this.faceDown.set([true, true, true, true, true]);
    this.faceUp.set(false);
    this.winnerMessage.set('');
    this.disabledButtons.set([false, true, true, true]);
    this.initializePlayers();
  }

  private initializePlayers(): void {
    this.deck.moveCardsToHand(this.communityCards(), 5);
    this.deck.moveCardsToHand(this.playerHand(), 2);
    const newRivalsHands: TexasHand[] = [];
    for (let i = 0; i < 3; i++) {
      const rivalHand = new TexasHand(`player ${i + 2}`);
      this.deck.moveCardsToHand(rivalHand, 2);
      newRivalsHands.push(rivalHand);
    }
    this.rivalsHands.set(newRivalsHands);
  }

  private setWinner(): TexasHand[] {
      let winners: TexasHand[] = [this.playerHand()];
    for (const rivalHand of this.rivalsHands()) {
      const comparison = rivalHand.compareTo(winners[0], this.communityCards());
      if (comparison > 0) {
        winners = [rivalHand];
      } else if (comparison === 0) {
        winners.push(rivalHand);
      }
    }
    return winners;
  }

  private setWinnerMessage(winners: Hand[]): void {
    if (winners.length > 1) {
      this.winnerMessage.set("It's a tie!");
    } else {
      this.winnerMessage.set(
        `${winners[0].getLabel()} wins with ${winners[0].classify(this.communityCards())}!`
      );
    }
  }
}