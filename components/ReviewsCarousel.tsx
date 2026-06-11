"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GlassPanel from "@/components/GlassPanel";
import {
  buildFallbackReviewsResponse,
  type ReviewsApiResponse,
} from "@/lib/staticGoogleReviews";

const AUTOPLAY_MS = 7000;

function StarRating({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) {
  const rounded = Math.max(0, Math.min(5, Math.round(rating)));
  const label = `${rating.toFixed(1)} de 5 estrellas`;

  return (
    <span
      className={`text-[#F5C26B] ${className}`}
      aria-label={label}
      title={label}
    >
      {"★".repeat(rounded)}
      {"☆".repeat(5 - rounded)}
    </span>
  );
}

export default function ReviewsCarousel() {
  const [data, setData] = useState<ReviewsApiResponse>(
    buildFallbackReviewsResponse,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const reviewCount = data.reviews.length;
  const activeReview = data.reviews[activeIndex] ?? data.reviews[0];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadReviews() {
      try {
        const response = await fetch("/api/reviews", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as ReviewsApiResponse;

        if (
          !cancelled &&
          payload &&
          Array.isArray(payload.reviews) &&
          payload.reviews.length > 0
        ) {
          setData(payload);
          setActiveIndex(0);
        }
      } catch {
        // Conservar fallback sin mostrar errores al visitante.
      }
    }

    void loadReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (reviewCount === 0) {
        return;
      }

      setActiveIndex((index + reviewCount) % reviewCount);
    },
    [reviewCount],
  );

  const goPrevious = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (reviewCount <= 1 || isPaused || prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviewCount);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [reviewCount, isPaused, prefersReducedMotion]);

  useEffect(() => {
    const node = carouselRef.current;
    if (!node) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    node.addEventListener("keydown", handleKeyDown);
    return () => node.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrevious]);

  if (!activeReview) {
    return null;
  }

  const ratingLabel = data.rating.toFixed(1);
  const showGoogleTotal =
    data.source === "google" && typeof data.totalReviews === "number";

  return (
    <section className="flex flex-col gap-8" aria-labelledby="reviews-heading">
      <div className="flex flex-col items-center gap-2 text-center">
        <span id="reviews-heading" className="font-serif text-xl text-white">
          Opiniones de pacientes
        </span>
        <span className="text-sm text-[#B9C0CC]">
          Reseñas reales de pacientes atendidos en consulta
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#B9C0CC]">
          <StarRating rating={data.rating} />
          <span>
            {ratingLabel} en Google
            {showGoogleTotal ? ` · ${data.totalReviews} opiniones` : ""}
          </span>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="relative mx-auto w-full max-w-3xl outline-none"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Opiniones de pacientes"
        tabIndex={0}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsPaused(false);
          }
        }}
      >
        <GlassPanel className="min-h-[220px] px-5 py-6 sm:px-8 sm:py-7">
          <div className="flex h-full flex-col gap-4" aria-live="polite">
            <div className="flex items-start justify-between gap-4 text-sm text-white">
              <div className="flex min-w-0 items-center gap-3">
                {activeReview.authorPhotoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeReview.authorPhotoUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                ) : null}
                <div className="min-w-0">
                  {activeReview.authorUri ? (
                    <a
                      href={activeReview.authorUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-white transition-colors hover:text-white/90"
                    >
                      {activeReview.authorName}
                    </a>
                  ) : (
                    <span className="font-semibold">
                      {activeReview.authorName}
                    </span>
                  )}
                  {activeReview.relativePublishTimeDescription ? (
                    <p className="text-xs text-[#8C95A3]">
                      {activeReview.relativePublishTimeDescription}
                    </p>
                  ) : null}
                </div>
              </div>
              <StarRating rating={activeReview.rating} className="shrink-0" />
            </div>
            <p className="text-sm leading-relaxed text-[#B9C0CC]">
              {activeReview.text}
            </p>
          </div>
        </GlassPanel>

        {reviewCount > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Reseña anterior"
              className="absolute left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-[#050608]/90 p-2 text-white transition-colors hover:bg-white/10 sm:inline-flex"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Reseña siguiente"
              className="absolute right-0 top-1/2 hidden translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-[#050608]/90 p-2 text-white transition-colors hover:bg-white/10 sm:inline-flex"
            >
              <span aria-hidden="true">›</span>
            </button>

            <div className="mt-4 flex items-center justify-center gap-3 sm:hidden">
              <button
                type="button"
                onClick={goPrevious}
                aria-label="Reseña anterior"
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Reseña siguiente"
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
              >
                Siguiente
              </button>
            </div>

            <div
              className="mt-4 flex items-center justify-center gap-2"
              aria-label="Indicadores del carrusel"
            >
              {data.reviews.map((review, index) => (
                <button
                  key={`${review.authorName}-${index}`}
                  type="button"
                  aria-label={`Ir a la reseña ${index + 1} de ${reviewCount}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => goTo(index)}
                  className={[
                    "h-2.5 w-2.5 rounded-full transition-colors",
                    index === activeIndex
                      ? "bg-white"
                      : "bg-white/30 hover:bg-white/50",
                  ].join(" ")}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-col items-center gap-3">
        {data.source === "google" ? (
          <p className="text-xs text-[#8C95A3]">
            Reseñas proporcionadas por Google
          </p>
        ) : null}

        <a
          href={data.googleMapsUri}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
        >
          Ver todas las reseñas en Google
        </a>
      </div>
    </section>
  );
}
