"use client";

import { useState } from "react";

const routes = [
  ["/", "Portada"],
  ["/pachuca", "Pachuca"],
  ["/tula", "Tula"],
  ["/agendar", "Agenda"],
  ["/muevete-seguro", "Muévete Seguro"],
] as const;

export default function DesignReview() {
  const [width, setWidth] = useState(390);
  const [route, setRoute] = useState("/");
  return <main style={{ minHeight: "100vh", background: "#e8ebe8", color: "#10231c", padding: 20, fontFamily: "sans-serif" }}>
    <header style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 18 }}>
      <strong>Revisión del diseño</strong>
      <label>Página <select aria-label="Página de revisión" value={route} onChange={e => setRoute(e.target.value)} style={{ padding: 8, background: "white" }}>{routes.map(([path, label]) => <option key={path} value={path}>{label}</option>)}</select></label>
      <label>Vista <select aria-label="Ancho de revisión" value={width} onChange={e => setWidth(Number(e.target.value))} style={{ padding: 8, background: "white" }}><option value={360}>Celular · 360 px</option><option value={390}>Celular · 390 px</option><option value={768}>Tablet · 768 px</option><option value={1280}>Escritorio · 1280 px</option></select></label>
      <a href={route} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>Abrir página</a>
    </header>
    <iframe key={route} title="Vista de revisión" src={route} style={{ display: "block", width, maxWidth: "100%", height: "calc(100vh - 110px)", minHeight: 640, margin: "0 auto", border: "1px solid #acb8af", borderRadius: 12, background: "#071311" }} />
  </main>;
}
