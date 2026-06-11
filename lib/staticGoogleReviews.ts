export const FALLBACK_GOOGLE_MAPS_URI =
  "https://www.google.com/search?kgmid=%2Fg%2F11z1x56bs6&q=Dr.%20Alexis%20Garc%C3%ADa%20de%20los%20Santos%20%7C%20Traumatolog%C3%ADa%20y%20Ortopedia";

export const FALLBACK_RATING = 5.0;

export type StaticGoogleReview = {
  name: string;
  text: string;
};

export const STATIC_GOOGLE_REVIEWS: StaticGoogleReview[] = [
  {
    name: "Sonia Ortega",
    text: "“El Dr. García es un excelente traumatólogo. Me atendió por un problema de rodilla y desde la primera consulta explicó claramente el diagnóstico y las opciones de tratamiento. El trato fue muy profesional y humano. Gracias a su manejo y rehabilitación, pude volver a caminar sin dolor en pocas semanas. Lo recomiendo ampliamente.”",
  },
  {
    name: "Fabiyola Lopez Trejo",
    text: "“Excelente profesional. El no solo destaca por su brillantez técnica, sino por su calidez humana. Explica de forma clara, tiene paciencia y transmite una seguridad que es fundamental en cualquier tratamiento. Lo recomiendo sin reservas.”",
  },
  {
    name: "Isabel Jiménez",
    text: "“Excelente Doctor. Muy claro al dar su diagnóstico, se toma su tiempo para aclarar tus dudas. Muy amable”",
  },
  {
    name: "Alondra Amaro",
    text: "“Excelente atención. Es un médico muy comprometido y sabe explicarte muy bien en qué consiste el tratamiento y el por qué.”",
  },
  {
    name: "Virginia López N",
    text: "“Excelente servicio, muy recomendado.”",
  },
  {
    name: "Vanessa Itzel Trejo López",
    text: "“Excelente 🤩”",
  },
];

export type NormalizedReview = {
  authorName: string;
  authorPhotoUrl?: string;
  rating: number;
  text: string;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  authorUri?: string;
};

export type ReviewsApiResponse = {
  source: "google" | "fallback";
  rating: number;
  totalReviews: number | null;
  reviews: NormalizedReview[];
  googleMapsUri: string;
  updatedAt: string | null;
};

export function buildFallbackReviewsResponse(): ReviewsApiResponse {
  return {
    source: "fallback",
    rating: FALLBACK_RATING,
    totalReviews: null,
    reviews: STATIC_GOOGLE_REVIEWS.map((review) => ({
      authorName: review.name,
      rating: 5,
      text: review.text,
    })),
    googleMapsUri: FALLBACK_GOOGLE_MAPS_URI,
    updatedAt: null,
  };
}
