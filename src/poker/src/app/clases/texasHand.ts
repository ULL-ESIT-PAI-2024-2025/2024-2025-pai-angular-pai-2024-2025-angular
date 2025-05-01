import { Card } from "./card";
import { Hand } from "./hand";

export class TexasHand extends Hand {
  constructor(label: string, cards: Card[] = []) {
    super(label, cards);
  }

  /**
   * Calculates the count of each card value from the player's hand and the table cards.
   *
   * @param tableCards - The cards on the table to combine with the player's hand.
   * @returns An object where the keys are card values and the values are their respective counts.
   */
  private getValueCounts(tableCards: Hand): Record<string, number> {
    const allCards = [...this.getCards(), ...tableCards.getCards()];
    return allCards.reduce((counts: Record<string, number>, card) => {
      const value = card.getValue();
      counts[value] = (counts[value] || 0) + 1;
      return counts;
    }, {});
  }

  /**
   * Determines if there is at least one pair in the given hand of table cards.
   *
   * @param tableCards - The hand of cards to evaluate.
   * @returns `true` if a pair is found, otherwise `false`.
   */
  hasPair(tableCards: Hand): boolean {
    const valueCounts = this.getValueCounts(tableCards);
    return Object.values(valueCounts).some((count) => count === 2);
  }

  /**
   * Determines if the given hand contains exactly two pairs.
   *
   * @param tableCards - The hand of cards to evaluate.
   * @returns `true` if the hand contains two pairs, otherwise `false`.
   */
  hasTwoPair(tableCards: Hand): boolean {
    const valueCounts = this.getValueCounts(tableCards);
    return (
      Object.values(valueCounts).filter((count) => count === 2).length === 2
    );
  }

  /**
   * Determines if there is a "Three of a Kind" in the given hand of cards.
   *
   * @param tableCards - The hand of cards to evaluate.
   * @returns `true` if the hand contains exactly three cards of the same value, otherwise `false`.
   */
  hasThreeOfAKind(tableCards: Hand): boolean {
    const valueCounts = this.getValueCounts(tableCards);
    return Object.values(valueCounts).some((count) => count === 3);
  }

  /**
   * Determines if there is a straight in the combined set of the player's hand and the table cards.
   * A straight is a sequence of five consecutive card values.
   *
   * @param tableCards - The set of cards on the table to evaluate along with the player's hand.
   * @returns `true` if a straight is found, otherwise `false`.
   */
  hasStraight(tableCards: Hand): boolean {
    const allCardsValues = [...this.getCards(), ...tableCards.getCards()]
      .map((card) => card.getNumberedValue())
      .sort((a, b) => a - b)
      .filter((value, index, self) => self.indexOf(value) === index);

    if (allCardsValues.includes(14)) {
      allCardsValues.unshift(1);
    }

    for (let i = 0; i <= allCardsValues.length - 5; i++) {
      const potentialStraight = allCardsValues.slice(i, i + 5);
      const isStraight = potentialStraight.every(
        (value, index, array) => value === array[0] + index
      );
      if (isStraight) {
        return true;
      }
    }
    return false;
  }

  /**
   * Determines if there is a flush in the combined set of cards
   * from the player's hand and the table cards.
   *
   * @param tableCards - The set of cards on the table.
   * @returns `true` if there is a flush (5 or more cards of the same suit),
   *          otherwise `false`.
   */
  hasFlush(tableCards: Hand): boolean {
    const allCards = [...this.getCards(), ...tableCards.getCards()];
    const suitsCount: Record<string, number> = {};

    allCards.forEach((card) => {
      const suit = card.getSuit();
      suitsCount[suit] = (suitsCount[suit] || 0) + 1;
    });

    return Object.values(suitsCount).some((count) => count >= 5);
  }

  /**
   * Determines if the given hand contains a Full House.
   * A Full House consists of three cards of one rank and two cards of another rank.
   *
   * @param tableCards - The hand of cards to evaluate.
   * @returns `true` if the hand contains a Full House, otherwise `false`.
   */
  hasFullHouse(tableCards: Hand): boolean {
    const valueCounts = this.getValueCounts(tableCards);
    return (
      Object.values(valueCounts).includes(3) &&
      Object.values(valueCounts).includes(2)
    );
  }

