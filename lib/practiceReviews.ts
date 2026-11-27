/** Cifras visibles en las fichas profesionales de Google Maps, 27 nov 2026. */
export const practiceReviews = {
  pachuca: {
    rating: 4.9,
    count: 32,
    googleMapsUrl: "https://www.google.com/maps?cid=13899597655234583047",
  },
  tula: {
    rating: 5.0,
    count: 28,
    googleMapsUrl: "https://www.google.com/maps?cid=16310803683419924396",
  },
} as const;

export type ReviewLocation = keyof typeof practiceReviews;

export const totalReviews =
  practiceReviews.pachuca.count + practiceReviews.tula.count;

// El promedio combinado se deriva de las calificaciones visibles de cada sede.
export const combinedRating =
  Math.round(
    ((practiceReviews.pachuca.rating * practiceReviews.pachuca.count +
      practiceReviews.tula.rating * practiceReviews.tula.count) /
      totalReviews) *
      10,
  ) / 10;
