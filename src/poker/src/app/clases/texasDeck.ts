/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Sergio Nicolás Seguí
 * @since 03 Abril 2025
 * @description This class represents a Texas Hold'em deck of playing cards.
 *              It initializes a full deck of cards with all possible combinations
 *              of ranks and suits specific to the Texas Hold'em game.
 * @see {@link ./deck}
 * @see {@link ./rank}
 * @see {@link ./suit}
 * @see {@link ./TexasCard}
 */

import { Deck } from "./deck";
import { Rank } from "./rank";
import { Suit } from "./suit";
import { TexasCard } from "./texasCard";

/**
 * Represents a specialized deck of cards for Texas Hold'em poker.
 * Extends the base `Deck` class and initializes with all possible
 * combinations of ranks and suits specific to Texas Hold'em.
 */
export class TexasDeck extends Deck {
  constructor() {
    let cards: TexasCard[] = [];
    const suits = Object.values(Suit);
    const ranks = Object.values(Rank);
    for (const suit of suits) {
      for (const rank of ranks) {
        cards.push(new TexasCard(rank, suit));
      }
    }
    super(cards);
  }
}