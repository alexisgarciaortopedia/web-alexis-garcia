import { ImageResponse } from "next/og";

export const alt =
  "Dr. Alexis Eduardo García de los Santos — Traumatología y Ortopedia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "linear-gradient(180deg, #050608 0%, #0B0F17 50%, #050608 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(148,156,170,0.22) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            background: "linear-gradient(180deg, rgba(148,156,170,0.9) 0%, rgba(148,156,170,0.35) 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            position: "relative",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 52,
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              maxWidth: 960,
            }}
          >
            Dr. Alexis Eduardo García de los Santos
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 34,
              fontWeight: 500,
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.3,
            }}
          >
            Traumatología y Ortopedia
          </p>
          <p
            style={{
              margin: 0,
              marginTop: 8,
              fontSize: 26,
              fontWeight: 400,
              color: "rgba(185,192,204,0.95)",
              lineHeight: 1.4,
            }}
          >
            Consulta en Tula de Allende y Pachuca de Soto
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
