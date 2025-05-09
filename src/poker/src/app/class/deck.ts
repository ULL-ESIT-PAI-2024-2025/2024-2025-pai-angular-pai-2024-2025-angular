/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Sergio Nicolás Seguí
 * @since 03 Abril 2025
 * @description This class represents a standard deck of 52 playing cards.
 *              It provides methods to shuffle, sort, and manage the cards in the deck.
 *              The deck is initialized with a full set of cards and allows adding,
 *              removing, and manipulating the cards as needed.
 * @see {@link ./card}
 */

import { Card } from "./card";
import { Hand } from "./hand";

/**
 * Deck class represents a standard deck of 52 playing cards.
 * It provides methods to shuffle, sort, and manage the cards in the deck.
 * It also allows adding and removing cards from the deck.
 * The deck is initialized with a full set of cards, and it can be shuffled
 * and sorted as needed.
 */
export class Deck {
  /**
   * Creates a new Deck instance with a full set of cards.
   * @param cards - An array of cards to initialize the deck.
   */
  constructor(private cards: Card[]) {}

  getCards(): Card[] {
    return this.cards;
  }

  /**
   * Removes and returns the top card from the deck.
   *
   * @returns {Card} The card removed from the top of the deck.
   * @throws {Error} If the deck is empty and there are no cards to pop.
   */
  popCard(): Card {
    const card = this.cards.pop();
    if (!card) {
      throw new Error("No more cards in the deck");
    }
    return card;
  }

  /**
   * Adds a card to the deck.
   *
   * @param card - The card to be added to the deck.
   */
  addCard(card: Card): void {
    this.cards.push(card);
  }

  /**
   * Shuffles the cards in the deck using the Fisher-Yates algorithm.
   * This method randomizes the order of the cards in the deck.
   * @returns {void}
   */
  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  /**
   * Sorts the cards in the deck based on their rank and suit.
   * The sorting is done using the compareTo method of the Card class.
   * @returns {void}
   */
  sort(): void {
    this.cards.sort((a, b) => a.compareTo(b));
  }

  /**
   * Returns the number of cards in the deck.
   * @returns {number} The number of cards in the deck.
   */
  printDeck(): void {
    for (const card of this.cards) {
      console.log(card.toString());
    }
  }

  /**
   * Moves a specified number of cards from the current deck to another deck.
   *
   * @param deck - The target deck to which the cards will be moved.
   * @param numCards - The number of cards to move from the current deck.
   * @throws {Error} Throws an error if the number of cards to move exceeds the number of cards in the current deck.
   */
  moveCardsToHand(hand: Hand, numCards: number): void {
    if (numCards > this.cards.length) {
      throw new Error("Not enough cards in the deck to move");
    }
    for (let i = 0; i < numCards; i++) {
      const card = this.popCard();
      hand.addCard(card);
    }
  }
}