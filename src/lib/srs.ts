// Spaced Repetition System (SRS) using modified Leitner Box intervals
// Box 1: 1 day
// Box 2: 3 days
// Box 3: 7 days
// Box 4: 14 days
// Box 5: 30 days (Long-term mastered)

export const SRS_INTERVAL_DAYS: Record<number, number> = {
  1: 1,
  2: 3,
  3: 7,
  4: 14,
  5: 30,
};

/**
 * Calculates the next review timestamp based on current box level and whether answer was correct
 */
export function calculateNextReview(currentBox: number, isCorrect: boolean): { nextBox: number; nextDate: string } {
  let nextBox: number;
  if (isCorrect) {
    nextBox = Math.min(5, currentBox + 1);
  } else {
    // If wrong, drop back to Box 1 for immediate consolidation
    nextBox = 1;
  }

  const daysToAdd = SRS_INTERVAL_DAYS[nextBox] || 1;
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + daysToAdd);

  return {
    nextBox,
    nextDate: nextDate.toISOString(),
  };
}

/**
 * Checks if a word is currently due for review
 */
export function isDueForReview(nextReviewAt: string): boolean {
  if (!nextReviewAt) return true;
  return new Date(nextReviewAt) <= new Date();
}
