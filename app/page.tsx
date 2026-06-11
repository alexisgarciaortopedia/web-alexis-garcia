import type { Metadata } from "next";
import HomeClient from "./HomeClient";

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
      telephone: "+527731754638",
      workLocation: [
        {
          "@type": "Place",
          name: "Zárate Unidad de Especialidades Médicas",
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
            dayOfWeek: ["Saturday", "Sunday"],
            opens: "14:00",
            closes: "18:00",
          },
        },
        {
          "@type": "Place",
          name: "Adoy Medical Center",
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
            ],
            opens: "09:00",
            closes: "12:30",
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