  /**
   * Determines if the given hand contains a "Four of a Kind".
   *
   * @param tableCards - The hand of cards to evaluate.
   * @returns `true` if the hand contains four cards of the same value, otherwise `false`.
   */
  hasFourOfAKind(tableCards: Hand): boolean {
    const valueCounts = this.getValueCounts(tableCards);
    return Object.values(valueCounts).some((count) => count === 4);
  }

  /**
   * Determines if the given hand contains a Straight Flush.
   * A Straight Flush is a hand that is both a Straight and a Flush.
   *
   * @param tableCards - The hand of cards to evaluate.
   * @returns `true` if the hand contains a Straight Flush, otherwise `false`.
   */
  hasStraightFlush(tableCards: Hand): boolean {
    return this.hasStraight(tableCards) && this.hasFlush(tableCards);
  }

  /**
   * Determines if the current hand combined with the table cards contains a Royal Flush.
   *
   * @param tableCards - The cards on the table to combine with the current hand.
   * @returns `true` if a Royal Flush is found, otherwise `false`.
   */
  hasRoyalFlush(tableCards: Hand): boolean {
    const allCards = [...this.getCards(), ...tableCards.getCards()];
    const suits: Record<string, number[]> = {};

    allCards.forEach((card) => {
      const suit = card.getSuit();
      const value = card.getNumberedValue();
      if (!suits[suit]) {
        suits[suit] = [];
      }
      suits[suit].push(value);
    });

    for (const suit in suits) {
      const values = suits[suit]
        .sort((a, b) => a - b)
        .filter((value, index, self) => self.indexOf(value) === index);

      if (values.includes(14)) {
        values.unshift(1);
      }

      for (let i = 0; i <= values.length - 5; i++) {
        const potentialStraight = values.slice(i, i + 5);
        const isStraight = potentialStraight.every(
          (value, index, array) => value === array[0] + index
        );
        if (isStraight && potentialStraight[0] === 10) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Classifies the poker hand based on the given table cards.
   *
   * @param tableCards - The cards on the table to evaluate the hand.
   * @returns A string representing the classification of the hand,
   * such as "Royal Flush", "Straight Flush", "Four of a Kind", etc.
   */
  classify(tableCards: Hand): string {
    if (this.hasRoyalFlush(tableCards)) return "Royal Flush";
    if (this.hasStraightFlush(tableCards)) return "Straight Flush";
    if (this.hasFourOfAKind(tableCards)) return "Four of a Kind";
    if (this.hasFullHouse(tableCards)) return "Full House";
    if (this.hasFlush(tableCards)) return "Flush";
    if (this.hasStraight(tableCards)) return "Straight";
    if (this.hasThreeOfAKind(tableCards)) return "Three of a Kind";
    if (this.hasTwoPair(tableCards)) return "Two Pair";
    if (this.hasPair(tableCards)) return "Pair";
    return "High Card";
  }

  /**
   * Compares the current TexasHand instance with another hand to determine their relative ranking.
   * 
   * @param otherHand - The other TexasHand to compare against.
   * @param tableCards - The community cards on the table used for evaluation.
   * @returns A negative number if the current hand is ranked lower, 
   *          a positive number if it is ranked higher, 
   *          or 0 if both hands are of equal rank.
   */
  compareTo(otherHand: TexasHand, tableCards: Hand): number {
    const rankOrder = [
      "High Card",
      "Pair",
      "Two Pair",
      "Three of a Kind",
      "Straight",
      "Flush",
      "Full House",
      "Four of a Kind",
      "Straight Flush",
      "Royal Flush",
    ];
    const thisRank = rankOrder.indexOf(this.classify(tableCards));
    const otherRank = rankOrder.indexOf(otherHand.classify(tableCards));
    if (thisRank !== otherRank) {
      return thisRank - otherRank;
    }
    const thisSorted = this.getCards().sort((a, b) => a.compareTo(b));
    const otherSorted = otherHand.getCards().sort((a, b) => a.compareTo(b));
    for (let i = 0; i < thisSorted.length; i++) {
      const diff = thisSorted[i].compareTo(otherSorted[i]);
      if (diff !== 0) {
        return diff; 
      }
    }
    return 0;
  }
}
