/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Sergio Nicolás Seguí
 * @since 03 Abril 2025
 * @description This class represents a playing card with a specific rank and suit.
 *              It provides methods to convert the card to a string representation
 *              and to compare it with another card for equality.
 * @see {@link ./suit}
 * @see {@link ./rank}
 */

import { Suit } from "./suit";
import { Rank } from "./rank";

export abstract class Card {
  constructor(public rank: Rank = Rank.Two, public suit: Suit = Suit.Clubs) {}

  /**
   * Converts the card object into a human-readable string representation.
   *
   * @returns A string in the format "<rank> of <suit>", where `<rank>` is the rank of the card
   * and `<suit>` is the suit of the card.
   */
  toString(): string {
    return `${this.rank} of ${this.suit}`;
  }

  /**
   * Compares the current card with another card to determine if they are equal.
   *
   * @param otherCard - The card to compare with the current card.
   * @returns `true` if both cards have the same rank and suit, otherwise `false`.
   */
  isEqual(otherCard: Card): boolean {
    return this.rank === otherCard.rank && this.suit === otherCard.suit;
  }

  /**
   * Retrieves the rank value of the card.
   *
   * @returns The rank of the card as a `Rank` type.
   */
  getValue():  Rank {
    return this.rank;
  }

  /**
   * Retrieves the suit of the card.
   *
   * @returns {Suit} The suit of the card.
   */
  getSuit(): Suit {
    return this.suit;
  }

  /**
   * Retrieves the numerical value of the card's rank.
   * 
   * - For face cards (Ace, King, Queen, Jack), it returns their respective
   *   numerical values: Ace as 14, King as 13, Queen as 12, and Jack as 11.
   * - For other ranks, it converts the rank to a number and returns it.
   * 
   * @returns {number} The numerical value of the card's rank.
   */
  getNumberedValue(): number {
    switch (this.rank) {
      case Rank.Ace:
        return 14;
      case Rank.King:
        return 13;
      case Rank.Queen:
        return 12;
      case Rank.Jack:
        return 11;
      default:
        return Number(this.rank);
    }
  }

  /**
   * Retrieves the name of the card as a string, combining its rank and suit.
   * 
   * The rank is represented by its name (e.g., "A" for Ace, "K" for King, etc.),
   * and the suit is represented by the first character of its name.
   * 
   * @returns {string} The formatted card name, e.g., "AS" for Ace of Spades,
   * "KH" for King of Hearts, or "10C" for Ten of Clubs.
   */
  getCardName(): string {
    const rankName = this.rank;
    const suitName = this.suit[0];
    switch (rankName) {
      case Rank.Ace:
        return `A${suitName}`;
      case Rank.King:
        return `K${suitName}`;
      case Rank.Queen:
        return `Q${suitName}`;
      case Rank.Jack:
        return `J${suitName}`;
      default:
        return `${rankName}${suitName}`;
    }
  }

  /**
   * Compares the current card with another card to determine their relative order.
   * 
   * @param other - The card to compare with the current card.
   * @returns A negative number if the current card is less than the other card,
   *          zero if they are equal, or a positive number if the current card
   *          is greater than the other card.
   */
  abstract compareTo(other: Card): number;

  /**
   * Compares the current card with another card based on their ranks.
   * 
   * @param other - The card to compare with the current card.
   * @returns A negative number if the current card's rank is less than the other card's rank,
   *          zero if their ranks are equal, or a positive number if the current card's rank
   *          is greater than the other card's rank.
   */
  abstract compareByRank(other: Card): number;
}
