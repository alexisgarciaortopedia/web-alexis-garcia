import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DesignReview from "@/components/DesignReview";

export const metadata: Metadata = {
  title: "Revisión del diseño",
  robots: { index: false, follow: false },
};

export default function DesignReviewPage() {
  // Review aid available only in Vercel previews and local development.
  if (process.env.VERCEL_ENV !== "preview" && process.env.NODE_ENV !== "development") notFound();
  return <DesignReview />;
}
