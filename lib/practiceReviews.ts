/** Cifras visibles en las fichas profesionales de Google Maps, 23 sep 2026. */
export const practiceReviews = {
  pachuca: {
    rating: 5.0,
    count: 24,
    googleMapsUrl: "https://www.google.com/maps?cid=13899597655234583047",
  },
  tula: {
    rating: 5.0,
    count: 23,
    googleMapsUrl: "https://www.google.com/maps?cid=16310803683419924396",
  },
} as const;

export type ReviewLocation = keyof typeof practiceReviews;

export const totalReviews =
  practiceReviews.pachuca.count + practiceReviews.tula.count;

// Ambas fichas muestran 5.0; el promedio se deriva de los valores visibles.
export const combinedRating =
  Math.round(
    ((practiceReviews.pachuca.rating * practiceReviews.pachuca.count +
      practiceReviews.tula.rating * practiceReviews.tula.count) /
      totalReviews) *
      10,
  ) / 10;
