/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Sergio Nicolás Seguí
 * @since 03 Abril 2025
 * @description This class represents a hand of playing cards. It allows adding
 *              cards to the hand, removing cards from the hand, and converting
 *              the hand to a string representation.
 * @see {@link ./card}
 */

import { Card } from "./card";

export abstract class Hand {
  constructor(private label: string, private cards: Card[] = []) {}

  /**
   * Adds a card to the hand.
   * @param card - The card to be added.
   */
  addCard(card: Card): void {
    this.cards.push(card);
  }

  /**
   * Removes and returns the last card from the hand.
   * @throws {Error} If there are no cards left in the hand.
   * @returns {Card} The card that was removed from the hand.
   */
  popCard(): Card {
    if (this.cards.length === 0) {
      throw new Error("No more cards in the hand");
    }
    return this.cards.pop()!;
  }

  /**
   * Converts the hand to a string representation.
   * @returns A string representing the hand, including its label and cards.
   */
  toString(): string {
    return `${this.label}: [${this.cards
      .map((card) => card.toString())
      .join(", ")}]`;
  }

  /**
   * Retrieves the cards in the hand.
   *
   * @returns An array of `Card` objects representing the cards in the hand.
   */
  getCards(): Card[] {
    return this.cards;
  }

  /**
   * Retrieves the label of the hand.
   * @returns The label as a string.
   */
  getLabel(): string {
    return this.label;
  }

  abstract classify(tableCards: Hand): string;
  
  abstract compareTo(otherHand: Hand, tableCards: Hand): number;
}
