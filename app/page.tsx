import type { Metadata } from "next";
import { CLINIC_CONTACTS, CONTACT_SEDES } from "@/lib/contacts";
import HomeClient from "./HomeClient";
import { practiceReviews } from "@/lib/practiceReviews";

export const metadata: Metadata = {
  title: "Dr. Alexis Eduardo García de los Santos | Traumatología y Ortopedia",
  description:
    "Consulta de Traumatología y Ortopedia en Tula de Allende y Pachuca de Soto, Hidalgo. Valoración ortopédica con enfoque clínico y toma de decisiones basada en evidencia.",
  alternates: {
    canonical: "https://www.alexisgarciaortopedia.com/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const physicianStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Physician",
      "@id": "https://www.alexisgarciaortopedia.com/#physician",
      name: "Dr. Alexis Eduardo García de los Santos",
      url: "https://www.alexisgarciaortopedia.com",
      image: "https://www.alexisgarciaortopedia.com/doctor-hero.webp",
      medicalSpecialty: "Traumatología y Ortopedia",
      telephone: CONTACT_SEDES.map((sede) => CLINIC_CONTACTS[sede].e164),
      contactPoint: CONTACT_SEDES.map((sede) => ({ "@type": "ContactPoint", telephone: CLINIC_CONTACTS[sede].e164, contactType: "appointments", areaServed: CLINIC_CONTACTS[sede].label, availableLanguage: "Spanish" })),
      sameAs: [
        "https://instagram.com/dralexisgarcia.ortopedia",
        practiceReviews.pachuca.googleMapsUrl,
        practiceReviews.tula.googleMapsUrl,
      ],
      workLocation: [
        {
          "@type": "Place",
          name: "Zárate Unidad de Especialidades Médicas",
          telephone: CLINIC_CONTACTS.tula.e164,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Cto. Revolución 19, Col. Iturbe",
            addressLocality: "Tula de Allende",
            postalCode: "42803",
            addressRegion: "Hidalgo",
            addressCountry: "MX",
          },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "09:00",
            closes: "19:00",
          },
        },
        {
          "@type": "Place",
          name: "Adoy Medical Center",
          telephone: CLINIC_CONTACTS.pachuca.e164,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Lic. Hernández y Fernández 105, San Antonio",
            addressLocality: "Pachuca de Soto",
            postalCode: "42083",
            addressRegion: "Hidalgo",
            addressCountry: "MX",
          },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "09:00",
            closes: "19:00",
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(physicianStructuredData),
        }}
      />
      <HomeClient />
    </>
  );
}
