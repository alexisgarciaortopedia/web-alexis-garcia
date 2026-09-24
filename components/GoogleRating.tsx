import {
  combinedRating,
  practiceReviews,
  totalReviews,
  type ReviewLocation,
} from "@/lib/practiceReviews";

type Props = {
  location: ReviewLocation | "global";
  className?: string;
};

const linkClass =
  "whitespace-nowrap underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function GoogleRating({ location, className = "" }: Props) {
  const isGlobal = location === "global";
  const rating = isGlobal ? combinedRating : practiceReviews[location].rating;
  const count = isGlobal ? totalReviews : practiceReviews[location].count;

  return (
    <div className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 ${className}`}>
      <span className="text-accent-rating" aria-hidden="true">★★★★★</span>
      <span>
        {rating.toFixed(1)} en Google · {isGlobal ? "+" : ""}{count} reseñas
        {isGlobal ? " entre nuestras sedes" : ""}
      </span>
      {isGlobal ? (
        <span className="inline-flex flex-wrap gap-x-2">
          <a
            href={practiceReviews.pachuca.googleMapsUrl}
            aria-label="Reseñas de Pachuca en Google Maps"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Pachuca ↗
          </a>
          <a
            href={practiceReviews.tula.googleMapsUrl}
            aria-label="Reseñas de Tula en Google Maps"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Tula ↗
          </a>
        </span>
      ) : (
        <a
          href={practiceReviews[location].googleMapsUrl}
          aria-label={`Reseñas de ${location === "pachuca" ? "Pachuca" : "Tula"} en Google Maps`}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Ver en Maps ↗
        </a>
      )}
    </div>
  );
}
