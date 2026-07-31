import { renderPanelHtml } from "@/lib/panel/panel-frontend";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "";
const PANEL_API_BASE = process.env.PANEL_API_BASE ??
  "https://oztpeidhbxzucakadruv.supabase.co/functions/v1/panel-api";

export async function GET() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return new Response("configuration_error", { status: 500 });
  }

  const html = renderPanelHtml({
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY,
    panelApiBase: PANEL_API_BASE,
  });

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Interno — nunca indexar (mismo criterio que app/dashboard/agenda, ver AGENTS.md).
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
