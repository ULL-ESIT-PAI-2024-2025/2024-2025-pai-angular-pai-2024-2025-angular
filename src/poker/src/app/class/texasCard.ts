/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Sergio Nicolás Seguí
 * @since 03 Abril 2025
 * @description This class represents a playing card with a specific rank and suit.
 *              It extends the base `Card` class and provides a method to compare
 *              this card with another card based on their rank and suit.
 * @see {@link ./suit}
 * @see {@link ./rank}
 */

import { Card } from "./card";
import { Rank } from "./rank";
import { Suit } from "./suit";

export class TexasCard extends Card {
  constructor(public override rank: Rank = Rank.Two, public override suit: Suit = Suit.Clubs) {
    super(rank, suit);
  }

  /**
   * Compares this card with another card to determine their relative order.
   *
   * The comparison is based on the suit and rank of the cards. Suits are ordered
   * as follows: Clubs, Diamonds, Hearts, Spades. Ranks are ordered from Two to Ace.
   *
   * @param other - The card to compare against.
   * @returns A negative number if this card is less than the other card, 
   *          a positive number if this card is greater than the other card, 
   *          or 0 if they are equal.
   */
  compareTo(other: Card): number {
    const suitOrder = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
    const rankOrder = [
      Rank.Two,
      Rank.Three,
      Rank.Four,
      Rank.Five,
      Rank.Six,
      Rank.Seven,
      Rank.Eight,
      Rank.Nine,
      Rank.Ten,
      Rank.Jack,
      Rank.Queen,
      Rank.King,
      Rank.Ace
    ];
    const suitDiff =
      suitOrder.indexOf(this.suit) - suitOrder.indexOf(other.suit);
    if (suitDiff !== 0) return suitDiff;
    return rankOrder.indexOf(this.rank) - rankOrder.indexOf(other.rank);
  }

  /**
   * Compares the rank of this card with another card.
   * 
   * @param other - The card to compare against.
   * @returns A negative number if this card's rank is lower, 
   *          a positive number if it is higher, 
   *          or 0 if the ranks are equal.
   */
  compareByRank(other: Card): number {
    const rankOrder = [
      Rank.Two,
      Rank.Three,
      Rank.Four,
      Rank.Five,
      Rank.Six,
      Rank.Seven,
      Rank.Eight,
      Rank.Nine,
      Rank.Ten,
      Rank.Jack,
      Rank.Queen,
      Rank.King,
      Rank.Ace
    ];
    return rankOrder.indexOf(this.rank) - rankOrder.indexOf(other.rank);
  }
}