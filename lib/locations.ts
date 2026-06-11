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
  },
};

export function getMapsEmbedUrl(location: ClinicLocation) {
  return `https://www.google.com/maps?q=${location.mapsEmbedQuery}&output=embed`;
}
