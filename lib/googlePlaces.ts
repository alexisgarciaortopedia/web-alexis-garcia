import { unstable_cache } from "next/cache";
import {
  buildFallbackReviewsResponse,
  type NormalizedReview,
  type ReviewsApiResponse,
} from "./staticGoogleReviews";

export type { NormalizedReview, ReviewsApiResponse };

export type GooglePlacesFetchError = {
  code: "missing_credentials" | "api_error" | "invalid_response";
  message: string;
};

type GoogleLocalizedText = {
  text?: string;
  languageCode?: string;
};

type GoogleAuthorAttribution = {
  displayName?: string;
  uri?: string;
  photoUri?: string;
};

type GoogleReview = {
  rating?: number;
  text?: GoogleLocalizedText;
  originalText?: GoogleLocalizedText;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  authorAttribution?: GoogleAuthorAttribution;
};

type GooglePlaceDetailsResponse = {
  id?: string;
  displayName?: GoogleLocalizedText;
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleReview[];
  googleMapsUri?: string;
};

const FIELD_MASK = [
  "id",
  "displayName",
  "rating",
  "userRatingCount",
  "reviews",
  "googleMapsUri",
].join(",");

const MAX_VISIBLE_REVIEWS = 5;

function normalizeReview(review: GoogleReview): NormalizedReview | null {
  const text =
    review.text?.text?.trim() ||
    review.originalText?.text?.trim() ||
    "";

  if (!text) {
    return null;
  }

  return {
    authorName: review.authorAttribution?.displayName?.trim() || "Paciente",
    authorPhotoUrl: review.authorAttribution?.photoUri,
    rating: typeof review.rating === "number" ? review.rating : 5,
    text,
    relativePublishTimeDescription: review.relativePublishTimeDescription,
    publishTime: review.publishTime,
    authorUri: review.authorAttribution?.uri,
  };
}

function normalizeGoogleResponse(
  data: GooglePlaceDetailsResponse,
): ReviewsApiResponse | null {
  if (typeof data.rating !== "number" || !data.googleMapsUri) {
    return null;
  }

  const reviews = (data.reviews ?? [])
    .map(normalizeReview)
    .filter((review): review is NormalizedReview => review !== null)
    .slice(0, MAX_VISIBLE_REVIEWS);

  if (reviews.length === 0) {
    return null;
  }

  return {
    source: "google",
    rating: data.rating,
    totalReviews:
      typeof data.userRatingCount === "number" ? data.userRatingCount : null,
    reviews,
    googleMapsUri: data.googleMapsUri,
    updatedAt: new Date().toISOString(),
  };
}

async function fetchGooglePlaceReviews(): Promise<ReviewsApiResponse> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID?.trim();

  if (!apiKey || !placeId) {
    console.warn(
      "[googlePlaces] Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACES_PLACE_ID; using static fallback.",
    );
    return buildFallbackReviewsResponse();
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=es`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": FIELD_MASK,
        },
        next: { revalidate: 86400 },
      },
    );

    if (!response.ok) {
      console.warn(
        `[googlePlaces] Places API responded with status ${response.status}; using static fallback.`,
      );
      return buildFallbackReviewsResponse();
    }

    const data = (await response.json()) as GooglePlaceDetailsResponse;
    const normalized = normalizeGoogleResponse(data);

    if (!normalized) {
      console.warn(
        "[googlePlaces] Invalid or incomplete Places API response; using static fallback.",
      );
      return buildFallbackReviewsResponse();
    }

    return normalized;
  } catch {
    console.warn(
      "[googlePlaces] Places API request failed; using static fallback.",
    );
    return buildFallbackReviewsResponse();
  }
}

const getCachedGoogleReviews = unstable_cache(
  fetchGooglePlaceReviews,
  ["google-reviews"],
  { revalidate: 86400, tags: ["google-reviews"] },
);

export async function getGoogleReviews(): Promise<ReviewsApiResponse> {
  return getCachedGoogleReviews();
}
