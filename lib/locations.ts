export type ClinicLocationId = "tula" | "pachuca";

export type ClinicLocation = {
  id: ClinicLocationId;
  clinicName: string;
  city: string;
  address: string;
  addressLines: string[];
  daysLabel: string;
  scheduleDays: number[];
  scheduleLabel: string;
  slots: string[];
  mapsUrl: string;
  mapsEmbedQuery: string;
  active: boolean;
  publicLabel: string;
  /**
   * Conteo manual de la ficha de Google Business Profile de esta sede,
   * verificado a mano el 16 ago 2026 (15 Pachuca + 23 Tula = los 38
   * combinados que usa AGGREGATE_REVIEW_COUNT en staticGoogleReviews.ts).
   * No hay endpoint que lo traiga por sede -- actualizar a mano si cambia
   * de forma notable.
   */
  reviewCount: number;
  /** Copy de las landings de oleada -- ver privada/13-direccion-visual.md. */
  hub: {
    eyebrow: string;
    h1Second: string;
    entradilla: string;
    micro: string;
  };
  fracturas: {
    eyebrow: string;
    entradilla: string;
    micro: string;
  };
  rodilla: {
    h1: string;
    locationNote: string;
  };
};

export const CLINIC_LOCATIONS: Record<ClinicLocationId, ClinicLocation> = {
  tula: {
    id: "tula",
    clinicName: "Zárate Unidad de Especialidades Médicas",
    city: "Tula de Allende, Hidalgo",
    address:
      "Cto. Revolución 19, Col. Iturbe, 42803 Tula de Allende, Hidalgo, México",
    addressLines: [
      "Cto. Revolución 19",
      "Col. Iturbe",
      "42803 Tula de Allende, Hidalgo",
      "México",
    ],
    daysLabel: "Sábado y domingo",
    scheduleDays: [6, 0],
    scheduleLabel: "14:00–18:00 h",
    slots: [
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
    ],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Z%C3%A1rate+Unidad+de+Especialidades+M%C3%A9dicas+Cto+Revoluci%C3%B3n+19+Tula+de+Allende+Hidalgo",
    mapsEmbedQuery:
      "Z%C3%A1rate+Unidad+de+Especialidades+M%C3%A9dicas+Cto+Revoluci%C3%B3n+19+Tula+de+Allende+Hidalgo",
    active: true,
    publicLabel: "Tula de Allende",
    reviewCount: 23,
    hub: {
      eyebrow: "CLÍNICA ZÁRATE, TULA DE ALLENDE · SÁBADO Y DOMINGO",
      h1Second: "en Tula de Allende",
      entradilla:
        "Rodilla, hombro, cadera, columna, fracturas y lesión deportiva. Consulta presencial en Clínica Zárate, sábado y domingo.",
      micro: "Respuesta por WhatsApp todos los días · consulta presencial sábado y domingo",
    },
    fracturas: {
      eyebrow: "URGENCIAS Y FRACTURAS · TULA DE ALLENDE",
      entradilla:
        "Respuesta rápida por WhatsApp o llamada directa al consultorio. Manejo completo: inmovilización o cirugía, con seguimiento hasta tu recuperación.",
      micro: "Respondemos todos los días por WhatsApp · consulta presencial sábado y domingo en Tula",
    },
    rodilla: {
      h1: "Dolor de Rodilla en Tula",
      locationNote: "Consulta en Tula — Clínica Zárate, sábado y domingo",
    },
  },
  pachuca: {
    id: "pachuca",
    clinicName: "Adoy Medical Center",
    city: "Pachuca de Soto, Hidalgo",
    address:
      "Lic. Hernández y Fernández 105, San Antonio, 42083 Pachuca de Soto, Hgo.",
    addressLines: [
      "Lic. Hernández y Fernández 105",
      "San Antonio",
      "42083 Pachuca de Soto, Hgo.",
    ],
    daysLabel: "Lunes a viernes",
    scheduleDays: [1, 2, 3, 4, 5],
    scheduleLabel: "09:00–12:30 h",
    slots: [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
    ],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Adoy+Medical+Center+Lic.+Hern%C3%A1ndez+y+Fern%C3%A1ndez+105+San+Antonio+42083+Pachuca+de+Soto+Hgo",
    mapsEmbedQuery:
      "Adoy+Medical+Center+Lic.+Hern%C3%A1ndez+y+Fern%C3%A1ndez+105+San+Antonio+42083+Pachuca+de+Soto+Hgo",
    active: true,
    publicLabel: "Pachuca de Soto",
    reviewCount: 15,
    hub: {
      eyebrow: "ADOY MEDICAL CENTER, PACHUCA · LUNES A VIERNES",
      h1Second: "en Pachuca de Soto",
      entradilla:
        "Rodilla, hombro, cadera, columna, fracturas y lesión deportiva. Consulta presencial en Adoy Medical Center, de lunes a viernes.",
      micro: "Respuesta por WhatsApp todos los días · consulta presencial lunes a viernes",
    },
    fracturas: {
      eyebrow: "URGENCIAS Y FRACTURAS · PACHUCA",
      entradilla:
        "Escríbenos y el médico responde directamente. Manejo completo: inmovilización o cirugía, con seguimiento hasta tu recuperación.",
      micro: "Responde el médico directo por WhatsApp · consulta presencial lunes a viernes en Pachuca",
    },
    rodilla: {
      h1: "Dolor de Rodilla en Pachuca",
      locationNote: "Consulta en Pachuca — Adoy Medical Center, lunes a viernes",
    },
  },
};

export function getMapsEmbedUrl(location: ClinicLocation) {
  return `https://www.google.com/maps?q=${location.mapsEmbedQuery}&output=embed`;
}

/** Params estáticos para las rutas [sede] -- /pachuca, /tula y sus hijas. */
export function getSedeStaticParams(): { sede: ClinicLocationId }[] {
  return [{ sede: "pachuca" }, { sede: "tula" }];
}
